let otherItems = [

	{ id: 7, text: "Java" },

	{ id: 5, text: "Bash" },

	{ id: 6, text: "C" }

];

function createItemElement(item) {
	let element;
	if (item.text.startsWith('<img')) {
		element = document.createElement('div');
		element.innerHTML = item.text;
		element = element.firstChild;
	} else {
		element = document.createElement('span');
		element.classList.add('item-text');
		element.innerHTML = item.text;
	}

	const div = document.createElement('div');

	div.classList.add('item');
	div.classList.add('draggable');
	
	div.id = "Item "+item.id;
	div.draggable = true;
	
	div.setAttribute('id', item.id);
	
	div.appendChild(element);

	return div;
}

function renderItems() {
	document.getElementById('items-list').innerHTML = '';

	const items = document.getElementById('items-list');

	const div = document.createElement('div');

	div.classList.add('tier');
	div.classList.add('droppable');
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

	console.log(otherItems);

	items.appendChild(div);

	renderDrag();
}

function removeItemAutre(id){
	otherItems = otherItems.filter(item => item.id != id);
}

function addItemAutre(id){
	let itemElement = document.getElementById(id).querySelector('.item-text, img');
	let itemText = itemElement.tagName === 'IMG' ? itemElement.outerHTML : itemElement.innerHTML;
	otherItems.push({ id: id, text: itemText });
}

function getMaxId(){
	let maxId = 0;
	initTiers.forEach(tier => {
		tier.items.forEach(item => {
			if (item.id > maxId) {
				maxId = item.id;
			}
		});
	});
	otherItems.forEach(item => {
			if (item.id > maxId) {
				maxId = item.id;
			}
		});
		return maxId;
	}

function creerItem(){
	let itemText = prompt("Nom de l'item :");
	let id = getMaxId()+1;
	let itemType = prompt("Type de l'item (text/image) :");

	if (itemType === 'image') {
		let imageUrl = prompt("URL de l'image :");
		otherItems.push({ id: id, text: `<img src="${imageUrl}" alt="${itemText}">` });
	} else {
		otherItems.push({ id: id, text: itemText });
	}
	renderItems();
}