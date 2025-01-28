import { baseUrl } from "../constants.js";
import { addToCart, updateCartQuantity } from "../../data/cart.js";

// Check if the user is authenticated
export async function isAuthenticated() {
  try {
    const response = await fetch(`${baseUrl}/api/users/is-authenticated`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data.authenticated;
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
  }
  return false; // Default to false if there's an error
}

// Initialize Add to Cart listeners
export function initAddToCartListeners() {
  const buttons = document.querySelectorAll(".js-add-to-cart");

  buttons.forEach((button) => {
    // Clone and replace to remove existing listeners
    const newButton = button.cloneNode(true);
    button.replaceWith(newButton);

    newButton.addEventListener("click", async () => {
      const productId = newButton.dataset.productId;

      if (!productId) {
        console.error("Missing productId for Add to Cart button.");
        return;
      }

      // Check authentication
      const isUserAuthenticated = await isAuthenticated();
      if (!isUserAuthenticated) {
        showLoginRedirectPrompt(); // Prompt user to log in
        return;
      }

      // Add to cart with loading spinner and feedback
      await handleAddToCart(productId, newButton);
    });
  });
}

// Handle adding a product to the cart
async function handleAddToCart(productId, button) {
  try {
    // Show loading spinner and disable button
    button.disabled = true;
    button.innerHTML = `
      <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      Adding...
    `;

    // Simulate API calls
    await addToCart(productId, 1); // Add the product to the cart
    await updateCartQuantity(); // Update the cart icon in the navbar

    // Show success feedback
    showSuccessMessage(button);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    showErrorMessage(button, "Failed to add to cart. Try again.");
  } finally {
    // Restore button state
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = "Add to Cart";
    }, 2000);
  }
}

// Show "Added to Cart" success message
function showSuccessMessage(button) {
  const productContainer = button.closest(".product-container");
  if (productContainer) {
    const addedMessage = productContainer.querySelector(".added-to-cart");
    if (addedMessage) {
      addedMessage.textContent = "Added to Cart!";
      addedMessage.classList.remove("hidden", "text-red-500");
      addedMessage.classList.add("text-green-500");

      setTimeout(() => {
        addedMessage.classList.add("hidden");
      }, 2000);
    }
  }
}

// Show error message on failure
function showErrorMessage(button, message) {
  const productContainer = button.closest(".product-container");
  if (productContainer) {
    const addedMessage = productContainer.querySelector(".added-to-cart");
    if (addedMessage) {
      addedMessage.textContent = message;
      addedMessage.classList.remove("hidden", "text-green-500");
      addedMessage.classList.add("text-red-500");

      setTimeout(() => {
        addedMessage.classList.add("hidden");
      }, 3000);
    }
  }
}

// Prompt user to log in if not authenticated
function showLoginRedirectPrompt() {
  const proceedToLogin = confirm(
    "You must log in to add items to your cart. Would you like to log in now?"
  );
  if (proceedToLogin) {
    window.location.href = "/login.html";
  } else {
    alert("You cannot add items to the cart without logging in.");
  }
}
