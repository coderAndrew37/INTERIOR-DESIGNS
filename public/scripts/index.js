import "./fetchContent.js";
import "./contact.js";
import "./modal.js";
import "./newsletter.js";
import "./leads.js";
import "./animations.js";
import "./authButton.js";

import {
  initializeCart,
  initializeSmoothScroll,
  initializeNavbar,
} from "./shared.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCart(); // Cart-related functionality
  initializeSmoothScroll(); // Smooth scrolling for anchor links
  initializeNavbar(); // Navbar toggle and resizing
});
