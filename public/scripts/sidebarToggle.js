document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu");
  const closeMenuButton = document.getElementById("close-menu");
  const sidebarMenu = document.getElementById("sidebar-menu");
  const overlay = document.getElementById("overlay");

  if (!mobileMenuButton || !sidebarMenu || !overlay) {
    console.error("Sidebar elements not found. Check your HTML.");
    return;
  }

  // Open the sidebar
  const openSidebar = () => {
    sidebarMenu.classList.add("open");
    overlay.classList.add("visible");
    sidebarMenu.setAttribute("aria-hidden", "false");
    mobileMenuButton.setAttribute("aria-expanded", "true");
  };

  // Close the sidebar
  const closeSidebar = () => {
    sidebarMenu.classList.remove("open");
    overlay.classList.remove("visible");
    sidebarMenu.setAttribute("aria-hidden", "true");
    mobileMenuButton.setAttribute("aria-expanded", "false");
  };

  // Toggle the sidebar on hamburger button click
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = sidebarMenu.classList.contains("open");
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Close the sidebar on the close button click
  closeMenuButton.addEventListener("click", closeSidebar);

  // Close the sidebar when clicking outside (overlay)
  overlay.addEventListener("click", closeSidebar);

  // Close the sidebar when a link is clicked
  sidebarMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });
});
