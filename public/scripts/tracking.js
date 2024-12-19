import { checkAuthentication } from "./utils/authUtils.js";
import { baseUrl } from "./constants.js";

/**
 * Fetch tracking details for a specific order and product.
 * @param {string} orderId - The ID of the order.
 * @param {string} productId - The ID of the product.
 */
async function fetchTrackingDetails(orderId, productId) {
  try {
    const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tracking details.");
    }

    const order = await response.json();

    // Find the specific product within the order
    const product = order.items.find(
      (item) => item.productId._id === productId
    );
    if (!product) {
      document.querySelector("main").innerHTML =
        "<p class='text-red-600'>Product not found in this order.</p>";
      return;
    }

    // Render the tracking details
    renderTrackingDetails(order, product);
  } catch (error) {
    console.error("Error fetching tracking details:", error);
    document.querySelector("main").innerHTML =
      "<p class='text-red-600'>Error loading tracking details. Please try again later.</p>";
  }
}

/**
 * Render the tracking details on the page.
 * @param {object} order - The full order details.
 * @param {object} product - The specific product within the order.
 */
function renderTrackingDetails(order, product) {
  // Update delivery date
  document.querySelector(
    ".delivery-date"
  ).textContent = `Arriving on ${new Date(
    product.deliveryDate
  ).toLocaleDateString()}`;

  // Update product name and quantity
  document.querySelector(".product-info").textContent = product.productId.name;
  document.querySelector(
    ".product-info + .product-info"
  ).textContent = `Quantity: ${product.quantity}`;

  // Update product image
  document.querySelector(".product-image").src = product.productId.image;

  // Update progress bar logic
  const progressPercentage =
    {
      Preparing: "33%",
      Shipped: "66%",
      Delivered: "100%",
    }[order.status] || "0%";

  document.querySelector(".progress-bar").style.width = progressPercentage;
}

/**
 * Parse query parameters from the URL.
 * @returns {object} - An object containing `orderId` and `productId`.
 */
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  const productId = params.get("productId");

  if (!orderId || !productId) {
    throw new Error("Invalid or missing query parameters.");
  }

  return { orderId, productId };
}

// Initialize the tracking page when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  try {
    const { orderId, productId } = getQueryParams();
    fetchTrackingDetails(orderId, productId);
  } catch (error) {
    console.error("Error:", error.message);
    document.querySelector("main").innerHTML =
      "<p class='text-red-600'>Invalid tracking link. Please check the URL and try again.</p>";
  }
});
