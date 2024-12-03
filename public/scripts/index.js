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

  // Collapsible Navbar Logic
  const navLinks = document.querySelectorAll("#mobile-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
      mobileNav.classList.remove("block");
    });
  });
});
