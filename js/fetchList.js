document.addEventListener('DOMContentLoaded', function() {
	fetchLists();
});

function fetchLists() {
	const token = sessionStorage.getItem('token');
	if (token) {
		fetch('http://localhost:5000/api/tierlists', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		})
		.then(response => response.json())
		.then(data => {
			const listGroup = document.querySelector('.list-group');
			listGroup.innerHTML = '';

			if (Array.isArray(data) && Array.isArray(data).length >0) {
				data.forEach(tierList => {
					const listItem = document.createElement('a');
					listItem.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
					listItem.href = `index.html?id=${tierList.name}`;
					listItem.textContent = tierList.name;

					const icon = document.createElement('i');
					icon.className = 'fa fa-chevron-right';
					listItem.appendChild(icon);
					listGroup.appendChild(listItem);
				});
			} else {
				const listItem = document.createElement('a');
				listItem.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
				listItem.textContent = 'Pas de tier lists trouvés.';
				listItem.id = 'tierVide';
				listGroup.appendChild(listItem);
			}
		})
		.catch(error => {
			console.error('Error:', error);
		});
	} else {
		window.location.href = 'login.html';
	}
}

function fetchList(tierName) {
	const tiersInit = "[{name: 'Incontournable', color: '#FF8C42', items: [] },{name: 'Moyenne', color: '#EFBF3E', items: [] },{name: 'Passable', color: '#C2C236', items: [] },{name: 'Médiocre', color: '#6FBF73', items: [] },{name: 'Catastrophique', color: '#4E9A51', items: [] }]";
	const token = sessionStorage.getItem('token');
	if (token) {
		fetch('http://localhost:5000/api/tierlist/',{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name: tierName, tiers : tiersInit, items : []})
		})
		.then(response => response.json())
		.then(data => {
			sessionStorage.removeItem('token');
		})
		.catch(error => {
			console.error('Error:', error);
		});
	}
}