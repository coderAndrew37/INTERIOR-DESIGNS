import "./fetchContent.js";
import "./contact.js";

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll effect
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

  // Menu toggle functionality
  const mobileMenuButton = document.getElementById("mobile-menu");
  const mobileNav = document.getElementById("mobile-nav");
  mobileMenuButton.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
    mobileNav.classList.toggle("block");
  });

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.add("hidden");
        content.classList.remove("opacity-100");
      });

      // Remove active states from all buttons
      tabButtons.forEach((btn) => {
        btn.classList.remove("text-primary", "bg-primary", "border-primary"); // Remove active class
        btn.classList.add("bg-gray-700", "hover:bg-gray-600", "text-gray-300"); // Set default color
      });

      // Show the target content
      const target = document.getElementById(button.dataset.target);
      target.classList.remove("hidden");
      target.classList.add("opacity-100");

      // Highlight the active button
      button.classList.add("text-white", "bg-primary", "border-primary");
      button.classList.remove("bg-gray-700", "text-gray-300");
    });
  });

  // Show the first tab by default
  tabButtons[0].click();
});
