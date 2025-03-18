

document.addEventListener('DOMContentLoaded', function() {
	renderTiers();
	renderItems();

	document.getElementById('add-tier-btn').addEventListener('click', creerTier);
	document.getElementById('add-item-btn').addEventListener('click', creerItem);
});