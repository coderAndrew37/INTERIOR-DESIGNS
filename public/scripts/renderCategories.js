// renderCategories.js
import { formatCurrency } from "./utils/currency.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";

export function renderCategories(categories, categoriesContainer) {
  categories.forEach((category) => {
    const sectionHTML = `
      <section class="category-section my-16" data-category="${category.name}">
        <div class="text-center mb-6">
          <i class="${category.icon} text-idcHighlight text-4xl"></i>
          <h2 class="text-3xl font-bold mt-2">${category.name}</h2>
          <p class="text-lg text-idcText italic">${category.description}</p>
        </div>
        <div class="relative">
          <button class="prev-button absolute left-0 top-1/2 transform -translate-y-1/2 bg-idcHighlight text-black rounded-full p-2 z-10">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="horizontal-scroll-container grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto snap-x">
          </div>
          <button class="next-button absolute right-0 top-1/2 transform -translate-y-1/2 bg-idcHighlight text-black rounded-full p-2 z-10">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="text-center mt-4">
          <span class="text-sm text-idcText">
            Showing <span class="current-index">1</span> of <span class="total-count">0</span>
          </span>
        </div>
      </section>
      <div class="full-screen-image w-full h-screen bg-cover bg-center my-16" style="background-image: url('${category.fullScreenImage}');"></div>
    `;

    categoriesContainer.insertAdjacentHTML("beforeend", sectionHTML);

    const section = categoriesContainer.querySelector(
      `.category-section[data-category="${category.name}"]`
    );
    const container = section?.querySelector(".horizontal-scroll-container");
    const prevButton = section?.querySelector(".prev-button");
    const nextButton = section?.querySelector(".next-button");
    const currentIndexEl = section?.querySelector(".current-index");
    const totalCountEl = section?.querySelector(".total-count");

    if (
      !container ||
      !prevButton ||
      !nextButton ||
      !currentIndexEl ||
      !totalCountEl
    ) {
      console.error(
        `Some elements for category ${category.name} were not found.`
      );
      return;
    }

    fetch(`/api/products?category=${category.name}&limit=10`)
      .then((response) => response.json())
      .then(({ products }) => {
        if (!products || products.length === 0) {
          console.warn(`No products found for category ${category.name}`);
          return;
        }

        totalCountEl.textContent = products.length;
        products.forEach((product) => {
          const productHTML = `
            <div class="product-container bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl snap-start">
              <img
                src="${product.image}"
                alt="${product.name}"
                class="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 class="text-lg font-bold text-idcPrimary limit-text-to-2-lines mb-2">${
                product.name
              }</h3>
              <p class="text-xl font-semibold text-idcHighlight">${formatCurrency(
                product.priceCents
              )}</p>
              <button
                class="js-add-to-cart w-full mt-4 px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg"
                data-product-id="${product._id}">
                Add to Cart
              </button>
            </div>
          `;
          container.insertAdjacentHTML("beforeend", productHTML);
        });

        let currentIndex = 0;
        const scrollToIndex = (index) => {
          const productWidth = container.children[0]?.offsetWidth || 0;
          container.scrollLeft = index * productWidth;
          currentIndex = index;
          currentIndexEl.textContent = currentIndex + 1;
        };

        prevButton.addEventListener("click", () => {
          if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
          }
        });

        nextButton.addEventListener("click", () => {
          if (currentIndex < products.length - 1) {
            scrollToIndex(currentIndex + 1);
          }
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
