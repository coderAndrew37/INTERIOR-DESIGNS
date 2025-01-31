import { initializeCart, initializeSmoothScroll } from "./shared.js";
import { initializeSearchToggle } from "./toggleSearch.js";
import { categories } from "../data/categories.js";
import { renderCategories } from "./renderCategories.js";
import { updateCartQuantity } from "../data/cart.js"; // ✅ Import cart update function
import "./authButton.js";
import "./utils/heroSwiper.js";
import "./utils/search.js";

document.addEventListener("DOMContentLoaded", async () => {
  const categoriesContainer = document.querySelector("#categories-container");

  if (!categoriesContainer) {
    console.error("Categories container not found in the DOM.");
    return;
  }

  renderCategories(categories, categoriesContainer);

  // ✅ Call this function to update the cart count when the page loads
  await updateCartQuantity();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  initializeSearchToggle();
  initializeCart();
  initializeSmoothScroll();
});
