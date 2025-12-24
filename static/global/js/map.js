// ================== ДАННЫЕ ==================
const nades = [
  {
    id: 'mirage-smoke-1',
    map: 'mirage',
    side: 't',
    type: 'smoke',
    category: 'insta-smokes',
    to:   { x: 55, y: 40 },
    label: 'S',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    variations: [
      {
        id: 'mirage-smoke-1',
        from: { x: 35, y: 80 },
        travelTime: '3.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  },
  {
    id: 'mirage-flash-1',
    map: 'mirage',
    side: 'ct',
    type: 'flash',
    category: 'default',
    to:   { x: 65, y: 35 },
    label: 'F',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    variations: [
      {
        id: 'mirage-flash-1',
        from: { x: 35, y: 80 },
        travelTime: '3.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  },
  {
    id: 'mirage-flash-2',
    map: 'mirage',
    side: 't',
    type: 'flash',
    category: 'executes',
    to:   { x: 45, y: 65 },
    label: 'F',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    variations: [
      {
        id: 'mirage-flash-2',
        from: { x: 35, y: 80 },
        travelTime: '3.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  },
  {
    id: 'mirage-smoke-2',
    map: 'mirage',
    side: 't',
    type: 'smoke',
    category: 'insta-smokes',
    to:   { x: 52.89, y: 67.69 },
    label: 'S',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    variations: [
      {
        id: 'mirage-smoke-2',
        from: { x: 64.67, y: 69.69 },
        travelTime: '3.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  },
  {
    id: 'dust2-smoke-1',
    map: 'dust2',
    side: 't',
    type: 'smoke',
    category: 'insta-smokes',
    to:   { x: 55, y: 40 },
    label: 'S',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    variations: [
      {
        id: 'dust2-smoke-1',
        from: { x: 35, y: 80 },
        travelTime: '3.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  },
  {
    id: 'mirage-smoke-wind',
    map: 'mirage',
    side: 't',
    type: 'smoke',
    category: 'insta-smokes',
    to:   { x: 39.44, y: 43.39 },
    label: 'S',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    variations: [
      {
        id: 'mirage-smoke-wind-var1',
        from: { x: 86.56, y: 27.90 },
        travelTime: '16.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      },
      {
        id: 'mirage-smoke-wind-var2',
        from: { x: 69, y: 44.62 },
        travelTime: '3.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  },
  {
    id: 'mirage-smoke-4',
    map: 'mirage',
    side: 't',
    type: 'smoke',
    category: 'executes',
    to:   { x: 44.22, y: 86.92 },
    label: 'S',
    title: 'Window smoke from T spawn',
    description: 'Закрывает окно на миду, даёт выход на мид без AWP с окна.',
    variations: [
      {
        id: 'mirage-smoke-4',
        from: { x: 84.22, y: 49.54 },
        travelTime: '3.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  },
];

window.currentMap       = 'mirage';
window.currentSide      = 't';
window.activeNadeTypes  = ['smoke'];
window.currentCategory  = 'default';

// ================== ЛОГИКА ==================
document.addEventListener('DOMContentLoaded', () => {
  const mapWrapper   = document.querySelector('.map-wrapper');
  const mapImage   = document.getElementById('map-image');
  const mapLabel     = document.querySelector('#map-toggle .map-label');
  const mapButtons   = document.querySelectorAll('#map-dropdown .map-option');
  const btnT         = document.getElementById('btn-t');
  const btnCT        = document.getElementById('btn-ct');
  const nadeTypeBtns = document.querySelectorAll('.nade-button');
  const nadesLayer   = document.getElementById('nades-layer');

  // Модалка
  const nadeModal         = document.getElementById('nade-modal');
  const nadeModalBackdrop = document.getElementById('nade-modal-backdrop');
  const nadeModalClose    = document.getElementById('nade-modal-close');
  const nadeVideo         = document.getElementById('nade-video');
  const nadeVideoSource   = document.getElementById('nade-video-source');
  const nadeTitleEl       = document.getElementById('nade-title');
  const nadeDescEl        = document.getElementById('nade-description');
  const nadeMetaEl        = document.getElementById('nade-meta');

  function clearNades() {
    nadesLayer.querySelectorAll('.nade-point, .nade-line, .nade-variations-on-map')
      .forEach(el => el.remove());
  }

  // Включить линию нужной вариации и выключить остальные
  function setActiveVariationLine(nadeId, variationIndex) {
    const svg = nadesLayer.querySelector(`.nade-line[data-id="${nadeId}"]`);
    if (!svg) return;

    if (variationIndex === -1) {
      svg.querySelectorAll('.nade-line__segment')
        .forEach(line => line.classList.remove('active'));
      return;
    }

    svg.querySelectorAll('.nade-line__segment').forEach(line => {
      if (Number(line.dataset.variationIndex) === variationIndex) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });
  }

  function openNadeModal(nadeId, variationIndex = 0) {
    const nade = nades.find(n => n.id === nadeId);
    if (!nade) return;

    const variations = nade.variations || [];
    const currentVar = variations[variationIndex] || variations[0];

    nadeTitleEl.textContent = nade.title || 'Unnamed nade';
    nadeDescEl.textContent  = currentVar?.note || nade.description || '';

    const videoUrl = currentVar?.videoUrl || nade.videoUrl;
    if (videoUrl) {
      nadeVideoSource.src = videoUrl;
      nadeVideo.load();
    } else {
      nadeVideoSource.src = '';
      nadeVideo.load();
    }

    nadeMetaEl.innerHTML = '';
    const metaItems = [
      { label: 'Категория',    value: nade.category },
      { label: 'Тип',          value: nade.type },
      { label: 'Сторона',      value: nade.side?.toUpperCase() },
      { label: 'Карта',        value: nade.map },
      { label: 'Время полёта', value: currentVar?.travelTime || nade.travelTime },
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
    document.querySelectorAll('.nade-line__segment.active')
      .forEach(line => line.classList.remove('active'));
  }

  if (nadeModalClose)    nadeModalClose.addEventListener('click', closeNadeModal);
  if (nadeModalBackdrop) nadeModalBackdrop.addEventListener('click', closeNadeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNadeModal();
  });

  function createNadeElements(nade) {
    const variations = nade.variations || [];

    // Кнопка точки назначения
    const pointBtn = document.createElement('button');
    pointBtn.className = 'nade-point';
    pointBtn.dataset.id = nade.id;
    pointBtn.style.top  = `${nade.to.y}%`;
    pointBtn.style.left = `${nade.to.x}%`;

    const icon = document.createElement('span');
    icon.className = 'nade-icon';
    icon.textContent = nade.label;
    pointBtn.appendChild(icon);

    // Если вариаций несколько — бейдж с количеством
    if (variations.length > 1) {
      const badge = document.createElement('span');
      badge.className = 'nade-variations-count';
      badge.textContent = variations.length;
      pointBtn.appendChild(badge);
    }

    // Контейнер кнопок вариаций под точкой
    let variationsContainer = null;
    if (variations.length > 1) {
      variationsContainer = document.createElement('div');
      variationsContainer.className = 'nade-variations-on-map';

      variations.forEach((v, idx) => {
        const vBtn = document.createElement('button');
        vBtn.className = 'nade-variation-map-btn';
        vBtn.textContent = nade.label;

        vBtn.addEventListener('mouseenter', () => {
          setActiveVariationLine(nade.id, idx);
        });
        vBtn.addEventListener('mouseleave', () => {
          setActiveVariationLine(nade.id, -1);
        });

        vBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openNadeModal(nade.id, idx);
        });

        variationsContainer.appendChild(vBtn);
      });
    }

    // SVG с линиями всех вариаций
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('nade-line');
    svg.dataset.id = nade.id;

    const rect = mapWrapper.getBoundingClientRect();
    svg.setAttribute('width', rect.width);
    svg.setAttribute('height', rect.height);
    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);

    const toX = (nade.to.x / 100) * rect.width;
    const toY = (nade.to.y / 100) * rect.height;

    variations.forEach((variation, idx) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const fromX = (variation.from.x / 100) * rect.width;
      const fromY = (variation.from.y / 100) * rect.height;

      line.setAttribute('x1', fromX);
      line.setAttribute('y1', fromY);
      line.setAttribute('x2', toX);
      line.setAttribute('y2', toY);

      line.dataset.variationIndex = idx;
      line.classList.add('nade-line__segment');

      svg.appendChild(line);
    });

    // кладём всё в nadesLayer
    nadesLayer.appendChild(pointBtn);
    if (variationsContainer) nadesLayer.appendChild(variationsContainer);
    nadesLayer.appendChild(svg);

    // позиционируем контейнер вариаций под точкой
    if (variationsContainer) {
      const btnRect = pointBtn.getBoundingClientRect();
      const wrapperRect = mapWrapper.getBoundingClientRect();

      variationsContainer.style.top =
        `${((btnRect.bottom - wrapperRect.top) / wrapperRect.height) * 100 + 2}%`;
      variationsContainer.style.left = `${nade.to.x}%`;
      variationsContainer.style.transform = 'translateX(-50%)';
    }

    // hover по точке для одиночной вариации
    if (variations.length === 1) {
      pointBtn.addEventListener('mouseenter', () => {
        setActiveVariationLine(nade.id, 0);
      });
      pointBtn.addEventListener('mouseleave', () => {
        setActiveVariationLine(nade.id, -1);
      });
    }

    // клик по точке
    pointBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!variationsContainer) {
        openNadeModal(nade.id, 0);
        return;
      }

      const isOpen =
        variationsContainer.classList.contains('nade-variations-on-map--open');
      if (isOpen) {
        variationsContainer.classList.remove('nade-variations-on-map--open');
        pointBtn.classList.remove('nade-point--dimmed');
        setActiveVariationLine(nade.id, -1);
      } else {
        variationsContainer.classList.add('nade-variations-on-map--open');
        pointBtn.classList.add('nade-point--dimmed');
        setActiveVariationLine(nade.id, 0);
      }
    });
  }

  function getFilteredNades(mapKey) {
    return nades.filter(n =>
      n.map === mapKey &&
      n.side === currentSide &&
      activeNadeTypes.includes(n.type) &&
      n.category === currentCategory
    );
  }

  let lastRenderedIds = [];

  function renderNadesForMap(mapKey) {
    const current = getFilteredNades(mapKey);
    const newIds = current.map(n => n.id).join('|');

    // если набор id не изменился — без анимации
    if (newIds === lastRenderedIds.join('|')) {
      clearNades();
      current.forEach(createNadeElements);
      return;
    }

    lastRenderedIds = current.map(n => n.id);

    // fade-out только слоя гранат
    nadesLayer.classList.add('nades-layer--fading');

    setTimeout(() => {
      clearNades();
      current.forEach(createNadeElements);
      nadesLayer.classList.remove('nades-layer--fading');
    }, 200);
  }

  window.renderNadesForMap = renderNadesForMap;

  // Переключение карт
  mapButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mapKey = btn.dataset.value;
    if (mapKey === currentMap) return;

    currentMap = mapKey;

    // запускаем плавное исчезновение карты и гранат
    mapImage.classList.add('map-image--hidden');
    nadesLayer.classList.add('nades-layer--fading');

    const newSrc = `/media/minimaps/map_${mapKey}.svg`;

    // через половину анимации меняем src
    setTimeout(() => {
      mapImage.src = newSrc;
      mapLabel.textContent = btn.textContent;
      mapImage.dataset.map = mapKey;

      // обновляем selected у кнопок
      mapButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // пересчёт гранат под новую карту
      clearNades();
      const current = getFilteredNades(currentMap);
      current.forEach(createNadeElements);
    }, 125); // половина от 0.25s

    // в конце анимации показываем обратно
    setTimeout(() => {
      mapImage.classList.remove('map-image--hidden');
      nadesLayer.classList.remove('nades-layer--fading');
    }, 250); // полное время transition
  });
});

  // Переключение стороны
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

  // Типы гранат
  nadeTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.nade;

      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        activeNadeTypes = activeNadeTypes.filter(t => t !== type);
      } else {
        if (activeNadeTypes.length >= 2) {
          const oldest = activeNadeTypes.shift();
          const oldestBtn =
            document.querySelector(`.nade-button[data-nade="${oldest}"]`);
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

  // помощь для снятия координат
  mapWrapper.addEventListener('click', (e) => {
    const rect = mapWrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    console.log(`clicked: x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
  });
});
