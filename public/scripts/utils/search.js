document.addEventListener("DOMContentLoaded", () => {
  // Search Functionality
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  searchButton?.addEventListener("click", () => {
    const query = searchInput?.value.trim();
    if (query) {
      categoriesContainer.innerHTML = ""; // Clear current products
      fetchProducts(query);
    }
  });
});
