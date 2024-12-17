import { baseUrl as baseURL } from "../scripts/constants.js";

// Array to store products
export let products = [];

// Fetch and render products
export async function loadProducts(page = 1) {
  const apiUrl = `${baseURL}/api/products?page=${page}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Ensure products array
    if (!data.products || !Array.isArray(data.products)) {
      throw new TypeError(
        "API response is invalid or products is not an array."
      );
    }

    products = data.products.map(
      (productDetails) => new Product(productDetails)
    );

    return {
      products,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      totalProducts: data.totalProducts,
    };
  } catch (error) {
    console.error("Failed to load products:", error);
    throw error;
  }
}

// Helper to format prices
export function formatCurrency(priceCents) {
  return `KSH ${(priceCents / 100).toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// Product class
export class Product {
  constructor(productDetails) {
    this.id = productDetails._id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  // Get rating stars image URL
  getStarUrl() {
    return `/images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  // Get formatted price
  getPrice() {
    return formatCurrency(this.priceCents);
  }
}
