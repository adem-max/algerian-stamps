const ADMIN_USERNAME = 'lahcen2025'; // Replace or use environment variables
const ADMIN_PASSWORD = 'lahcen'; // In production, don't hardcode this

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem('authenticated', 'true');
    window.location.href = 'admin.html'; // Create this page
  } else {
    alert('Invalid credentials');
  }
}
