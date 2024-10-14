// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Registration function
    document.getElementById('register-button')?.addEventListener('click', () => {
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:2000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname, email, username, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                window.location.href = 'index.html'; // Redirect to login page
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Login function
    document.getElementById('login-button')?.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:2000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('token', data.token);
                window.location.href = 'hello.html'; // Redirect to restricted page
            } else {
                document.getElementById('error-message').style.display = 'block';
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Logout function
    document.getElementById('logout-button')?.addEventListener('click', () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        window.location.href = 'index.html'; // Redirect to the login page
    });

    // Check if the user is logged in when accessing hello.html
    if (window.location.pathname.endsWith('hello.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first!');
            window.location.href = 'index.html'; // Redirect to login page
        }
    }
});
