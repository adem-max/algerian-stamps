// Login functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const loginButton = document.getElementById('loginButton');
  const loginModal = document.getElementById('loginModal');
  const closeButton = document.querySelector('.close');
  const loginForm = document.getElementById('loginForm');
  
  // Show modal when login button clicked
  loginButton.addEventListener('click', function() {
    loginModal.style.display = 'block';
  });
  
  // Close modal when X is clicked
  closeButton.addEventListener('click', function() {
    loginModal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });
  
  // Handle form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple hardcoded credentials (not secure for production)
    if (username === 'lahcen' && password === 'lahcenbelfarah') {
      localStorage.setItem('isAuthenticated', 'true');
      loginModal.style.display = 'none';
      alert('Login successful!');
      
      // Redirect to admin page or show admin controls
      window.location.href = 'admin.html'; // You'll need to create this
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });
  
  // Check if already logged in
  if (localStorage.getItem('isAuthenticated') {
    // You might want to change the login button to logout
    loginButton.textContent = 'Admin Panel';
    loginButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'admin.html';
    });
  }
});
