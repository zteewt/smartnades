document.addEventListener('DOMContentLoaded', () => {
    const points = document.querySelectorAll('.nade-point');

    points.forEach(point => {
        const id = point.dataset.id;
        const line = document.querySelector(`.nade-line[data-id="${id}"]`);
        if (!line) return;

        point.addEventListener('mouseenter', () => {
            line.classList.add('visible');
        });

        point.addEventListener('mouseleave', () => {
            line.classList.remove('visible');
        });
    });
});