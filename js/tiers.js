const initTiers = [];

async function initializeTiers() {
    const urlParams = new URLSearchParams(window.location.search);
    const tierlistId = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:5000/api/tierlist/${tierlistId}`
		,{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
				'Content-Type' : 'application/json',
			}
		});	

		const tierlist = await response.json();

        if (response.ok) {
            initTiers.splice(0, initTiers.length, ...tierlist.tiers);
            renderTiers();
        } else {
            console.error('Erreur lors de la récupération des tiers.');
        }
    } catch (error) {
        console.error('Erreur réseau', error);
    }
}

function renderTiers() {
    document.getElementById('tiers-container').innerHTML = '';

    const tiers = document.getElementById('tiers-container');

    initTiers.forEach(tier => {
        const div = document.createElement('div');

        div.classList.add('tier');
        div.classList.add('droppable');
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

    document.querySelectorAll('.tier-title').forEach((title, index) => {
        title.addEventListener('click', () => showTitle(title, index));
    });

    renderDrag();
}

async function moveTier(index, direction) {
    const urlParams = new URLSearchParams(window.location.search);
    const tierlistId = urlParams.get('id');

    const tier = initTiers[index];
    if (direction === 'up' && index > 0) {
        [initTiers[index], initTiers[index - 1]] = [initTiers[index - 1], initTiers[index]];
    } else if (direction === 'down' && index < initTiers.length - 1) {
        [initTiers[index], initTiers[index + 1]] = [initTiers[index + 1], initTiers[index]];
    }

    try {
        await fetch(`http://localhost:5000/api/tierlist/${tierlistId}/reorder-tiers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initTiers)
        });
        renderTiers();
    } catch (error) {
        console.error('Erreur réseau', error);
    }
}

async function deleteTier(index) {
    const tierToDelete = initTiers[index];

    try {
        const response = await fetch(`http://localhost:5000/api/tier/${tierToDelete.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            initTiers.splice(index, 1);
            renderTiers();
        } else {
            alert("Erreur lors de la suppression du tier.");
        }
    } catch (error) {
        console.error('Erreur réseau', error);
    }
}

async function showTitle(element, index) {
    const newName = prompt('Enter new tier name:', initTiers[index].name);
    if (newName) {
        initTiers[index].name = newName;

        try {
            await fetch(`http://localhost:5000/api/tier/${initTiers[index].id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });
            renderTiers();
        } catch (error) {
            console.error('Erreur réseau', error);
        }
    }
}

function removeItem(id, nomTier) {
    initTiers.forEach(tier => {
        if (tier.name == nomTier) {
            tier.items = tier.items.filter(item => item.id != id);
        }
    });
}

function addItem(id, nomTier) {
    initTiers.forEach(tier => {
        if (tier.name == nomTier) {
            let itemElement = document.getElementById(id).querySelector('.item-text, img');
            let itemText = itemElement.tagName === 'IMG' ? itemElement.outerHTML : itemElement.innerHTML;
            tier.items.push({ id: id, text: itemText });
        }
    });
}

function creerTier() {
    let tierName = prompt("Nom du tier");
    let id = initTiers.length + 1;

    initTiers.push({ id: id, name: tierName, color: '#000000', items: [] });
    renderTiers();
}

document.addEventListener('DOMContentLoaded', initializeTiers);