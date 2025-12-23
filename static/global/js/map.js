const nades = [
  {
    id: 'mirage-smoke-1',
    map: 'mirage',
    side: 't',
    type: 'smoke',
    category: 'insta-smokes',
    from: { x: 35, y: 80 },
    to:   { x: 55, y: 40 },
    label: 'S',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    travelTime: '3.2s',
    videoUrl: '/media/nades_videos/test.MOV'
  },
  {
    id: 'mirage-flash-1',
    map: 'mirage',
    side: 'ct',
    type: 'flash',
    category: 'default',
    from: { x: 35, y: 80 },
    to:   { x: 65, y: 35 },
    label: 'F',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    travelTime: '3.2s',
    videoUrl: '/media/nades_videos/test.MOV'
  },
  {
    id: 'mirage-flash-2',
    map: 'mirage',
    side: 't',
    type: 'flash',
    category: 'executes',
    from: { x: 35, y: 80 },
    to:   { x: 45, y: 65 },
    label: 'F',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    travelTime: '3.2s',
    videoUrl: '/media/nades_videos/test.MOV'
  },
];

window.currentMap = 'mirage';
window.currentSide = 't';
window.activeNadeTypes = ['smoke'];
window.currentCategory = 'all';


document.addEventListener('DOMContentLoaded', () => {
    const mapWrapper   = document.querySelector('.map-wrapper');
    const mapImage     = document.getElementById('map-image');
    const mapLabel     = document.querySelector('#map-toggle .map-label');
    const mapButtons   = document.querySelectorAll('#map-dropdown .map-option');
    const btnT         = document.getElementById('btn-t');
    const btnCT        = document.getElementById('btn-ct');
    const nadeTypeBtns = document.querySelectorAll('.nade-button');

    // Элементы модального окна
    const nadeModal          = document.getElementById('nade-modal');
    const nadeModalBackdrop  = document.getElementById('nade-modal-backdrop');
    const nadeModalClose     = document.getElementById('nade-modal-close');
    const nadeVideo          = document.getElementById('nade-video');
    const nadeVideoSource    = document.getElementById('nade-video-source');
    const nadeTitleEl        = document.getElementById('nade-title');
    const nadeDescEl         = document.getElementById('nade-description');
    const nadeMetaEl         = document.getElementById('nade-meta');

    function clearNades() {
        mapWrapper.querySelectorAll('.nade-point, .nade-line').forEach(el => el.remove());
    }

    function openNadeModal(nadeId) {
        const nade = nades.find(n => n.id === nadeId);
        if (!nade) return;

        // Заголовок и описание
        nadeTitleEl.textContent = nade.title || 'Unnamed nade';
        nadeDescEl.textContent  = nade.description || '';

        // Видео
        if (nade.videoUrl) {
            nadeVideoSource.src = nade.videoUrl;
            nadeVideo.load();
        } else {
            nadeVideoSource.src = '';
            nadeVideo.load();
        }

        // Мета-инфо
        nadeMetaEl.innerHTML = '';
        const metaItems = [
            { label: 'Категория',   value: nade.category },
            { label: 'Тип',         value: nade.type },
            { label: 'Сторона',     value: nade.side?.toUpperCase() },
            { label: 'Карта',       value: nade.map },
            { label: 'Время полёта',value: nade.travelTime },
        ].filter(item => item.value);

        metaItems.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `
              <span class="nade-meta__item-label">${item.label}:</span>
              <span class="nade-meta__item-value">${item.value}</span>
            `;
            nadeMetaEl.appendChild(div);
        });

        nadeModal.classList.add('nade-modal--open');
    }

    function closeNadeModal() {
        nadeModal.classList.remove('nade-modal--open');
        if (nadeVideo && !nadeVideo.paused) {
            nadeVideo.pause();
        }
    }

    if (nadeModalClose) {
        nadeModalClose.addEventListener('click', closeNadeModal);
    }
    if (nadeModalBackdrop) {
        nadeModalBackdrop.addEventListener('click', closeNadeModal);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNadeModal();
    });

    function createNadeElements(nade) {
        const btn = document.createElement('button');
        btn.className = 'nade-point';
        btn.dataset.id = nade.id;
        btn.style.top = `${nade.to.y}%`;
        btn.style.left = `${nade.to.x}%`;

        const span = document.createElement('span');
        span.className = 'nade-icon';
        span.textContent = nade.label;
        btn.appendChild(span);

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('nade-line');
        svg.dataset.id = nade.id;
        svg.setAttribute('viewBox', '0 0 100 100');

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', nade.from.x);
        line.setAttribute('y1', nade.from.y);
        line.setAttribute('x2', nade.to.x);
        line.setAttribute('y2', nade.to.y);
        svg.appendChild(line);

        mapWrapper.appendChild(btn);
        mapWrapper.appendChild(svg);

        btn.addEventListener('mouseenter', () => svg.classList.add('visible'));
        btn.addEventListener('mouseleave', () => svg.classList.remove('visible'));

        // Клик по точке — открываем модалку
        btn.addEventListener('click', () => {
            openNadeModal(nade.id);
        });
    }

    function renderNadesForMap(mapKey) {
        clearNades();

        const current = nades.filter(n =>
            n.map === mapKey &&
            n.side === currentSide &&
            activeNadeTypes.includes(n.type) &&
            (currentCategory === 'all' || n.category === currentCategory)
        );

        current.forEach(createNadeElements);
    }
    window.renderNadesForMap = renderNadesForMap;

    // Переключение карт
    mapButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mapKey = btn.dataset.value;
            currentMap = mapKey;

            mapImage.src = `/media/minimaps/map_${mapKey}.svg`;
            mapLabel.textContent = btn.textContent;
            mapImage.dataset.map = mapKey;

            mapButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            renderNadesForMap(currentMap);
        });
    });

    // Переключение стороны (T / CT)
    btnT.addEventListener('click', () => {
        currentSide = 't';
        btnT.classList.add('active');
        btnCT.classList.remove('active');
        renderNadesForMap(currentMap);
    });

    btnCT.addEventListener('click', () => {
        currentSide = 'ct';
        btnCT.classList.add('active');
        btnT.classList.remove('active');
        renderNadesForMap(currentMap);
    });

    // Выбор типов гранат (максимум 2, можно все отжать)
    nadeTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.nade;

            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                activeNadeTypes = activeNadeTypes.filter(t => t !== type);
            } else {
                if (activeNadeTypes.length >= 2) {
                    const oldest = activeNadeTypes.shift();
                    const oldestBtn = document.querySelector(`.nade-button[data-nade="${oldest}"]`);
                    if (oldestBtn) oldestBtn.classList.remove('active');
                }
                activeNadeTypes.push(type);
                btn.classList.add('active');
            }

            renderNadesForMap(currentMap);
        });
    });

    // начальный рендер
    renderNadesForMap(currentMap);
});
