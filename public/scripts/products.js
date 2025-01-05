import { formatCurrency } from "./utils/currency.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";
import { initializeCart, initializeSmoothScroll } from "./shared.js";
import "./authButton.js";

// Initialize Add-to-Cart buttons
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
  let isFetching = false;

  // Show skeletons
  function showSkeletons(count = 6) {
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
    if (isFetching) return; // Prevent duplicate requests
    isFetching = true;
    loadMoreButton.disabled = true;

    try {
      showSkeletons(6); // Show 6 skeletons
      const url = query
        ? `/api/products/search?q=${query}&page=${page}`
        : `/api/products?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      hideSkeletons();
      isFetching = false;

      if (data.products && data.products.length > 0) {
        renderProducts(data.products);
        loadMoreButton.style.display =
          data.currentPage < data.totalPages ? "inline-block" : "none";
      } else if (page === 1) {
        productsContainer.innerHTML = `<p class="text-center text-lg text-idcText">
          No products found for "${query}".
        </p>`;
        loadMoreButton.style.display = "none";
      } else {
        loadMoreButton.style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      hideSkeletons();
      isFetching = false;
    } finally {
      loadMoreButton.disabled = false;
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
