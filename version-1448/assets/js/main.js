(function() {
  var header = document.querySelector('.site-header');
  var menuButton = document.querySelector('.menu-toggle');

  if (menuButton && header) {
    menuButton.addEventListener('click', function() {
      header.classList.toggle('open');
    });
  }

  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-dot'));
  var heroIndex = 0;
  var heroTimer = null;

  function showHero(index) {
    if (!slides.length) {
      return;
    }

    heroIndex = (index + slides.length) % slides.length;

    slides.forEach(function(slide, position) {
      slide.classList.toggle('active', position === heroIndex);
    });

    dots.forEach(function(dot, position) {
      dot.classList.toggle('active', position === heroIndex);
    });
  }

  function startHero() {
    if (slides.length < 2) {
      return;
    }

    heroTimer = setInterval(function() {
      showHero(heroIndex + 1);
    }, 5200);
  }

  dots.forEach(function(dot, position) {
    dot.addEventListener('click', function() {
      showHero(position);
      if (heroTimer) {
        clearInterval(heroTimer);
        startHero();
      }
    });
  });

  startHero();

  var searchInput = document.querySelector('.js-search');
  var yearSelect = document.querySelector('.js-year-filter');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.movie-card'));

  function filterCards() {
    var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var year = yearSelect ? yearSelect.value : '';

    cards.forEach(function(card) {
      var text = card.getAttribute('data-search') || '';
      var cardYear = card.getAttribute('data-year') || '';
      var matchKeyword = !keyword || text.indexOf(keyword) !== -1;
      var matchYear = !year || cardYear === year;
      card.classList.toggle('is-hidden', !(matchKeyword && matchYear));
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  if (yearSelect) {
    yearSelect.addEventListener('change', filterCards);
  }
})();
