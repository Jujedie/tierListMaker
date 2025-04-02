document.addEventListener('DOMContentLoaded', function () {
    const token = sessionStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    renderTiers();
    renderItems();

    document.getElementById('add-tier-btn').addEventListener('click', creerTier);
    document.getElementById('add-item-btn').addEventListener('click', creerItem);
});