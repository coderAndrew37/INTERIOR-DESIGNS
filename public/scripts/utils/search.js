import { formatCurrency } from "./currency.js";
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const categoriesContainer = document.getElementById("categories-container");
  const suggestionBox = document.createElement("ul");

  suggestionBox.className =
    "suggestion-box absolute bg-white border border-gray-300 rounded-md shadow-md w-full z-10 hidden";
  searchInput.parentNode.appendChild(suggestionBox);

  // Fetch and Display Products
  const fetchProducts = async (query) => {
    try {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      renderProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch Suggestions
  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `/api/products/suggestions?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch suggestions");

      const suggestions = await response.json();
      renderSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Render Products in the Categories Container
  const renderProducts = (products) => {
    categoriesContainer.innerHTML = ""; // Clear existing content

    if (products.length === 0) {
      categoriesContainer.innerHTML = `
        <p class="text-center text-lg text-idcText italic">
          No products found for your search query.
        </p>`;
      return;
    }

    const productsWrapper = document.createElement("div");
    productsWrapper.className =
      "products-wrapper grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

    products.forEach((product) => {
      const productHTML = `
        <div class="product-container bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl">
          <img
            src="${product.image}"
            alt="${product.name}"
            class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 class="text-lg font-bold text-idcPrimary limit-text-to-2-lines mb-2">
            ${product.name}
          </h3>
          <p class="text-xl font-semibold text-idcHighlight">${formatCurrency(
            product.priceCents
          )}</p>
          <button
            class="js-add-to-cart w-full px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg"
            data-product-id="${product._id}">
            Add to Cart
          </button>
        </div>`;
      productsWrapper.insertAdjacentHTML("beforeend", productHTML);
    });

    categoriesContainer.appendChild(productsWrapper);
  };

  // Render Suggestions
  const renderSuggestions = (suggestions) => {
    suggestionBox.innerHTML = ""; // Clear existing suggestions

    if (suggestions.length === 0) {
      suggestionBox.classList.add("hidden");
      return;
    }

    suggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.textContent = suggestion.name;
      suggestionItem.className = "p-2 hover:bg-gray-200 cursor-pointer";

      suggestionItem.addEventListener("click", () => {
        searchInput.value = suggestion.name;
        suggestionBox.classList.add("hidden");
        fetchProducts(suggestion.name); // Trigger search on click
      });

      suggestionBox.appendChild(suggestionItem);
    });

    suggestionBox.classList.remove("hidden");
  };

  // Handle Search Button Click
  searchButton?.addEventListener("click", () => {
    const query = searchInput?.value.trim();
    if (query) {
      suggestionBox.classList.add("hidden");
      categoriesContainer.innerHTML = ""; // Clear current products
      fetchProducts(query);
    }
  });

  // Show Suggestions as User Types
  searchInput?.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    if (query) {
      fetchSuggestions(query);
    } else {
      suggestionBox.classList.add("hidden");
    }
  });

  // Hide Suggestions on Blur
  searchInput?.addEventListener("blur", () => {
    setTimeout(() => suggestionBox.classList.add("hidden"), 200);
  });

  // Prevent Suggestions from Closing When Clicking Inside
  suggestionBox.addEventListener("mousedown", (event) => {
    event.preventDefault(); // Prevent blur event
  });
});
