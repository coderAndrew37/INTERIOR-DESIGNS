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
  // Navbar toggle functionality
  const mobileMenuButton = document.getElementById("mobile-menu");
  const mobileNav = document.getElementById("mobile-nav");

  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener("click", () => {
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

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll("#mobile-nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          mobileNav.style.maxHeight = "0px";
          setTimeout(() => mobileNav.classList.add("hidden"), 300);
        }
      });
    });
  }
}
