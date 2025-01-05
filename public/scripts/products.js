// products.js
import { formatCurrency } from "./utils/currency.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";
import "./authButton.js";
import {
  initializeCart,
  initializeSmoothScroll,
  initializeNavbar,
} from "./shared.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCart(); // Cart-related functionality
  initializeSmoothScroll(); // Smooth scrolling for anchor links
  initializeNavbar(); // Navbar toggle and resizing
  const productsContainer = document.querySelector("#products .grid");

  if (productsContainer) {
    fetchProducts();
  }

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products?limit=12");
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        renderProducts(data.products);
      } else {
        productsContainer.innerHTML = `
          <p class="text-center text-lg text-idcText">
            No products available at the moment.
          </p>`;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      productsContainer.innerHTML = `
        <p class="text-center text-lg text-idcText text-red-600">
          Failed to load products. Please try again later.
        </p>`;
    }
  }

  function renderProducts(products) {
    productsContainer.innerHTML = products
      .map((product) => generateProductHTML(product))
      .join("");
    // Initialize Add-to-Cart buttons
    initAddToCartListeners();
  }

  function generateProductHTML(product) {
    return `
      <div class="product-container bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105">
        <img
          class="w-full h-48 object-cover rounded-lg mb-4"
          src="${product.image}"
          alt="${product.name}"
        />
        <h3 class="text-lg font-bold text-idcPrimary limit-text-to-2-lines mb-2">
          ${product.name}
        </h3>
        <div class="flex items-center mb-4">
          <img
            class="w-20 h-5"
            src="images/ratings/rating-${product.rating.stars}.png"
            alt="${product.rating.stars} stars"
          />
          <span class="ml-2 text-sm text-idcText">
            (${product.rating.count} reviews)
          </span>
        </div>
        <p class="text-xl font-semibold text-idcHighlight">
          ${formatCurrency(product.priceCents)}
        </p>
        <button
          class="js-add-to-cart w-full mt-4 px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg hover:bg-opacity-90"
          data-product-id="${product._id}"
        >
          Add to Cart
        </button>
      </div>
    `;
  }
});
