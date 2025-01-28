import "./fetchContent.js";
import "./contact.js";
import "./modal.js";
import "./newsletter.js";
import "./leads.js";
import "./animations.js";
import "./authButton.js";
import "./sidebarToggle.js";

import { initializeCart, initializeSmoothScroll } from "./shared.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCart(); // Cart-related functionality
  initializeSmoothScroll(); // Smooth scrolling for anchor links
});
