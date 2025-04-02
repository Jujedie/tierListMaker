// Attacher l'événement de soumission du formulaire
document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut

    // Récupérer les valeurs des champs du formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Créer l'objet de données à envoyer à l'API
    const loginData = {
        email,
        password
    };

    // Faire la requête POST vers l'API
    const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    const data = await response.json();

    // Si un token est renvoyé, le stocker dans sessionStorage
    if (data.token) {
        sessionStorage.setItem('token', data.token);
        window.location.href = 'list.html';
    } else {
        const errorMessage = data.error;

        // Afficher le message d'erreur
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = errorMessage;
        errorDiv.classList.remove('d-none');
    }
});
