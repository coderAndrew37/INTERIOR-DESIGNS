import { initializeCart, initializeSmoothScroll } from "./shared.js";
import { initializeSearchToggle } from "./toggleSearch.js";
import { categories } from "../data/categories.js";
import { renderCategories } from "./renderCategories.js";
import "./authButton.js";
import "./utils/heroSwiper.js";
import "./utils/search.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeSearchToggle();
  initializeCart();
  initializeSmoothScroll();

  const categoriesContainer = document.querySelector("#categories-container");
  const categoryNavItems = document.querySelectorAll(".category-item");

  if (!categoriesContainer) {
    console.error("Categories container not found in the DOM.");
    return;
  }

  if (!categoryNavItems) {
    console.error("Category navigation items not found in the DOM.");
    return;
  }

  // Render all categories by default
  renderCategories(categories, categoriesContainer);

  // Event listener for category navigation
  categoryNavItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Remove active class from all items and add to clicked item
      categoryNavItems.forEach((nav) => nav.classList.remove("active"));
      e.target.classList.add("active");

      const selectedCategory = e.target.getAttribute("data-category");
      const targetSection = categoriesContainer.querySelector(
        `.category-section[data-category="${selectedCategory}"]`
      );
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
