document.addEventListener('DOMContentLoaded', () => {
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

  // Кнопка Map
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

  // Кнопка Categories
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

  // Пункты карты
  if (mapDropdown && mapLabelSpan) {
    mapDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.map-option');
      if (!option) return;
      e.stopPropagation();

      mapLabelSpan.textContent = option.textContent.trim();
      mapDropdown.classList.remove('active');
      mapToggle.classList.remove('active');
    });
  }

  // Пункты категорий
  if (categoryDropdown && categoryLabelSpan) {
    categoryDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.map-option');
      if (!option) return;
      e.stopPropagation();

      categoryLabelSpan.textContent = option.textContent.trim();
      categoryDropdown.classList.remove('active');
      categoryToggle.classList.remove('active');

      // ВАЖНО: обновляем глобальную переменную
      currentCategory = option.dataset.value;   // 'all', 'insta-smokes', ...
      renderNadesForMap(currentMap);
    });
  }

  // Клик вне — закрыть
  document.addEventListener('click', () => {
    mapDropdown?.classList.remove('active');
    mapToggle?.classList.remove('active');
    categoryDropdown?.classList.remove('active');
    categoryToggle?.classList.remove('active');
  });
});
