document.addEventListener('DOMContentLoaded', () => {
  // ===== Nades =====
  const mapToggle        = document.getElementById('map-toggle');
  const mapDropdown      = document.getElementById('map-dropdown');
  const mapLabelSpan     = mapToggle?.querySelector('.map-label');

  const categoryToggle    = document.getElementById('category-toggle');
  const categoryDropdown  = document.getElementById('category-dropdown');
  const categoryLabelSpan = categoryToggle?.querySelector('.category-label')
                           || categoryToggle?.querySelector('span');

  function toggleDropdown(button, dropdown) {
    const isOpen = dropdown.classList.toggle('active');
    button.classList.toggle('active', isOpen);
  }

  // Кнопка Map (Nades)
  if (mapToggle && mapDropdown) {
    mapToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(mapToggle, mapDropdown);
      if (categoryDropdown && categoryToggle) {
        categoryDropdown.classList.remove('active');
        categoryToggle.classList.remove('active');
      }
    });
  }

  // Кнопка Categories (Nades)
  if (categoryToggle && categoryDropdown) {
    categoryToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(categoryToggle, categoryDropdown);
      if (mapDropdown && mapToggle) {
        mapDropdown.classList.remove('active');
        mapToggle.classList.remove('active');
      }
    });
  }

  // Пункты карты (Nades)
  if (mapDropdown && mapLabelSpan) {
    mapDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.map-option');
      if (!option) return;
      e.stopPropagation();

      mapLabelSpan.textContent = option.textContent.trim();
      mapDropdown.classList.remove('active');
      mapToggle.classList.remove('active');
      // логика смены карты в map.js уже обрабатывает клик по .map-option
    });
  }

  // Пункты категорий (Nades)
  if (categoryDropdown && categoryLabelSpan) {
    categoryDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.map-option');
      if (!option) return;
      e.stopPropagation();

      categoryLabelSpan.textContent = option.textContent.trim();
      categoryDropdown.classList.remove('active');
      categoryToggle.classList.remove('active');

      window.currentCategory = option.dataset.value;
      if (typeof window.renderNadesForMap === 'function') {
        window.renderNadesForMap(window.currentMap);
      }
    });
  }

  // ===== Favorites =====
  const favMapToggle   = document.getElementById('fav-map-toggle');
  const favMapDropdown = document.getElementById('fav-map-dropdown');
  const favCatToggle   = document.getElementById('fav-category-toggle');
  const favCatDropdown = document.getElementById('fav-category-dropdown');
  const favMapLabel    = favMapToggle?.querySelector('.map-label');
  const favCatLabel    = favCatToggle?.querySelector('.category-label')
                       || favCatToggle?.querySelector('span');

  // Кнопка Map (Favorites)
  if (favMapToggle && favMapDropdown) {
    favMapToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(favMapToggle, favMapDropdown);
      if (favCatDropdown && favCatToggle) {
        favCatDropdown.classList.remove('active');
        favCatToggle.classList.remove('active');
      }
    });
  }

  // Кнопка Categories (Favorites)
  if (favCatToggle && favCatDropdown) {
    favCatToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(favCatToggle, favCatDropdown);
      if (favMapDropdown && favMapToggle) {
        favMapDropdown.classList.remove('active');
        favMapToggle.classList.remove('active');
      }
    });
  }

  // Пункты карты (Favorites)
  if (favMapDropdown && favMapLabel) {
    favMapDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.map-option');
      if (!option) return;
      e.stopPropagation();

      favMapLabel.textContent = option.textContent.trim();
      favMapDropdown.classList.remove('active');
      favMapToggle.classList.remove('active');
      // смена currentMap и перерисовка обрабатываются в map.js
    });
  }

  // Пункты категорий (Favorites)
  if (favCatDropdown && favCatLabel) {
    favCatDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.map-option');
      if (!option) return;
      e.stopPropagation();

      favCatLabel.textContent = option.textContent.trim();
      favCatDropdown.classList.remove('active');
      favCatToggle.classList.remove('active');
      // внутри map.js в rebuildFavoritesFilters на .map-option уже висит смена currentCategory
    });
  }

  // Клик вне — закрыть всё
  document.addEventListener('click', () => {
    mapDropdown?.classList.remove('active');
    mapToggle?.classList.remove('active');
    categoryDropdown?.classList.remove('active');
    categoryToggle?.classList.remove('active');

    favMapDropdown?.classList.remove('active');
    favMapToggle?.classList.remove('active');
    favCatDropdown?.classList.remove('active');
    favCatToggle?.classList.remove('active');
  });
});
