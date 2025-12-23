document.addEventListener('DOMContentLoaded', () => {
    // --- Info slider (стрелки и точки) ---
    const pages = Array.from(document.querySelectorAll('.info-page'));
    const dots  = Array.from(document.querySelectorAll('.info-dot'));
    const prev  = document.getElementById('info-prev');
    const next  = document.getElementById('info-next');

    if (!pages.length || !dots.length) return;

    let current = 1;

    function showPage(page) {
        // нормализуем номер (циклический переход)
        const total = pages.length;
        if (page < 1) page = total;
        if (page > total) page = 1;
        current = page;

        pages.forEach(p => {
            const n = Number(p.dataset.page);
            p.classList.toggle('active', n === current);
            if (n === current) p.scrollTop = 0;
        });

        dots.forEach(d => {
            const n = Number(d.dataset.page);
            d.classList.toggle('active', n === current);
        });
    }

    // старт: первая страница
    showPage(1);

    prev?.addEventListener('click', () => showPage(current - 1));
    next?.addEventListener('click', () => showPage(current + 1));

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const page = Number(dot.dataset.page);
            if (!page) return;
            showPage(page);
        });
    });
});
