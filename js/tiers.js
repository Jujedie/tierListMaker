const initTiers = [

	{ id: 1, name: 'Incontournable', color: '#FF8C42', items: [{ id: 1, text: "PHP" }, { id: 4, text: "SQL" }] },

	{ id: 2, name: 'Moyenne', color: '#EFBF3E', items: [{ id: 2, text: "Javascript" }] },

	{ id: 3, name: 'Passable', color: '#C2C236', items: [] },

	{ id: 4, name: 'Médiocre', color: '#6FBF73', items: [] },

	{ id: 5, name: 'Catastrophique', color: '#4E9A51', items: [{ id: 3, text: "CSS" }] }

];

function renderTiers() {

	document.getElementById('tiers-container').innerHTML = '';

	const tiers = document.getElementById('tiers-container');

	initTiers.forEach(tier => {
		const div = document.createElement('div');

		div.classList.add('tier');
		div.classList.add('droppable');
		div.droppable = true;
		div.innerHTML = `
			<div class="row align-items-center tier-row" data-index="4">
				<div class="col-2 text-center p-2" style="background-color:`+ tier.color.toUpperCase() + `;">
					<h3 class="tier-title">`+ tier.name + `</h3>
				</div>
				<div class="col-7 tier-content d-flex flex-wrap gap-2 p-2"></div>
				<div class="col-3 actions text-center">
					<button class="btn move-up"><i class="fa fa-angle-up" aria-hidden="true"></i></button>
					<button class="btn move-down"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
					<button class="btn delete-tier"><i class="fa fa-trash" aria-hidden="true"></i></button>
				</div>
			</div>`;

		let ensItem = [];

		tier.items.forEach(item => {
			ensItem.push(createItemElement(item));
		});

		ensItem.forEach(item => {
			div.getElementsByClassName("tier-content")[0].appendChild(item);
		});

		tiers.appendChild(div);
	});

	document.querySelectorAll('.move-up').forEach((button, index) => {
		button.addEventListener('click', () => moveTier(index, 'up'));
	});

	document.querySelectorAll('.move-down').forEach((button, index) => {
		button.addEventListener('click', () => moveTier(index, 'down'));
	});

	document.querySelectorAll('.delete-tier').forEach((button, index) => {
		button.addEventListener('click', () => deleteTier(index));
	});
}


function moveTier(index, direction) {
	const tier = initTiers[index];
	if (direction === 'up' && index > 0) {
		[initTiers[index], initTiers[index - 1]] = [initTiers[index - 1], initTiers[index]];
	} else if (direction === 'down' && index < initTiers.length - 1) {
		[initTiers[index], initTiers[index + 1]] = [initTiers[index + 1], initTiers[index]];
	}
	renderTiers();
}

function deleteTier(index) {
	initTiers.splice(index, 1);
	renderTiers();
}

function editTitle(index, element) {
	initTiers[index].name = element.value;
	renderTiers();
}

function showTitle(element) {
	const h3 = document.createElement('h3');
	h3.classList.add('tier-title');
	h3.innerHTML = element.value;

	element.parentElement.replaceChild(h3, element);
}