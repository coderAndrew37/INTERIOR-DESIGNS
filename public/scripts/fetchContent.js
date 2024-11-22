import {
  testimonials,
  projects,
  services,
  faqs,
  pricing,
} from "../data/data.js";

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Testimonials Section
  const testimonialsContainer = document.querySelector("#testimonials .grid");
  if (testimonialsContainer) {
    testimonials.forEach((testimonial) => {
      const testimonialHTML = `
        <div class="bg-background p-6 rounded-lg shadow-lg hover:bg-primary hover:text-white transition">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mx-auto mb-4" loading="lazy">
          <p class="text-gray-300 mb-4">"${testimonial.message}"</p>
          <p class="text-primary font-bold hover:text-white">– ${testimonial.name}</p>
        </div>
      `;
      testimonialsContainer.innerHTML += testimonialHTML;
    });
  }

  // Projects Section
  const projectsContainer = document.querySelector("#projects .grid");

  if (projectsContainer) {
    projects.forEach(async (project) => {
      // Fetch screenshot from Screenshot API
      const screenshotUrl = `https://shot.screenshotapi.net/screenshot?&token=43NWCR4-XQTMPGE-M16JCGQ-TFRBPAW&url=${project.vercel}&width=1280&height=720&output=image`;

      // Create project card
      const projectHTML = `
        <div class="bg-background p-4 rounded shadow-lg hover:scale-105 hover:shadow-xl transition transform">
          <img
            src="${screenshotUrl}"
            alt="${project.title}"
            class="rounded mb-4"
            loading="lazy"
          />
          <h3 class="text-xl font-semibold text-white">${project.title}</h3>
          <p class="mt-2 text-gray-300">${project.desc}</p>
          <a href="${project.vercel}" target="_blank" class="text-primary hover:underline mt-4 inline-block">
            Visit Live
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

  // Pricing Section
  const pricingContainer = document.querySelector("#pricing .grid");
  if (pricingContainer) {
    pricing.forEach((item) => {
      const pricingHTML = `
      <div class="bg-background p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
        <h3 class="text-xl font-semibold text-primary mb-2">${item.service}</h3>
        <p class="text-gray-400 mb-4">${item.description}</p>
        <p class="text-lg font-bold text-white mb-4">${item.price}</p>
        <button
          class="open-modal px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg font-bold"
          data-service="${item.service}"
          data-whatsapp="${encodeURIComponent(item.whatsappMessage)}"
        >
          Book Now
        </button>
      </div>
    `;
      pricingContainer.innerHTML += pricingHTML;
    });
  }

  // Services Section
  const servicesContainer = document.querySelector("#services .grid");
  if (servicesContainer) {
    services.forEach((service) => {
      const serviceHTML = `
      <div class="bg-accent p-6 rounded-lg text-center hover:bg-primary hover:text-white hover:shadow-lg transition">
        <i class="${service.icon} text-4xl text-primary hover:text-white mb-4 transition-colors"></i>
        <h3 class="text-xl font-semibold">${service.name}</h3>
        <p class="mt-2 text-gray-400">${service.desc}</p>
        <button
          class="open-modal px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg font-bold"
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

  // Function to open the modal
  const openModal = (serviceName, whatsappMessage) => {
    console.log("Service Name:", serviceName);
    console.log("WhatsApp Message:", whatsappMessage);

    const confirmBooking = document.getElementById("confirmBooking");

    if (!confirmBooking) {
      console.error("Confirm Booking button not found!");
      return;
    }

    const whatsappURL = `https://wa.me/254725746263?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    console.log("Generated WhatsApp URL:", whatsappURL);

    confirmBooking.href = whatsappURL;
    document.getElementById("whatsappModal").classList.remove("hidden");
  };

  // Attach click listeners to all buttons with the "open-modal" class
  document.querySelectorAll(".open-modal").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default behavior (like link navigation)
      const serviceName = button.getAttribute("data-service");
      const whatsappMessage = button.getAttribute("data-whatsapp");
      openModal(serviceName, whatsappMessage);
    });
  });

  // Close modal when clicking "Cancel" or outside the modal
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("whatsappModal").classList.add("hidden");
  });
  document.getElementById("whatsappModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("whatsappModal")) {
      document.getElementById("whatsappModal").classList.add("hidden");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.getElementById("whatsappModal").classList.add("hidden");
    }
  });

  // Add event listener for the floating WhatsApp button
  const floatingWhatsApp = document.getElementById("floatingWhatsApp");
  if (floatingWhatsApp) {
    floatingWhatsApp.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceName = floatingWhatsApp.getAttribute("data-service");
      const whatsappMessage = floatingWhatsApp.getAttribute("data-whatsapp");
      openModal(serviceName, whatsappMessage);
    });
  }
});
