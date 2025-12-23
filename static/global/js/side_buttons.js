document.addEventListener('DOMContentLoaded', () => {
    // --- T / CT buttons: только одна активна ---
    const btnT  = document.getElementById('btn-t');
    const btnCT = document.getElementById('btn-ct');

    function setSide(activeButton) {
        [btnT, btnCT].forEach(btn => {
            if (!btn) return;
            btn.classList.toggle('active', btn === activeButton);
        });
    }

    if (btnT && btnCT) {
        // дефолт: T активен
        setSide(btnT);

        btnT.addEventListener('click', () => {
            setSide(btnT);
        });

        btnCT.addEventListener('click', () => {
            setSide(btnCT);
        });
    }
});