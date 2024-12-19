// fetchContent.js
import { testimonials, projects, services, faqs, blogs } from "../data/data.js";
import { formatCurrency } from "./utils/currency.js";
document.addEventListener("DOMContentLoaded", () => {
  // Blogs Section
  const blogsContainer = document.querySelector("#blogs .grid");
  if (blogsContainer) {
    blogs.forEach((blog) => {
      const blogHTML = `
        <div class="bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <img
            src="${blog.image}"
            alt="${blog.title}"
            class="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h3 class="text-2xl font-bold text-idcPrimary mb-2">${blog.title}</h3>
          <p class="text-idcText mb-4">${blog.description}</p>
          <p class="text-sm text-idcText mb-4">${new Date(
            blog.date
          ).toDateString()}</p>
          <a
            href="/blog.html?id=${blog.id}"
            class="px-4 py-2 bg-idcHighlight text-black rounded-lg font-bold hover:bg-opacity-90"
          >
            Read More
          </a>
        </div>
      `;
      blogsContainer.innerHTML += blogHTML;
    });
  }

  // Testimonials Section
  const testimonialsContainer = document.querySelector("#testimonials .grid");
  if (testimonialsContainer) {
    testimonials.forEach((testimonial) => {
      const testimonialHTML = `
        <div class="bg-idcAccent p-6 rounded-lg shadow-lg hover:bg-idcHighlight hover:text-black transition">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mx-auto mb-4" loading="lazy">
          <p class="text-idcText mb-4">"${testimonial.message}"</p>
          <p class="text-idcHighlight font-bold hover:text-black">– ${testimonial.name}</p>
        </div>
      `;
      testimonialsContainer.innerHTML += testimonialHTML;
    });
  }

  // Portfolio Section
  const projectsContainer = document.querySelector("#projects .grid");
  if (projectsContainer) {
    projects.forEach((project) => {
      const projectHTML = `
  <div class="bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
    <img
      src="${project.image}"
      alt="${project.title}"
      class="rounded-lg mb-4"
    />
    <h3 class="text-xl font-bold text-idcPrimary mb-2">${project.title}</h3>
    <p class="text-idcText mb-4">${project.desc}</p>
    <a
    class="px-4 py-2 bg-idcHighlight text-black rounded-lg font-bold hover:bg-opacity-90"
      href="/portfolio-details.html?id=${project.id}">
      View Details
    </a>
  </div>
`;

      projectsContainer.innerHTML += projectHTML;
    });
  }

  // FAQs Section
  const accordion = document.getElementById("faqsAccordion");
  if (accordion) {
    faqs.forEach((faq, index) => {
      const faqHTML = `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading${index}">
            <button
              class="accordion-button ${index === 0 ? "" : "collapsed"}"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse${index}"
              aria-expanded="${index === 0 ? "true" : "false"}"
              aria-controls="collapse${index}"
            >
              ${faq.question}
            </button>
          </h2>
          <div
            id="collapse${index}"
            class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
            aria-labelledby="heading${index}"
            data-bs-parent="#faqsAccordion"
          >
            <div class="accordion-body">
              ${faq.answer}
            </div>
          </div>
        </div>
      `;
      accordion.innerHTML += faqHTML;
    });
  }

  // Services Section
  const servicesContainer = document.querySelector("#services .grid");
  if (servicesContainer) {
    services.forEach((service) => {
      const serviceHTML = `
        <div class="bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <img
            src="${service.image}"
            alt="${service.name}"
            class="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h3 class="text-xl font-bold text-idcPrimary mb-2">${service.name}</h3>
          <p class="text-idcText mb-4">${service.desc}</p>
          <button
            class="open-modal px-4 py-2 bg-idcHighlight text-black rounded-lg font-bold hover:bg-opacity-90"
            data-service="${service.name}"
            data-whatsapp="I am interested in booking the ${service.name} service."
          >
            Book Now
          </button>
        </div>
      `;
      servicesContainer.innerHTML += serviceHTML;
    });
  }

  const featuredProductsContainer = document.querySelector(
    "#featured-products .grid"
  );

  async function fetchFeaturedProducts() {
    try {
      const response = await fetch("/api/products?limit=12"); // Fetch 6 featured products
      const data = await response.json();

      if (data.products && data.products.length > 0) {
        renderFeaturedProducts(data.products);
      } else {
        featuredProductsContainer.innerHTML = `
          <p class="text-center text-lg text-idcText">
            No featured products available at the moment.
          </p>`;
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
      featuredProductsContainer.innerHTML = `
        <p class="text-center text-lg text-idcText text-red-600">
          Failed to load products. Please try again later.
        </p>`;
    }
  }

  function renderFeaturedProducts(products) {
    featuredProductsContainer.innerHTML = products
      .map((product) => generateProductHTML(product))
      .join("");
  }

  function generateProductHTML(product) {
    return `
    <div class="bg-idcAccent p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105">
      <img
        class="w-full h-48 object-cover rounded-lg mb-4"
        src="${product.image}"
        alt="${product.name}"
      />
      <h3 class="text-lg font-bold text-idcPrimary limit-text-to-2-lines mb-2">
        ${product.name}
      </h3>
      <div class="flex items-center mb-4">
        <img
          class="w-20 h-5"
          src="images/ratings/rating-${product.rating.stars * 10}.png"
          alt="${product.rating.stars} stars"
        />
        <span class="ml-2 text-sm text-idcText">
          (${product.rating.count} reviews)
        </span>
      </div>
      <p class="text-xl font-semibold text-idcHighlight">
        ${formatCurrency(product.priceCents)}
      </p>
      <button
        class="js-add-to-cart w-full mt-4 px-4 py-2 bg-idcHighlight text-black font-bold rounded-lg hover:bg-opacity-90"
        data-product-id="${product._id}"
      >
        Add to Cart
      </button>
    </div>
  `;
  }

  fetchFeaturedProducts();
});
