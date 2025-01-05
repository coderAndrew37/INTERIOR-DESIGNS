import { testimonials, projects, services, faqs, blogs } from "../data/data.js";

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
      <div class="group">
        <button
          class="w-full text-left bg-idcBackground text-idcText py-4 px-6 rounded-lg flex justify-between items-center"
          type="button"
          aria-expanded="${index === 0 ? "true" : "false"}"
        >
          <span class="font-bold">${faq.question}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 transform transition-transform ${
              index === 0 ? "rotate-180" : ""
            }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        <div
          class="hidden group-focus-within:block bg-white text-idcText px-6 py-4 rounded-lg"
        >
          ${faq.answer}
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
});
