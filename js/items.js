let otherItems = [

	{ id: 4, text: "Java" },

	{ id: 5, text: "Bash" },

	{ id: 6, text: "C" }

];

function createItemElement(item) {
	const span = document.createElement('span');
	span.classList.add('item-text');
	span.innerHTML = item.text;

	const div = document.createElement('div');
	div.classList.add('item');
	div.classList.add('draggable');
	div.id = "Item "+item.id;
	div.draggable = true;
	div.dataset.id = item.id;
	
	div.appendChild(span);

	return div;
}

function renderItems() {
	document.getElementById('items-list').innerHTML = '';

	const items = document.getElementById('items-list');

	const div = document.createElement('div');

	div.classList.add('tier');
	div.droppable = true;
	div.innerHTML = `
			<div class="row align-items-center tier-row" data-index="4">
				<div class="col-2 text-center p-2">
					<h3 class="tier-title">autres</h3>
				</div>
				<div class="col-10 tier-content d-flex flex-wrap gap-2 p-2"></div>
			</div>`;

	let ensItem = [];

	otherItems.forEach(item => {
		ensItem.push(createItemElement(item));
	});

	ensItem.forEach(item => {
		div.getElementsByClassName("tier-content")[0].appendChild(item);

		item.addEventListener('dragstart', (event) => {
			div.classList.add('dragging');
			event.dataTransfer.setData('text/plain', div.id);
		});
	});

	items.appendChild(div);

	renderDrag();
}

function addNewItem(){
	let itemText = prompt("");
	let id = otherItems.length + 1;

	otherItems.push({ id: id, text: itemText });
	renderItems();
}

function removeItemAutre(id){
	otherItems = otherItems.filter(item => item.id != id);
	renderItems();
}

function addItemAutre(item){
	otherItems.push(item);
	renderItems();
}