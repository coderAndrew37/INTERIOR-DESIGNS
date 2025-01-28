require("dotenv").config();
const mongoose = require("mongoose");
const { Product } = require("./models/product"); // Ensure your `Product` model is correctly exported

// MongoDB connection
const dbUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/interiors_tifi";
mongoose
  .connect(dbUri)
  .then(() => console.log(`Connected to MongoDB at ${dbUri}...`))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// Product data
const products = [
  {
    image: "/images/products/wall-art.jpeg",
    name: "Wall Art",
    rating: { stars: 4.7, count: 150 },
    priceCents: 350000,
    hasPrice: true,
    type: "product",
    keywords: ["wall", "art", "interior"],
    category: "decor",
  },
  {
    image: "/images/products/sheers.jpg",
    name: "Sheers",
    rating: { stars: 4, count: 95 },
    priceCents: 350000,
    hasPrice: true,
    type: "product",
    keywords: ["sheers", "curtains", "window"],
    category: "decor",
  },
  {
    image: "/images/products/kitchen-sheers.jpg",
    name: "Kitchen Sheers",
    rating: { stars: 3.5, count: 50 },
    priceCents: 250000,
    hasPrice: true,
    type: "product",
    keywords: ["kitchen", "sheers", "interior"],
    category: "decor",
  },
  {
    image: "/images/products/wooven-tray.jpeg",
    name: "Wooven Tray",
    rating: { stars: 5, count: 50 },
    priceCents: 60000,
    hasPrice: true,
    type: "product",
    keywords: ["tray", "decor", "home"],
    category: "decor",
  },
  {
    image: "/images/products/wooven-basket.jpeg",
    name: "Wooven Baskets",
    rating: { stars: 5, count: 100 },
    priceCents: 60000,
    hasPrice: true,
    type: "product",
    keywords: ["baskets", "decor", "home"],
    category: "decor",
  },
  {
    image: "/images/products/rwandese-baskets.jpeg",
    name: "Rwandese Baskets",
    rating: { stars: 5, count: 100 },
    priceCents: 180000,
    hasPrice: true,
    type: "product",
    keywords: ["rwanda", "baskets", "decor"],
    category: "decor",
  },
  {
    image: "/images/products/throw-pillow.jpg",
    name: "Throw Pillow Standard Size",
    rating: { stars: 4.2, count: 75 },
    priceCents: 150000,
    hasPrice: true,
    type: "product",
    keywords: ["pillow", "throw", "bedding", "decor"],
    category: "pillows",
  },
  {
    image: "/images/products/bed-pillow.jpg",
    name: "Normal Bed Pillow",
    rating: { stars: 4, count: 80 },
    priceCents: 95000,
    hasPrice: true,
    type: "product",
    keywords: ["pillow", "bed", "bedding"],
    category: "pillows",
  },
  {
    image: "/images/products/big-towel.jpg",
    name: "Big Towel",
    rating: { stars: 4.5, count: 60 },
    priceCents: 200000,
    hasPrice: true,
    type: "product",
    keywords: ["towel", "big", "bath"],
    category: "bath",
  },
  {
    image: "/images/products/bathrobe.jpg",
    name: "Bathrobe",
    rating: { stars: 4.7, count: 80 },
    priceCents: 250000,
    hasPrice: true,
    type: "product",
    keywords: ["bathrobe", "bath", "comfort"],
    category: "bath",
  },
  {
    image: "/images/products/blankets.jpg",
    name: "Throw Blankets",
    rating: { stars: 4.5, count: 60 },
    priceCents: 400000,
    hasPrice: true,
    type: "product",
    keywords: ["blankets", "home", "decor"],
    category: "beddings",
  },
  {
    image: "/images/products/duvets.jpeg",
    name: "Throw Duvets",
    rating: { stars: 4.5, count: 80 },
    priceCents: 450000,
    hasPrice: true,
    type: "product",
    keywords: ["duvets", "home", "bedding"],
    category: "beddings",
  },
  {
    image: "/images/products/white-duvet-king-size.jpg",
    name: "White Duvet King Size",
    rating: { stars: 4.5, count: 120 },
    priceCents: 550000,
    hasPrice: true,
    type: "product",
    keywords: ["duvet", "white", "bedding", "4x6"],
    category: "beddings",
  },
  {
    image: "/images/products/matress-covers.jpg",
    name: "Matress Protectors",
    rating: { stars: 4.5, count: 100 },
    priceCents: 220000,
    hasPrice: true,
    type: "product",
    keywords: ["matress protector", "white", "bedding"],
    category: "beddings",
  },
  {
    image: "/images/products/colored-duvet-king-size.jpeg",
    name: "Colored Duvet 6 x 7",
    rating: { stars: 4.5, count: 120 },
    priceCents: 550000,
    hasPrice: true,
    type: "product",
    keywords: ["duvet", "colored", "bedding", "4x6"],
    category: "beddings",
  },
  {
    image: "/images/products/mattress-protector.jpg",
    name: "Mattress Protector 6x6",
    rating: { stars: 4.2, count: 70 },
    priceCents: 350000,
    hasPrice: true,
    type: "product",
    keywords: ["mattress protector", "6x6", "bedding"],
    category: "beddings",
  },
  {
    image: "/images/products/pillow-and-case.jpeg",
    name: "Throw Pillows and Case",
    rating: { stars: 4, count: 110 },
    priceCents: 150000,
    hasPrice: true,
    type: "product",
    keywords: ["pillows", "decor", "home"],
    category: "pillows",
  },
  {
    image: "/images/products/mirrors.jpeg",
    name: "Decorative Mirrors",
    rating: { stars: 4.5, count: 45 },
    priceCents: 650000,
    hasPrice: true,
    type: "product",
    keywords: ["mirrors", "decor", "home"],
    category: "decor",
  },
  {
    image: "/images/products/towel-bathrobe.jpg",
    name: "Towel Bathrobe",
    rating: { stars: 4.7, count: 80 },
    priceCents: 250000,
    hasPrice: true,
    type: "product",
    keywords: ["bathrobe", "bath", "comfort"],
    category: "bath",
  },
  {
    image: "/images/products/wooden-chair.jpg",
    name: "Wooden Chair",
    rating: { stars: 4.3, count: 120 },
    priceCents: 0,
    hasPrice: false,
    type: "product",
    keywords: ["wooden", "chair", "furniture"],
    category: "furniture",
  },
  {
    image: "/images/products/coffee-table.jpg",
    name: "Coffee Table",
    rating: { stars: 4.6, count: 95 },
    priceCents: 0,
    hasPrice: false,
    type: "product",
    keywords: ["coffee table", "living room", "furniture"],
    category: "furniture",
  },
  {
    image: "/images/products/sofa-couch.jpg",
    name: "Sofa Couch",
    rating: { stars: 4.8, count: 80 },
    priceCents: 0,
    hasPrice: false,
    type: "product",
    keywords: ["sofa", "couch", "living room", "furniture"],
    category: "furniture",
  },
  {
    image: "/images/products/dining-table.jpg",
    name: "Dining Table",
    rating: { stars: 4.5, count: 110 },
    priceCents: 0,
    hasPrice: false,
    type: "product",
    keywords: ["dining table", "furniture", "dining room"],
    category: "furniture",
  },
  {
    image: "/images/products/bookshelf.jpg",
    name: "Bookshelf",
    rating: { stars: 4.7, count: 60 },
    priceCents: 0,
    hasPrice: false,
    type: "product",
    keywords: ["bookshelf", "furniture", "storage"],
    category: "furniture",
  },
  {
    image: "/images/products/wardrobe.jpg",
    name: "Wardrobe",
    rating: { stars: 4.4, count: 95 },
    priceCents: 0,
    hasPrice: false,
    type: "product",
    keywords: ["wardrobe", "furniture", "storage"],
    category: "furniture",
  },
];

// Seed the database
async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany();
    console.log("Existing products cleared.");

    // Insert new products
    await Product.insertMany(products);
    console.log("Products seeded successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error during seeding:", err);
    mongoose.connection.close();
  }
}

// Start the seeding process
seedDatabase();
