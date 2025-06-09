document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    
    if (loginBtn && loginModal) {
        const closeModal = loginModal.querySelector('.close');
        const loginForm = document.getElementById('loginForm');

        // Open modal
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
        });

        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                loginModal.style.display = 'none';
            });
        }

        // Close when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });

        // Form submission
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // TEMPORARY - REPLACE WITH REAL AUTH
                if (username === "artist" && password === "stamp123") {
                    localStorage.setItem('isAuthenticated', 'true');
                    loginModal.style.display = 'none';
                    window.location.href = "admin.html";
                } else {
                    alert('Invalid credentials. Try:\nUsername: artist\nPassword: stamp123');
                }
            });
        }
    }
});
