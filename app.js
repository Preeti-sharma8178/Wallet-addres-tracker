document.getElementById('login').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.success) {
        alert('Login successful');
    } else {
        alert('Login failed: ' + data.message);
    }
});

document.getElementById('signup').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();
    if (data.success) {
        alert('Signup successful');
    } else {
        alert('Signup failed: ' + data.message);
    }
});
