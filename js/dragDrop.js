function renderDrag() {
	document.querySelectorAll('.draggable').forEach(item => {
		if (item.dataset.hasEventListener) { return; }
		item.dataset.hasEventListener = 'true';
		item.addEventListener('dragstart', (event) => {
			event.dataTransfer.setData('text/plain', item.id);
		});
	});

	document.querySelectorAll('.droppable').forEach(div => {
		if (!div.hasEventListener) {
			div.addEventListener('dragover', (event) => {
				event.preventDefault();
				if (div.classList.contains('tier')) {
					div.classList.add('drag-over');
				}
			});

			div.addEventListener('dragleave', (event) => {
				if (div.classList.contains('tier')) {
					div.classList.remove('drag-over');
				}
			});

			div.addEventListener('drop', (event) => {
				event.preventDefault();
				
				const id = event.dataTransfer.getData('text/plain');
				let item = document.getElementById(id);

				document.querySelectorAll('.tier-content').forEach(tier => {
					const tier_nom = tier.parentElement.getElementsByClassName('tier-title')[0].innerHTML;
					if (tier_nom == "autres" && tier.contains(item)) {
						console.log(tier);
						removeItemAutre(item.getAttribute('id'));
					}
					else if (tier.contains(item)) {
						console.log(tier);
						removeItem(item.getAttribute('id'), tier_nom);
					}
				});

				const divDrag = document.querySelectorAll('.drag-over')[0];

				renderItems();
				renderTiers();
				div.hasEventListener = true;
			});
		}
	});
}