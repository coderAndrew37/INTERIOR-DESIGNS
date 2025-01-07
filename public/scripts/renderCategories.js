import { formatCurrency } from "./utils/currency.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";

export function renderCategories(categories, categoriesContainer) {
  categories.forEach((category) => {
    const sectionHTML = `
      <section class="category-section my-16" data-category="${category.name}">
        <div class="full-screen-image w-full h-96 bg-cover bg-center mb-6" 
             style="background-image: url('${category.fullScreenImage}');"></div>
        <div class="text-center mb-6">
          <i class="${category.icon} text-idcHighlight text-4xl"></i>
          <h2 class="text-3xl font-bold mt-2">${category.name}</h2>
          <p class="text-lg text-idcText italic">${category.description}</p>
        </div>
        <div class="products-wrapper grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          <!-- Product Cards Rendered Dynamically Here -->
        </div>
      </section>
    `;

    categoriesContainer.insertAdjacentHTML("beforeend", sectionHTML);

    const section = categoriesContainer.querySelector(
      `.category-section[data-category="${category.name}"]`
    );
    const productsWrapper = section?.querySelector(".products-wrapper");

    if (!productsWrapper) {
      console.error(
        `Products wrapper for category ${category.name} not found.`
      );
      return;
    }

    // Fetch and Render Products
    fetch(`/api/products?category=${category.name}&limit=10`)
      .then((response) => response.json())
      .then(({ products }) => {
        if (!products || products.length === 0) {
          console.warn(`No products found for category ${category.name}`);
          productsWrapper.innerHTML = `
            <p class="text-center text-lg text-idcText italic">
              No products available in this category.
            </p>`;
          return;
        }

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
              <div class="quantity-wrapper flex flex-col items-start mt-4">
                <label for="quantity-${
                  product._id
                }" class="text-sm mb-1">Qty:</label>
                <select
                  id="quantity-${product._id}"
                  class="quantity-select border border-gray-300 rounded-md mb-4"
                  data-product-id="${product._id}">
                  ${Array.from(
                    { length: 10 },
                    (_, i) => `<option value="${i + 1}">${i + 1}</option>`
                  ).join("")}
                </select>
                <button
                  class="js-add-to-cart w-full px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg"
                  data-product-id="${product._id}">
                  Add to Cart
                </button>
              </div>
              <p class="added-to-cart text-green-500 text-sm hidden mt-2">
                Added to Cart!
              </p>
            </div>
          `;
          productsWrapper.insertAdjacentHTML("beforeend", productHTML);
        });

        initAddToCartListeners();
      })
      .catch((error) => {
        console.error(
          `Error fetching products for category ${category.name}:`,
          error
        );
      });
  });
}
