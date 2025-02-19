

item.addEventListener('dragstart', (event) => {
	div.classList.add('dragging');
	event.dataTransfer.setData('text/plain', div.id);
});

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