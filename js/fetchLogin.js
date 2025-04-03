document.addEventListener('DOMContentLoaded', function() {
	const loginForm = document.querySelector("form");
	loginForm.addEventListener('submit', function(event) {
		event.preventDefault();
		const userData = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		};
		
		fetch('http://localhost:5000/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData)
		})
		.then(response => response.json())
		.then(data => {
			if (data.token) {
				sessionStorage.setItem('token', data.token);
				window.location.href = 'list.html';
			} else {
				const errorMessage = document.getElementById('error-message');
				errorMessage.textContent = data.message || 'La connexion a échoué. Veuillez recommencer.';
				errorMessage.classList.remove('d-none');
			}
		})
		.catch(error => {
			console.error('Error:', error);
			const errorMessage = document.getElementById('error-message');
			errorMessage.textContent = 'Une erreur a eu lieu. Veuillez recommencer.';
			errorMessage.classList.remove('d-none');
		});
	});
});