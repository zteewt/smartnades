document.addEventListener('DOMContentLoaded', () => {
    // --- Nade buttons: максимум 2 активные ---
const nadeButtons = Array.from(document.querySelectorAll('.nade-button'));

// очередь сразу содержит уже активные (например, S по умолчанию)
const activeQueue = nadeButtons.filter(btn => btn.classList.contains('active'));

function activateNade(btn) {
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        const idx = activeQueue.indexOf(btn);
        if (idx !== -1) activeQueue.splice(idx, 1);
        return;
    }

    if (activeQueue.length < 2) {
        btn.classList.add('active');
        activeQueue.push(btn);
        return;
    }

    const oldest = activeQueue.shift();
    oldest.classList.remove('active');

    btn.classList.add('active');
    activeQueue.push(btn);
}

nadeButtons.forEach(btn => {
    btn.addEventListener('click', () => activateNade(btn));
});
});