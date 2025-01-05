// products.js
import { formatCurrency } from "./utils/currency.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";
import "./authButton.js";
import { initializeCart, initializeSmoothScroll } from "./shared.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCart();
  initializeSmoothScroll();

  const productsContainer = document.querySelector("#products .grid");
  const searchInput = document.getElementById("search-input");
  const suggestionList = document.getElementById("suggestion-list");
  const searchButton = document.getElementById("search-button");
  let debounceTimeout;

  if (productsContainer) {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      fetchProducts(searchQuery);
    } else {
      fetchProducts();
    }
  }

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    const query = searchInput.value.trim();
    if (query.length > 1) {
      debounceTimeout = setTimeout(() => fetchSuggestions(query), 300);
    } else {
      suggestionList.innerHTML = "";
      suggestionList.classList.add("hidden");
    }
  });

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchProducts(query);
    }
  });

  async function fetchSuggestions(query) {
    try {
      const response = await fetch(`/api/products/suggestions?q=${query}`);
      const suggestions = await response.json();

      suggestionList.innerHTML = suggestions
        .map(
          (item) =>
            `<li class="px-4 py-2 text-idcText bg-idcBackground hover:bg-idcAccent hover:text-white cursor-pointer border-b last:border-0 border-idcText/20 rounded transition-all">
              ${item.name}
            </li>`
        )
        .join("");
      suggestionList.classList.remove("hidden");

      suggestionList.querySelectorAll("li").forEach((li) => {
        li.addEventListener("click", () => {
          searchInput.value = li.textContent.trim();
          suggestionList.classList.add("hidden");
          fetchProducts(searchInput.value);
        });
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }

  async function fetchProducts(query = "") {
    try {
      const url = query
        ? `/api/products/search?q=${query}`
        : "/api/products?limit=12";
      const response = await fetch(url);
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        renderProducts(data.products);
      } else {
        productsContainer.innerHTML = `
          <p class="text-center text-lg text-idcText">
            No products found for "${query}".
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
