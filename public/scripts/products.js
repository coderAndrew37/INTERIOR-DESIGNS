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

  if (!categoriesContainer) {
    console.error("Categories container not found in the DOM.");
    return;
  }

  renderCategories(categories, categoriesContainer);
});
