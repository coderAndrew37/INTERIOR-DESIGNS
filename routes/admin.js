const express = require("express");
const mongoose = require("mongoose");
const { Parser } = require("json2csv");
const authMiddleware = require("../middleware/auth.js");
const adminMiddleware = require("../middleware/isAdmin.js");
const { Order } = require("../models/order.js");
const sendStateChangeEmail = require("../services/emailService.js");

const router = express.Router();

/**
 * Fetch all orders for the admin dashboard.
 * GET /api/admin/orders
 */
router.get("/orders", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId", "name image priceCents")
      .sort({ datePlaced: -1 });

    // Wrap orders in an object to match frontend expectations
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders for admin:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

/**
 * Fetch a single order by ID for admin.
 * GET /api/admin/orders/:orderId
 */
router.get(
  "/orders/:orderId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID." });
    }

    try {
      const order = await Order.findById(orderId).populate(
        "items.productId",
        "name image priceCents"
      );

      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order details:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

/**
 * Update the status of an order.
 * PUT /api/admin/orders/:orderId
 */
router.put(
  "/orders/:orderId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["Preparing", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    try {
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }

      // Update status
      order.status = status;
      await order.save();

      // Notify the user via email
      await sendStateChangeEmail(order.email, order, status);

      res.status(200).json({ message: "Order status updated successfully." });
    } catch (error) {
      console.error("Error updating order status:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

/**
 * Export all orders as CSV for the admin dashboard.
 * GET /api/admin/export
 */
router.get("/export", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId", "name");

    const fields = [
      { label: "Order ID", value: "_id" },
      { label: "Customer Name", value: "name" },
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "Status", value: "status" },
      { label: "Total (Cents)", value: "totalCents" },
      { label: "Date Placed", value: "datePlaced" },
    ];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(orders);

    res.header("Content-Type", "text/csv");
    res.attachment("orders.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error exporting orders to CSV:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
