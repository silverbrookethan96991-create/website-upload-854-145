(function () {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobilePanel = document.querySelector("[data-mobile-panel]");

  if (menuButton && mobilePanel) {
    menuButton.addEventListener("click", function () {
      mobilePanel.classList.toggle("is-open");
    });
  }

  document.querySelectorAll("[data-search-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const input = form.querySelector("input[name='q']");
      const query = input ? input.value.trim() : "";
      const base = form.getAttribute("data-base") || "search.html";
      const target = query ? base + "?q=" + encodeURIComponent(query) : base;
      window.location.href = target;
    });
  });

  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll("[data-hero-dot]"));
  let activeIndex = 0;

  function setSlide(index) {
    if (!slides.length) {
      return;
    }
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach(function (dot, dotIndex) {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      setSlide(index);
    });
  });

  if (slides.length > 1) {
    setInterval(function () {
      setSlide(activeIndex + 1);
    }, 5000);
  }

  const cardSearch = document.querySelector("[data-card-search]");
  const yearFilter = document.querySelector("[data-card-filter='year']");
  const typeFilter = document.querySelector("[data-card-filter='type']");
  const cards = Array.from(document.querySelectorAll(".movie-card"));

  function applyFilters() {
    const query = cardSearch ? cardSearch.value.trim().toLowerCase() : "";
    const year = yearFilter ? yearFilter.value : "";
    const type = typeFilter ? typeFilter.value : "";

    cards.forEach(function (card) {
      const text = card.textContent.toLowerCase();
      const matchesQuery = !query || text.indexOf(query) !== -1;
      const matchesYear = !year || card.getAttribute("data-year") === year;
      const matchesType = !type || card.getAttribute("data-type") === type;
      card.classList.toggle("hidden-card", !(matchesQuery && matchesYear && matchesType));
    });
  }

  if (cardSearch || yearFilter || typeFilter) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q && cardSearch) {
      cardSearch.value = q;
    }
    [cardSearch, yearFilter, typeFilter].forEach(function (control) {
      if (control) {
        control.addEventListener("input", applyFilters);
        control.addEventListener("change", applyFilters);
      }
    });
    applyFilters();
  }
})();
