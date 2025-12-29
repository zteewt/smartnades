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
      },
      {
        id: 'mirage-smoke-wind-var3',
        from: { x: 86.89, y: 30.31 },
        travelTime: '10.2s',
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
  {
    id: 'inferno-he-1',
    map: 'inferno',
    side: 'ct',
    type: 'he',
    category: 'default',
    to:   { x: 42.78, y: 50.15 },
    label: 'H',
    title: 'Banan he from car',
    description: 'Взрывает деревяшки с кара на инферно',
    variations: [
      {
        id: 'inferno-he-1',
        from: { x: 50.56, y: 34.46 },
        travelTime: '2.2s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  },
  {
    id: 'inferno-molotov-1',
    map: 'inferno',
    side: 't',
    type: 'molotov',
    category: 'executes',
    to:   { x: 50.56, y: 34.46 },
    label: 'M',
    title: 'Molotov to car',
    description: 'Молик на кар',
    variations: [
      {
        id: 'inferno-molotov-1',
        from: { x: 45.33, y: 54.62 },
        travelTime: '1.7s',
        videoUrl: '/media/nades_videos/test.MOV',
      }
    ]
  }
  
];

let favoritesNades = [];

const FAV_KEY = 'smartnades_favorites_ids';

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    const ids = JSON.parse(raw);
    if (!Array.isArray(ids)) return [];
    return ids
      .map(id => {
        const direct = nades.find(n => n.id === id);
        if (direct) return direct;

        // если сохранён id вариации
        for (const n of nades) {
          const v = (n.variations || []).find(v => v.id === id);
          if (v) return { ...n, id: v.id, variations: [v] };
        }
        return null;
      })
      .filter(Boolean);

  } catch {
    return [];
  }
}

function saveFavorites() {
  const ids = favoritesNades.map(n => n.id);
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

// Инициализируем при старте
favoritesNades = loadFavorites();

window.currentMap       = 'mirage';
window.currentSide      = 't';
window.activeNadeTypes  = ['smoke'];
window.currentCategory  = 'default';

window.currentTab = 'nades';

function getFavoritesMeta() {
  const maps = new Set();
  const categories = new Set();
  const sides = new Set();
  const types = new Set();

  favoritesNades.forEach(n => {
    maps.add(n.map);
    categories.add(n.category);
    sides.add(n.side);
    types.add(n.type);
  });

  return {
    maps: Array.from(maps),
    categories: Array.from(categories),
    sides: Array.from(sides),
    types: Array.from(types),
  };
}

function groupFavoritesForRender(favs) {
  const grouped = new Map();

  for (const item of favs) {
    const normalized = asSingleVariationNade(item);

    // ключ группы = одна точка назначения + тип/сторона/категория/карта
    const key = [
      normalized.map,
      normalized.side,
      normalized.type,
      normalized.category,
      normalized.to?.x,
      normalized.to?.y,
    ].join('|');

    const existing = grouped.get(key);
    if (!existing) {
      grouped.set(key, {
        ...normalized,
        // важно: variations всегда массив
        variations: Array.isArray(normalized.variations) ? [...normalized.variations] : [],
      });
    } else {
      const toAdd = (normalized.variations || [])[0];
      if (toAdd && !existing.variations.some(v => v.id === toAdd.id)) {
        existing.variations.push(toAdd);
      }
    }
  }

  return Array.from(grouped.values());
}


function asSingleVariationNade(favItem) {
  // если в фаворитах уже лежит одиночная вариация — оставляем
  if (Array.isArray(favItem.variations) && favItem.variations.length === 1) {
    return favItem;
  }

  // если id фаворита совпадает с id вариации — вытащим только её
  for (const n of nades) {
    const v = (n.variations || []).find(v => v.id === favItem.id);
    if (v) {
      return { ...n, id: v.id, variations: [v] };
    }
  }

  // иначе это обычная граната (не вариация)
  return favItem;
}

function getSourceNades() {
  if (currentTab !== 'favorites') return nades;
  return groupFavoritesForRender(favoritesNades);
}


// простое красивое отображение лейблов
function prettifyLabel(value) {
  if (!value) return '';
  return value
    .replace(/-/g, ' ')
    .replace(/dust2/i, 'Dust II')
    .replace(/^./, ch => ch.toUpperCase());
}

// ================== ЛОГИКА ==================
document.addEventListener('DOMContentLoaded', () => {
  // Карты и слои для Nades и Favorites
  const nadesMapWrapper = document.getElementById('nades-layer')?.closest('.map-wrapper') || null;
  const favMapWrapper   = document.getElementById('fav-nades-layer')?.closest('.map-wrapper') || null;

  const nadesMapImage = document.getElementById('map-image');
  const favMapImage   = document.getElementById('fav-map-image');

  const nadesLayer    = document.getElementById('nades-layer');
  const favNadesLayer = document.getElementById('fav-nades-layer');

  window.currentTab = favNadesLayer ? 'favorites' : 'nades';

  const mapLabel   = document.querySelector('#map-toggle .map-label');
  const mapButtons = document.querySelectorAll('#map-dropdown .map-option');
  const btnT       = document.getElementById('btn-t');
  const btnCT      = document.getElementById('btn-ct');
  const nadeTypeBtns = document.querySelectorAll(
  '.page-content--nades .nade-buttons .nade-button'
  );
  const favNadeTypeBtns = document.querySelectorAll(
    '.page-content--favorites .nade-buttons .nade-button'
  );

  // Модалка
  const nadeModal         = document.getElementById('nade-modal');
  const nadeModalBackdrop = document.getElementById('nade-modal-backdrop');
  const nadeModalClose    = document.getElementById('nade-modal-close');
  const nadeVideo         = document.getElementById('nade-video');
  const nadeVideoSource   = document.getElementById('nade-video-source');
  const nadeTitleEl       = document.getElementById('nade-title');
  const nadeDescEl        = document.getElementById('nade-description');
  const nadeMetaEl        = document.getElementById('nade-meta');
  const nadeFavBtn        = document.getElementById('nade-fav-btn');
  let lastOpenedNadeId    = null;
  let lastOpenedVariationId = null;

  function getActiveMapWrapper() {
    return currentTab === 'favorites' ? favMapWrapper : nadesMapWrapper;
  }
  function getActiveMapImage() {
    return currentTab === 'favorites' ? favMapImage : nadesMapImage;
  }
  function getActiveLayer() {
    return currentTab === 'favorites' ? favNadesLayer : nadesLayer;
  }

  function clearNades() {
    const layer = getActiveLayer();
    if (!layer) return;
    layer
      .querySelectorAll('.nade-point, .nade-line, .nade-variations-on-map')
      .forEach(el => el.remove());
  }

  // Включить линию нужной вариации и выключить остальные
  function setActiveVariationLine(nadeId, variationIndex) {
    const layer = getActiveLayer();
    if (!layer) return;
    const svg = layer.querySelector(`.nade-line[data-id="${nadeId}"]`);
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
    let nade = nades.find(n => n.id === nadeId);
    let currentVar = null;
    if (!nade) {
      for (const n of nades) {
        const v = (n.variations || []).find(v => v.id === nadeId);
        if (v) {
          nade = n;
          currentVar = v;
          break;
        }
      }
    }

    if (!nade) return;

    lastOpenedNadeId = nade.id;

    // если вариация не была определена выше (обычный режим) — берём по индексу
    const variations = nade.variations || [];
    if (!currentVar) currentVar = variations[variationIndex] || variations[0];

    const favKey = currentVar?.id || nade.id;
    lastOpenedVariationId = favKey;

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
      { label: 'Категория',    value: prettifyLabel(nade.category) },
      { label: 'Тип',          value: prettifyLabel(nade.type) },
      { label: 'Сторона',      value: nade.side?.toUpperCase() },
      { label: 'Карта',        value: prettifyLabel(nade.map) },
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

    // состояние избранного
    const isFav = favoritesNades.some(n => n.id === favKey);
    if (nadeFavBtn) {
      nadeFavBtn.classList.toggle('nade-modal__fav-btn--active', isFav);
      nadeFavBtn.textContent = isFav
        ? 'Убрать из избранного'
        : 'Добавить в избранное';
    }

    nadeModal.classList.add('nade-modal--open');
  }

  function closeNadeModal() {
    nadeModal.classList.remove('nade-modal--open');
    if (nadeVideo && !nadeVideo.paused) {
      nadeVideo.pause();
    }
    document
      .querySelectorAll('.nade-line__segment.active')
      .forEach(line => line.classList.remove('active'));
  }

  if (nadeModalClose)    nadeModalClose.addEventListener('click', closeNadeModal);
  if (nadeModalBackdrop) nadeModalBackdrop.addEventListener('click', closeNadeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNadeModal();
  });

  // Кнопка избранного в модалке
  if (nadeFavBtn) {
    nadeFavBtn.addEventListener('click', () => {
      if (!lastOpenedVariationId) return;

      const existingIndex = favoritesNades.findIndex(n => n.id === lastOpenedVariationId);

      if (existingIndex !== -1) {
        favoritesNades.splice(existingIndex, 1);
      } else {
        // 1) пробуем найти как вариацию
        let src = null;
        for (const n of nades) {
          const v = (n.variations || []).find(v => v.id === lastOpenedVariationId);
          if (v) {
            // сохраняем как отдельную "гранату" (вариацию)
            src = {
              ...n,
              id: v.id,
              variations: [v],
            };
            break;
          }
        }
        // 2) если это не вариация — обычная граната
        if (!src) src = nades.find(n => n.id === lastOpenedVariationId);

        if (src) favoritesNades.push(src);
      }

      saveFavorites();

      const isFav = favoritesNades.some(n => n.id === lastOpenedVariationId);
      nadeFavBtn.classList.toggle('nade-modal__fav-btn--active', isFav);
      nadeFavBtn.textContent = isFav
        ? 'Убрать из избранного'
        : 'Добавить в избранное';

      if (typeof window.rebuildFavoritesFilters === 'function') {
        window.rebuildFavoritesFilters();
      }

      if (currentTab === 'favorites') {
        renderNadesForMap(currentMap);
      }
    });
  }

  function createNadeElements(nade) {
    const layer = getActiveLayer();
    const mapWrapper = getActiveMapWrapper();
    if (!layer || !mapWrapper) return;

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
          openNadeModal(v.id, 0);
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

    // кладём всё в активный слой
    layer.appendChild(pointBtn);
    if (variationsContainer) layer.appendChild(variationsContainer);
    layer.appendChild(svg);

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
        openNadeModal((variations[0]?.id || nade.id), 0);
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
    return getSourceNades().filter(n =>
      n.map === mapKey &&
      n.side === currentSide &&
      activeNadeTypes.includes(n.type) &&
      n.category === currentCategory
    );
  }
  window.getFilteredNades = getFilteredNades;

  let lastRenderedIds = [];

  function renderNadesForMap(mapKey) {
    const current = getFilteredNades(mapKey);
    const newIds = current.map(n => n.id).join('|');
    const layer = getActiveLayer();
    const mapImage = getActiveMapImage();
    if (!layer || !mapImage) return;

    if (newIds === lastRenderedIds.join('|')) {
      clearNades();
      current.forEach(createNadeElements);
      return;
    }

    lastRenderedIds = current.map(n => n.id);

    layer.classList.add('nades-layer--fading');

    setTimeout(() => {
      clearNades();
      current.forEach(createNadeElements);
      layer.classList.remove('nades-layer--fading');
    }, 200);
  }

  window.renderNadesForMap = renderNadesForMap;
  window.getSourceNades   = getSourceNades;
  window.favoritesNades   = favoritesNades;

  // Переключение карт (только кнопки Nades)
  mapButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentTab !== 'nades') return;

      const mapKey = btn.dataset.value;
      if (mapKey === currentMap) return;

      currentMap = mapKey;

      const mapImage = getActiveMapImage();
      const layer    = getActiveLayer();
      if (!mapImage || !layer) return;

      mapImage.classList.add('map-image--hidden');
      layer.classList.add('nades-layer--fading');

      const newSrc = `/media/minimaps/map_${mapKey}.svg`;

      setTimeout(() => {
        mapImage.src = newSrc;
        mapLabel.textContent = prettifyLabel(mapKey);
        mapImage.dataset.map = mapKey;

        mapButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        clearNades();
        const current = getFilteredNades(currentMap);
        current.forEach(createNadeElements);
      }, 125);

      setTimeout(() => {
        mapImage.classList.remove('map-image--hidden');
        layer.classList.remove('nades-layer--fading');
      }, 250);
    });
  });

  // Переключение стороны (Nades)
  if (btnT) {
    btnT.addEventListener('click', () => {
      currentSide = 't';
      btnT.classList.add('active');
      btnCT?.classList.remove('active');
      renderNadesForMap(currentMap);
    });
  }

  if (btnCT) {
    btnCT.addEventListener('click', () => {
      currentSide = 'ct';
      btnCT.classList.add('active');
      btnT?.classList.remove('active');
      renderNadesForMap(currentMap);
    });
  }

  // Типы гранат (Nades)
  nadeTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.nade;

      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        activeNadeTypes = activeNadeTypes.filter(t => t !== type);
      } else {
        if (activeNadeTypes.length >= 2) {
          const oldest = activeNadeTypes.shift();
          const oldestBtn = document.querySelector(
            `.page-content--nades .nade-buttons .nade-button[data-nade="${oldest}"]`
          );
          if (oldestBtn) oldestBtn.classList.remove('active');
        }
        activeNadeTypes.push(type);
        btn.classList.add('active');
      }

      renderNadesForMap(currentMap);
    });
  });

  // Favorites UI
  function setupFavoritesUI() {
    const favMapToggle     = document.getElementById('fav-map-toggle');
    const favMapLabel      = document.getElementById('fav-map-label');
    const favMapDropdown   = document.getElementById('fav-map-dropdown');
    const favCatToggle     = document.getElementById('fav-category-toggle');
    const favCatLabel      = document.getElementById('fav-category-label');
    const favCatDropdown   = document.getElementById('fav-category-dropdown');
    const favBtnT          = document.getElementById('fav-btn-t');
    const favBtnCT         = document.getElementById('fav-btn-ct');
    const favBtnSmoke      = document.getElementById('fav-btn-smoke');
    const favBtnFlash      = document.getElementById('fav-btn-flash');
    const favBtnMolotov    = document.getElementById('fav-btn-molotov');
    const favBtnHe         = document.getElementById('fav-btn-he');
    const emptyCard        = document.getElementById('favorites-empty-card');
    const favLayer         = favNadesLayer;

    if (!favMapToggle || !favMapDropdown || !favLayer) return;

    function applyDisabledState(btn, isEnabled) {
      if (!btn) return;
      btn.classList.toggle('is-disabled', !isEnabled);
    }

    if (favBtnT?.classList.contains('is-disabled') && currentSide === 't') currentSide = 'ct';
    if (favBtnCT?.classList.contains('is-disabled') && currentSide === 'ct') currentSide = 't';

    function rebuildFavoritesFilters() {
      const meta = getFavoritesMeta();
      const hasFavorites = favoritesNades.length > 0;

      const favFiltersPanel = document.querySelector('.filters-panel');

      if (!hasFavorites) {
        // только заглушка
        if (emptyCard) emptyCard.style.display = 'flex';
        if (favFiltersPanel) favFiltersPanel.style.display = 'none';
        favLayer.innerHTML = '';
        const favImg = document.getElementById('fav-map-image');
        if (favImg) favImg.style.display = 'none';
        return;
      }

      // есть избранные
      if (emptyCard) emptyCard.style.display = 'none';
      if (favFiltersPanel) favFiltersPanel.style.display = 'block';
      const favImg = document.getElementById('fav-map-image');
      if (favImg) favImg.style.display = 'block';

      // MAPS
      if (meta.maps.length === 1) {
        const only = meta.maps[0];
        favMapLabel.textContent = prettifyLabel(only);
        favMapToggle.classList.add('single-value');
        favMapToggle.disabled = true;
        favMapDropdown.innerHTML = '';
        currentMap = only;

        const favImg = document.getElementById('fav-map-image');
        if (favImg && favImg.dataset.map !== only) {
          favImg.src = `/media/minimaps/map_${only}.svg`;
          favImg.dataset.map = only;
        }        
      } else {
        favMapToggle.classList.remove('single-value');
        favMapToggle.disabled = false;
        favMapDropdown.innerHTML = '';
        meta.maps.forEach(m => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'map-option';
          b.dataset.value = m;
          b.textContent = prettifyLabel(m);
          b.addEventListener('click', () => {
            currentMap = m;
            favMapLabel.textContent = prettifyLabel(m);
            favMapDropdown.classList.remove('active');

            const favImg = document.getElementById('fav-map-image');
            if (favImg) {
              favImg.classList.add('map-image--hidden');
              const layer = document.getElementById('fav-nades-layer');
              if (layer) layer.classList.add('nades-layer--fading');

              const newSrc = `/media/minimaps/map_${m}.svg`;

              setTimeout(() => {
                favImg.src = newSrc;
                favImg.dataset.map = m;
                if (layer) {
                  layer.innerHTML = '';
                }
                renderNadesForMap(currentMap);
              }, 125);

              setTimeout(() => {
                favImg.classList.remove('map-image--hidden');
                if (layer) layer.classList.remove('nades-layer--fading');
              }, 250);
            } else {
              renderNadesForMap(currentMap);
            }
          });
          favMapDropdown.appendChild(b);
        });
        const safeMap = meta.maps.includes(currentMap)
          ? currentMap
          : meta.maps[0];
        currentMap = safeMap;
        favMapLabel.textContent = prettifyLabel(safeMap);

        const favImg = document.getElementById('fav-map-image');
        if (favImg && favImg.dataset.map !== safeMap) {
          favImg.src = `/media/minimaps/map_${safeMap}.svg`;
          favImg.dataset.map = safeMap;
        }
      }

      // CATEGORIES
      if (meta.categories.length === 1) {
        const only = meta.categories[0];
        favCatLabel.textContent = prettifyLabel(only);
        favCatToggle.classList.add('single-value');
        favCatToggle.disabled = true;
        favCatDropdown.innerHTML = '';
        currentCategory = only;
      } else {
        favCatToggle.classList.remove('single-value');
        favCatToggle.disabled = false;
        favCatDropdown.innerHTML = '';
        meta.categories.forEach(c => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'map-option';
          b.dataset.value = c;
          b.textContent = prettifyLabel(c);
          b.addEventListener('click', () => {
            currentCategory = c;
            favCatLabel.textContent = prettifyLabel(c);
            favCatDropdown.classList.remove('active');
            renderNadesForMap(currentMap);
          });
          favCatDropdown.appendChild(b);
        });
        const safeCat = meta.categories.includes(currentCategory)
          ? currentCategory
          : meta.categories[0];
        currentCategory = safeCat;
        favCatLabel.textContent = prettifyLabel(safeCat);
      }

      // SIDES
      const hasT  = meta.sides.includes('t');
      const hasCT = meta.sides.includes('ct');

      applyDisabledState(favBtnT,  hasT);
      applyDisabledState(favBtnCT, hasCT);

      // выставляем currentSide строго по доступности
      if (hasT && !hasCT) {
        currentSide = 't';
      } else if (hasCT && !hasT) {
        currentSide = 'ct';
      } else if (!hasT && !hasCT) {
        currentSide = 't'; // не важно, всё равно будет пусто/заглушка
      } else {
        // обе доступны — оставь текущую, но если она внезапно некорректна, то t
        if (currentSide !== 't' && currentSide !== 'ct') currentSide = 't';
      }

      const tDisabled  = favBtnT?.classList.contains('is-disabled');
      const ctDisabled = favBtnCT?.classList.contains('is-disabled');

      if (tDisabled)  favBtnT.classList.remove('active');
      if (ctDisabled) favBtnCT.classList.remove('active');

      favBtnT?.classList.toggle('active',  currentSide === 't'  && !tDisabled);
      favBtnCT?.classList.toggle('active', currentSide === 'ct' && !ctDisabled);
      // TYPES
      applyDisabledState(favBtnSmoke,   meta.types.includes('smoke'));
      applyDisabledState(favBtnFlash,   meta.types.includes('flash'));
      applyDisabledState(favBtnMolotov, meta.types.includes('molotov'));
      applyDisabledState(favBtnHe,      meta.types.includes('he'));

      activeNadeTypes = activeNadeTypes.filter(t => meta.types.includes(t));
      if (activeNadeTypes.length === 0 && meta.types.length > 0) {
        activeNadeTypes = [meta.types[0]];
      }

      lastRenderedIds = [];
      renderNadesForMap(currentMap);

      // --- подсветка active для типов гранат ---
      const typeButtons = [
        { btn: favBtnSmoke, type: 'smoke' },
        { btn: favBtnFlash, type: 'flash' },
        { btn: favBtnMolotov, type: 'molotov' },
        { btn: favBtnHe, type: 'he' },
      ];
      typeButtons.forEach(({btn, type}) => {
        if (!btn) return;
        btn.classList.toggle('active', activeNadeTypes.includes(type));
      });

    }

    // обработчики side/type для Favorites
  if (favBtnT) {
  favBtnT.addEventListener('click', () => {
    if (favBtnT.classList.contains('is-disabled')) return;
    currentSide = 't';
    rebuildFavoritesFilters();
  });
  }
  if (favBtnCT) {
    favBtnCT.addEventListener('click', () => {
      if (favBtnCT.classList.contains('is-disabled')) return;
      currentSide = 'ct';
      rebuildFavoritesFilters();
    });
  }

    [favBtnSmoke, favBtnFlash, favBtnMolotov, favBtnHe].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-disabled')) return;
        const type = btn.dataset.nade;

        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
          activeNadeTypes = activeNadeTypes.filter(t => t !== type);
        } else {
          if (activeNadeTypes.length >= 2) {
            const oldest = activeNadeTypes.shift();
            const oldestBtn = document.querySelector(
              `.page-content--favorites .nade-buttons .nade-button[data-nade="${oldest}"]`
            );
            if (oldestBtn) oldestBtn.classList.remove('active');
          }
          activeNadeTypes.push(type);
          btn.classList.add('active');
        }
        renderNadesForMap(currentMap);
      });
    });

    rebuildFavoritesFilters();
    window.rebuildFavoritesFilters = rebuildFavoritesFilters;
  }

  setupFavoritesUI();

  // начальный рендер
  renderNadesForMap(currentMap);

  // помощь для снятия координат (по активной карте)
  const activeWrapper = getActiveMapWrapper();
  if (activeWrapper) {
    activeWrapper.addEventListener('click', (e) => {
      const rect = activeWrapper.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      console.log(`clicked: x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
    });
  }
});
