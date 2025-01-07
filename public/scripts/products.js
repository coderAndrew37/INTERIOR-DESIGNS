import { formatCurrency } from "./utils/currency.js";
import { initAddToCartListeners } from "./utils/cartUtils.js";
import { initializeCart, initializeSmoothScroll } from "./shared.js";
import "./authButton.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCart();
  initializeSmoothScroll();

  const categories = [
    {
      name: "beddings",
      fullScreenImage: "/images/beddings-fullscreen.jpg",
      description: "Discover premium beddings for your home.",
    },
    {
      name: "furniture",
      fullScreenImage: "/images/furniture-fullscreen.jpg",
      description: "Upgrade your space with stylish furniture.",
    },
    {
      name: "pillows",
      fullScreenImage: "/images/pillows-fullscreen.jpg",
      description: "Comfortable and luxurious pillows for every need.",
    },
    {
      name: "Decor",
      fullScreenImage: "/images/curtains-fullscreen.jpg",
      description: "Elevate your home with beautiful decor pieces.",
    },
    {
      name: "Bath",
      fullScreenImage: "/images/bath-fullscreen.jpg",
      description: "Indulge in the perfect bathroom experience.",
    },
  ];

  const categoriesContainer = document.querySelector("#categories-container");

  // Hero Carousel with Swiper.js
  new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Horizontal Scroll for Categories
  function enableDragScroll(container) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      container.classList.add("dragging");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDragging = false;
      container.classList.remove("dragging");
    });

    container.addEventListener("mouseup", () => {
      isDragging = false;
      container.classList.remove("dragging");
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      container.scrollLeft = scrollLeft - walk;
    });
  }

  // Fetch and Render Categories
  categories.forEach(async (category) => {
    // Generate Section HTML
    const sectionHTML = `
      <section class="category-section my-16" data-category="${category.name}">
        <h2 class="text-3xl font-bold mb-4 capitalize">${category.name}</h2>
        <p class="mb-4 text-lg">${category.description}</p>
        <div class="horizontal-scroll-container flex overflow-x-auto gap-4 snap-x">
          <!-- Products dynamically inserted here -->
        </div>
        <button class="view-more-button mt-4 text-idcHighlight">View More</button>
      </section>
      <div
        class="full-screen-image w-full h-screen bg-cover bg-center my-16"
        style="background-image: url('${category.fullScreenImage}');"
      ></div>
    `;
    categoriesContainer.insertAdjacentHTML("beforeend", sectionHTML);

    // Fetch and Render Products for the Category
    const container = document.querySelector(
      `.category-section[data-category="${category.name}"] .horizontal-scroll-container`
    );

    try {
      const response = await fetch(
        `/api/products?category=${category.name}&limit=10`
      );
      const { products } = await response.json();

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

      enableDragScroll(container);
      initAddToCartListeners();
    } catch (error) {
      console.error(
        `Error fetching products for category ${category.name}:`,
        error
      );
    }
  });

  // Search Functionality
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const loadMoreButton = document.getElementById("load-more");
  let currentPage = 1;

  async function fetchProducts(query = "", page = 1) {
    if (isFetching) return; // Prevent duplicate requests
    isFetching = true;
    loadMoreButton.disabled = true;

    try {
      const url = query
        ? `/api/products/search?q=${query}&page=${page}`
        : `/api/products?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        renderProducts(data.products);
        loadMoreButton.style.display =
          data.currentPage < data.totalPages ? "inline-block" : "none";
      } else if (page === 1) {
        categoriesContainer.innerHTML = `<p class="text-center text-lg text-idcText">
          No products found for "${query}".
        </p>`;
        loadMoreButton.style.display = "none";
      } else {
        loadMoreButton.style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      isFetching = false;
      loadMoreButton.disabled = false;
    }
  }

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      categoriesContainer.innerHTML = ""; // Clear current products
      fetchProducts(query);
    }
  });

  loadMoreButton.addEventListener("click", () => {
    currentPage++;
    fetchProducts("", currentPage);
  });
});
