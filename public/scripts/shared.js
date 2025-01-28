// shared.js
import { updateCartQuantity } from "../data/cart.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";

export function initializeCart() {
  updateCartQuantity(); // Updates the cart quantity badge
  initAddToCartListeners(); // Adds event listeners to Add-to-Cart buttons
}

export function initializeSmoothScroll() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

export function initializeNavbar() {
  console.log("Navbar script loaded...");
  const mobileMenuButton = document.getElementById("mobile-menu");
  const mobileNav = document.getElementById("mobile-nav");

  if (!mobileMenuButton) {
    console.error("Mobile menu button not found");
    return;
  }

  if (!mobileNav) {
    console.error("Mobile nav menu not found");
    return;
  }

  console.log("Attaching event listeners...");
  // Toggle mobile nav visibility
  mobileMenuButton.addEventListener("click", () => {
    console.log("Menu button clicked");
    if (mobileNav.classList.contains("hidden")) {
      mobileNav.classList.remove("hidden");
      mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    } else {
      mobileNav.style.maxHeight = "0px";
      setTimeout(() => mobileNav.classList.add("hidden"), 300);
    }
  });

  // Reset navbar visibility on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      mobileNav.classList.remove("hidden");
      mobileNav.style.maxHeight = "none";
    } else if (!mobileNav.classList.contains("hidden")) {
      mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    }
  });

  console.log("Navbar event listeners attached successfully.");
}
