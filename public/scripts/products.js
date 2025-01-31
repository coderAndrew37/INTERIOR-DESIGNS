import { initializeCart, initializeSmoothScroll } from "./shared.js";
import { initializeSearchToggle } from "./toggleSearch.js";
import { categories } from "../data/categories.js";
import { renderCategories } from "./renderCategories.js";
import "./authButton.js";
import "./utils/heroSwiper.js";
import "./utils/search.js";

document.addEventListener("DOMContentLoaded", () => {
  const categoriesContainer = document.querySelector("#categories-container");

  if (!categoriesContainer) {
    console.error("Categories container not found in the DOM.");
    return;
  }

  // ✅ Render categories before enabling smooth scrolling
  renderCategories(categories, categoriesContainer);

  // ✅ Enable smooth scrolling for internal links (hero carousel & category navigation)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href"); // Get hash value (e.g., #beddings)
      const targetSection = document.querySelector(targetId); // Find corresponding section

      if (targetSection) {
        event.preventDefault(); // Prevent default anchor jump
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  initializeSearchToggle();
  initializeCart();
  initializeSmoothScroll();
});
