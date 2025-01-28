const mongoose = require("mongoose");
const Joi = require("joi");

// Rating schema
const ratingSchema = new mongoose.Schema({
  stars: { type: Number, required: true, min: 0, max: 50 },
  count: { type: Number, required: true, min: 0 },
});

// Product schema
const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  rating: { type: ratingSchema, required: true },
  priceCents: { type: Number, min: 0 }, // Optional, only when hasPrice is true
  hasPrice: { type: Boolean, default: true }, // New field to indicate price availability
  type: { type: String, default: "product" },
  keywords: Array,
  category: {
    type: String,
    required: true,
    enum: ["beddings", "furniture", "pillows", "decor", "bath"],
  },
});

// Mongoose model
const Product = mongoose.model("Product", productSchema);

// Joi validation function
function validateProduct(product) {
  const schema = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().min(3).max(100).required(),
    rating: Joi.object({
      stars: Joi.number().min(0).max(5).required(),
      count: Joi.number().min(0).required(),
    }).required(),
    hasPrice: Joi.boolean().required(), // New field
    priceCents: Joi.number()
      .min(0)
      .when("hasPrice", { is: true, then: Joi.required() }), // Conditional validation
    type: Joi.string().valid("product").optional(),
    keywords: Joi.array().items(Joi.string()).optional(),
    category: Joi.string()
      .valid("beddings", "furniture", "pillows", "decor", "bath")
      .required(),
  });

  return schema.validate(product);
}

module.exports = {
  Product,
  validateProduct,
};
