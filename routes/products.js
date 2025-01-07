const express = require("express");
const { Product, validateProduct } = require("../models/product");
const router = express.Router();
const mongoose = require("mongoose");

// Fetch products with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 15, category } = req.query;

  try {
    const filter = category ? { category } : {};
    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/search", async (req, res) => {
  const { q, page = 1, limit = 10, category } = req.query;

  try {
    const filter = {
      name: { $regex: q, $options: "i" },
      ...(category && { category }),
    };

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.error("Error during product search:", error);
    res.status(500).json({ error: "Server error during search" });
  }
});

// Fetch products by IDs
router.get("/by-ids", async (req, res) => {
  const ids = req.query.ids ? req.query.ids.split(",") : [];

  if (ids.length === 0) {
    return res.status(400).json({ error: "No IDs provided" });
  }

  try {
    // Validate and convert to ObjectId format
    const validObjectIds = ids.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    // Fetch products matching the valid ObjectIds
    const products = await Product.find({ _id: { $in: validObjectIds } });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by IDs:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST route to create a product
router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// Add a new route in API for suggestions
router.get("/suggestions", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const suggestions = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { keywords: { $regex: query, $options: "i" } },
      ],
    })
      .limit(5) // Limit to 5 suggestions for performance
      .select("name"); // Only return product name for suggestions

    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

module.exports = router;
