export function initializeSearchToggle() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchModal = document.createElement("div");
  const searchIcon = document.createElement("button");

  searchIcon.innerHTML =
    '<i class="fas fa-search text-idcPrimary text-2xl"></i>';
  searchIcon.classList.add("lg:hidden", "focus:outline-none", "ml-4");

  const searchContainer = searchInput.parentElement;
  searchContainer.before(searchIcon);

  searchModal.id = "search-modal";
  searchModal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50";
  searchModal.innerHTML = `
    <div class="w-full max-w-xl bg-idcBackground p-4 rounded-lg">
      <div class="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          id="modal-search-input"
          class="w-full h-12 px-4 text-idcText bg-idcBackground border border-idcHighlight focus:outline-none focus:ring-2 focus:ring-idcHighlight rounded-lg"
        />
        <button id="modal-close" class="ml-2 text-idcHighlight">
          <i class="fas fa-times text-2xl"></i>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(searchModal);

  const modalInput = searchModal.querySelector("#modal-search-input");
  const modalClose = searchModal.querySelector("#modal-close");

  searchIcon.addEventListener("click", () => {
    searchModal.classList.remove("hidden");
    modalInput.focus();
  });

  modalClose.addEventListener("click", () => {
    searchModal.classList.add("hidden");
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchModal.classList.add("hidden");
    }
  });

  searchContainer.classList.add("hidden", "lg:flex"); // Add initial hiding for smaller screens

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      searchContainer.classList.remove("hidden"); // Visible for large screens
    } else {
      searchContainer.classList.add("hidden"); // Hide for small screens
    }
  });
}
