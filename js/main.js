

document.addEventListener('DOMContentLoaded', function() {
	renderTiers();
	renderItems();

	// Add event listener to the tier buttons
	document.getElementById('add-tier-btn').addEventListener('click', creerTier);

	// Add event listener to the item buttons
	document.getElementById('add-item-btn').addEventListener('click', creerItem);
});