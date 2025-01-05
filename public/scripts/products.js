import { formatCurrency } from "./utils/currency.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";
import { initializeCart, initializeSmoothScroll } from "./shared.js";
import "./authButton.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCart();
  initializeSmoothScroll();

  const productsContainer = document.querySelector("#products .grid");
  const skeletonTemplate = document.querySelector(".skeleton");
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const loadMoreButton = document.getElementById("load-more");

  let currentPage = 1;

  // Show skeletons
  function showSkeletons(count = 6) {
    productsContainer.innerHTML = ""; // Clear products
    for (let i = 0; i < count; i++) {
      const skeleton = skeletonTemplate.cloneNode(true);
      skeleton.style.display = "block";
      productsContainer.appendChild(skeleton);
    }
  }

  // Hide skeletons
  function hideSkeletons() {
    document.querySelectorAll(".skeleton").forEach((el) => el.remove());
  }

  async function fetchProducts(query = "", page = 1) {
    try {
      showSkeletons();
      const url = query
        ? `/api/products/search?q=${query}&page=${page}`
        : `/api/products?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      hideSkeletons();

      if (data.products && data.products.length > 0) {
        renderProducts(data.products);
      } else if (page === 1) {
        productsContainer.innerHTML = `<p class="text-center text-lg text-idcText">
          No products found for "${query}".
        </p>`;
      } else {
        loadMoreButton.style.display = "none"; // Hide Load More
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function renderProducts(products) {
    const productsHTML = products
      .map((product) => generateProductHTML(product))
      .join("");
    productsContainer.insertAdjacentHTML("beforeend", productsHTML);
    initAddToCartListeners();
  }

  function generateProductHTML(product) {
    return `
      <div class="product-container bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl">
        <img
          class="w-full h-48 object-cover rounded-lg mb-4"
          src="${product.image}"
          alt="${product.name}"
        />
        <h3 class="text-lg font-bold text-idcPrimary limit-text-to-2-lines mb-2">${
          product.name
        }</h3>
        <p class="text-xl font-semibold text-idcHighlight">${formatCurrency(
          product.priceCents
        )}</p>
        <div class="flex items-center mt-2">
          <label for="quantity-${product._id}" class="mr-2">Qty:</label>
          <select id="quantity-${product._id}" class="w-16">
            ${Array.from(
              { length: 10 },
              (_, i) => `<option value="${i + 1}">${i + 1}</option>`
            ).join("")}
          </select>
        </div>
        <button
          class="js-add-to-cart w-full mt-4 px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg"
          data-product-id="${product._id}">
          Add to Cart
        </button>
      </div>`;
  }

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className =
      "bg-green-500 text-white px-4 py-2 rounded shadow-lg mb-4";
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    notificationContainer.classList.remove("hidden");

    setTimeout(() => {
      notification.remove();
      if (!notificationContainer.children.length) {
        notificationContainer.classList.add("hidden");
      }
    }, 3000);
  }

  loadMoreButton.addEventListener("click", () => {
    currentPage++;
    fetchProducts("", currentPage);
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-add-to-cart")) {
      const productId = e.target.dataset.productId;
      const quantity = document.getElementById(`quantity-${productId}`).value;

      // Simulate adding to cart
      showNotification(`Added ${quantity} item(s) to the cart.`);
    }
  });

  // Initial fetch
  fetchProducts();
});
