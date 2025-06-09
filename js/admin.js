// Check authentication
if (!localStorage.getItem('isAuthenticated')) {
    window.location.href = 'index.html';
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'index.html';
});

// Handle stamp form submission
document.getElementById('stampForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('stampName').value;
    const year = document.getElementById('stampYear').value;
    const description = document.getElementById('stampDescription').value;
    const imageFile = document.getElementById('stampImage').files[0];
    
    // Here you would typically:
    // 1. Upload the image to a server or GitHub
    // 2. Save the stamp data to your database
    // For now, we'll just show a success message
    
    alert(`Stamp "${name}" (${year}) added successfully!`);
    this.reset();
});
