// static/global/js/dropdown.js
document.addEventListener('DOMContentLoaded', function() {
    const mapToggle = document.getElementById('map-toggle');
    const mapDropdown = document.getElementById('map-dropdown');
    const mapSelect = document.getElementById('map-select');
    const mapOptions = document.querySelectorAll('.map-option');
    
    // Переключение выпадающего списка
    mapToggle.addEventListener('click', function() {
        mapDropdown.classList.toggle('active');
        mapToggle.classList.toggle('active');
    });
    
    // Выбор карты из списка
    mapOptions.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const text = this.textContent;
            
            // Обновляем текст на кнопке
            mapToggle.querySelector('span:first-child').textContent = text;
            
            // Обновляем скрытый select
            mapSelect.value = value;
            
            // Закрываем выпадающий список
            mapDropdown.classList.remove('active');
            mapToggle.classList.remove('active');
            
            // Помечаем выбранную опцию
            mapOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Триггерим событие изменения (для будущей фильтрации)
            mapSelect.dispatchEvent(new Event('change'));
        });
    });
    
    // Закрытие при клике вне области
    document.addEventListener('click', function(event) {
        if (!mapToggle.contains(event.target) && !mapDropdown.contains(event.target)) {
            mapDropdown.classList.remove('active');
            mapToggle.classList.remove('active');
        }
    });
    
    // Закрытие при нажатии Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            mapDropdown.classList.remove('active');
            mapToggle.classList.remove('active');
        }
    });
});