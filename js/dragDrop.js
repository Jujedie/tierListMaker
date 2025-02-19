document.querySelectorAll('.draggable').forEach(item => {
	item.addEventListener('dragstart', (event) => {
		event.dataTransfer.setData('text/plain', item.id);
	});
});

document.querySelectorAll('.droppable').forEach(div => {
	div.addEventListener('dragover', (event) => {
		if (div.classList.contains('tier-row')) {
			event.target.classList.add('dragover');
		}
	});

	div.addEventListener('dragleave', (event) => {
		if (div.classList.contains('tier-row')) {
			event.target.classList.remove('dragover');
		}
	});
});