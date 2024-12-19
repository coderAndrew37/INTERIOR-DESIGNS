import { baseUrl } from "./constants.js";
import { formatCurrency } from "./utils/currency.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./renderPaymentSummary.js";
import { updateCartQuantity } from "../data/cart.js";

const today = dayjs();

// Fetch cart and product data
async function fetchCartAndProducts() {
  try {
    const cartResponse = await fetch(`${baseUrl}/api/cart/get-cart`, {
      method: "GET",
      credentials: "include",
    });

    if (!cartResponse.ok) throw new Error("Failed to fetch cart data");

    const { cart, deliveryOptions } = await cartResponse.json();

    if (!cart || cart.length === 0) return { cart: [], deliveryOptions };

    const productIds = cart.map((item) => item.productId);
    const productResponse = await fetch(
      `${baseUrl}/api/products/by-ids?ids=${productIds.join(",")}`
    );

    if (!productResponse.ok) throw new Error("Failed to fetch product details");

    const products = await productResponse.json();
    return { cart, deliveryOptions, products };
  } catch (error) {
    console.error("Error fetching cart and products:", error);
    return { cart: [], deliveryOptions: [], products: [] };
  }
}

// Generate HTML for delivery options
function deliveryOptionsHTML(
  productId,
  deliveryOptions,
  selectedOptionId = "2"
) {
  return deliveryOptions
    .map((option) => {
      const date = today
        .add(option.deliveryDays, "days")
        .format("dddd, MMMM D");
      const price =
        option.priceCents === 0
          ? "FREE"
          : `KSH ${formatCurrency(option.priceCents)}`;
      const checked = option.id === selectedOptionId ? "checked" : "";

      return `
        <label class="flex items-center gap-2">
          <input
            type="radio"
            name="delivery-option-${productId}"
            value="${option.id}"
            data-product-id="${productId}"
            data-delivery-days="${option.deliveryDays}"
            class="delivery-option-input"
            ${checked}
          />
          <span>${date} (${price})</span>
        </label>
      `;
    })
    .join("");
}

// Update delivery date dynamically
function updateDeliveryDate(productId, deliveryDays) {
  const deliveryDateElem = document.querySelector(
    `.js-delivery-date-${productId}`
  );
  if (deliveryDateElem) {
    const newDeliveryDate = today
      .add(deliveryDays, "days")
      .format("dddd, MMMM D");
    deliveryDateElem.textContent = `Delivery date: ${newDeliveryDate}`;
  }
}

// Render the order summary
export async function renderOrderSummary() {
  const { cart, deliveryOptions, products } = await fetchCartAndProducts();

  if (!cart.length) {
    document.querySelector(".js-order-summary").innerHTML =
      "<p>Your cart is empty.</p>";
    renderPaymentSummary([], []); // Render empty summary
    return;
  }

  let orderSummaryHTML = "";
  cart.forEach((cartItem) => {
    const product = products.find((p) => p._id === cartItem.productId);
    if (!product) return;

    orderSummaryHTML += `
      <div class="border rounded-lg p-4 shadow-md mb-4">
        <div class="text-idcPrimary font-semibold mb-2">
          Delivery date: <span class="js-delivery-date-${product._id}">
            ${today.add(7, "days").format("dddd, MMMM D")}
          </span>
        </div>
        <div class="grid grid-cols-3 gap-4 items-center">
          <img
            class="col-span-1 max-w-full h-24 object-cover"
            src="${product.image}"
            alt="${product.name}"
          />
          <div class="col-span-2 space-y-2">
            <div class="font-bold text-lg">${product.name}</div>
            <div class="text-red-600 font-semibold">KSH ${formatCurrency(
              product.priceCents
            )}</div>
            <div class="text-gray-500">
              Quantity:
              <select
                class="border rounded-lg p-2 js-quantity-select"
                data-product-id="${product._id}"
              >
                ${Array.from({ length: 10 }, (_, i) => {
                  const quantity = i + 1;
                  const selected =
                    quantity === cartItem.quantity ? "selected" : "";
                  return `<option value="${quantity}" ${selected}>${quantity}</option>`;
                }).join("")}
              </select>
              <button
                class="ml-2 text-idcPrimary underline js-delete-quantity-link"
                data-product-id="${product._id}"
              >
                Delete
              </button>
            </div>
            <div class="mt-4">
              <div class="font-semibold">Delivery Options:</div>
              ${deliveryOptionsHTML(product._id, deliveryOptions)}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;

  // Attach event listeners
  attachCartEventListeners(cart, products, deliveryOptions);
  renderPaymentSummary(cart, products, deliveryOptions); // Update totals
}

// Attach event listeners for cart actions
function attachCartEventListeners(cart, products, deliveryOptions) {
  document.querySelectorAll(".js-quantity-select").forEach((select) => {
    select.addEventListener("change", async (event) => {
      const productId = event.target.dataset.productId;
      const newQuantity = parseInt(event.target.value, 10);

      try {
        await fetch(`${baseUrl}/api/cart/update-cart`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity: newQuantity }),
          credentials: "include",
        });
        renderOrderSummary();
      } catch (error) {
        console.error("Error updating quantity:", error);
        alert("Failed to update quantity. Please try again.");
      }
    });
  });

  document.querySelectorAll(".js-delete-quantity-link").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = button.dataset.productId;

      try {
        await fetch(`${baseUrl}/api/cart/remove-from-cart/${productId}`, {
          method: "DELETE",
          credentials: "include",
        });
        renderOrderSummary();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    });
  });

  document.querySelectorAll(".delivery-option-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const productId = input.dataset.productId;
      const deliveryDays = parseInt(input.dataset.deliveryDays, 10);
      updateDeliveryDate(productId, deliveryDays);
      renderPaymentSummary(cart, products, deliveryOptions);
    });
  });
}
