document.addEventListener('DOMContentLoaded', () => {
  const scrollBlocks = document.querySelectorAll('.info-scroll');

  scrollBlocks.forEach(block => {
    const pages = block.querySelectorAll('.info-page');
    const dots  = block.querySelectorAll('.info-dot');
    const prev  = block.querySelector('.info-arrow-left');
    const next  = block.querySelector('.info-arrow-right');

    if (!pages.length) return;

    let currentIndex = 0;

    function setActive(index) {
      pages.forEach((p, i) => {
        p.classList.toggle('active', i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    if (prev) {
      prev.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIndex = (currentIndex - 1 + pages.length) % pages.length;
        setActive(nextIndex);
      });
    }

    if (next) {
      next.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % pages.length;
        setActive(nextIndex);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        setActive(i);
      });
    });

    // стартовое состояние
    setActive(0);
  });
});