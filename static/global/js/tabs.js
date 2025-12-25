document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item[data-tab]');
  const tabSections = document.querySelectorAll('.tab-content');

  function activateTab(tab) {
    navItems.forEach(i => {
      i.classList.toggle('nav-item--active', i.dataset.tab === tab);
    });
    tabSections.forEach(sec => {
      sec.classList.toggle(
        'tab-content--active',
        sec.dataset.tabContent === tab
      );
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(item.dataset.tab);
    });
  });

  document
    .querySelector('.placeholder-card__button[data-tab-target="nades"]')
    ?.addEventListener('click', () => activateTab('nades'));
});