import { baseUrl } from "../scripts/constants.js";
import { makeAuthenticatedRequest } from "../scripts/utils/tokenUtils.js";
// Update cart quantity in the UI
export async function updateCartQuantity() {
  try {
    // Fetch the user's cart data from the backend
    const response = await makeAuthenticatedRequest(
      `${baseUrl}/api/cart/get-cart`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch cart data");
      return;
    }

    const data = await response.json();
    const cart = data.cart || [];

    // Calculate total quantity of items in the cart
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // ✅ Update cart quantity display in the header
    const cartQuantityElement = document.querySelector(".js-cart-quantity");

    if (cartQuantityElement) {
      cartQuantityElement.textContent = cartQuantity;

      if (cartQuantity > 0) {
        cartQuantityElement.classList.remove("hidden"); // Show quantity
      } else {
        cartQuantityElement.classList.add("hidden"); // Hide if zero
      }
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
}

// Add product to the cart using backend API
export async function addToCart(productId, quantity = 1) {
  try {
    const response = await makeAuthenticatedRequest(
      `${baseUrl}/api/cart/add-to-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      if (response.status === 401 && data.redirect) {
        alert(data.message || "Unauthorized access. Redirecting to login.");
        window.location.href = data.redirect;
      } else {
        alert(data.message || "Failed to add product to cart.");
      }
      return;
    }

    const data = await response.json();

    // Update the cart quantity in the UI
    updateCartQuantity();
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("An error occurred. Please try again.");
  }
}

// Remove an item from the cart using backend API
export async function removeFromCart(productId) {
  try {
    const response = await makeAuthenticatedRequest(
      `${baseUrl}/api/cart/remove-from-cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      alert(data.message || "Failed to remove product from cart.");
      return;
    }

    // Update the cart quantity in the UI after removal
    updateCartQuantity();
  } catch (error) {
    console.error("Error removing product from cart:", error);
    alert("An error occurred. Please try again.");
  }
}

// Clear all items from the cart using backend API
export async function clearCart() {
  try {
    const response = await makeAuthenticatedRequest(
      `${baseUrl}/api/cart/clear-cart`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const data = await response.json();
      alert(data.message || "Failed to clear the cart.");
      return;
    }

    // Update the cart quantity in the UI after clearing
    updateCartQuantity();
  } catch (error) {
    console.error("Error clearing the cart:", error);
    alert("An error occurred. Please try again.");
  }
}
