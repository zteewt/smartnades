document.addEventListener('DOMContentLoaded', () => {
    const mapToggle = document.getElementById('map-toggle');
    const mapDropdown = document.getElementById('map-dropdown');

    const categoryToggle = document.getElementById('category-toggle');
    const categoryDropdown = document.getElementById('category-dropdown');

    // универсальная функция для открытия/закрытия
    function toggleDropdown(button, dropdown) {
        const isOpen = dropdown.classList.toggle('active');
        button.classList.toggle('active', isOpen);
    }

    // клик по кнопке Map
    if (mapToggle && mapDropdown) {
        mapToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // чтобы клик не ушёл на document
            toggleDropdown(mapToggle, mapDropdown);
            // закрываем второй дропдаун
            categoryDropdown.classList.remove('active');
            categoryToggle.classList.remove('active');
        });
    }

    // клик по кнопке Categories
    if (categoryToggle && categoryDropdown) {
        categoryToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(categoryToggle, categoryDropdown);
            // закрываем Map
            mapDropdown.classList.remove('active');
            mapToggle.classList.remove('active');
        });
    }

    // клик по пункту карты — меняем текст на кнопке
    mapDropdown?.addEventListener('click', (e) => {
        const option = e.target.closest('.map-option');
        if (!option) return;
        e.stopPropagation();

        const value = option.textContent.trim();
        mapToggle.querySelector('span').textContent = value;

        mapDropdown.classList.remove('active');
        mapToggle.classList.remove('active');
    });

    categoryDropdown?.addEventListener('click', (e) => {
    const option = e.target.closest('.map-option');
    if (!option) return;
    e.stopPropagation();

    const value = option.textContent.trim();
    categoryToggle.querySelector('span').textContent = value;

    categoryDropdown.classList.remove('active');
    categoryToggle.classList.remove('active');
});

    // клик по документу вне дропдаунов — закрыть всё
    document.addEventListener('click', () => {
        mapDropdown?.classList.remove('active');
        mapToggle?.classList.remove('active');
        categoryDropdown?.classList.remove('active');
        categoryToggle?.classList.remove('active');
    });
});