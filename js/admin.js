// admin.js
checkAuth(); // Verify user is logged in

document.getElementById('stampForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('stampName').value;
  const year = document.getElementById('stampYear').value;
  const description = document.getElementById('stampDescription').value;
  const imageFile = document.getElementById('stampImage').files[0];
  
  // Option 1: Using GitHub API (more complex)
  // await addStampViaGitHub(name, year, description, imageFile);
  
  // Option 2: Using localStorage or IndexedDB (simpler but limited)
  addStampToLocalStorage(name, year, description, imageFile);
  
  alert('Stamp added successfully!');
  this.reset();
});

// Simple localStorage version
function addStampToLocalStorage(name, year, description, imageFile) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const stamps = JSON.parse(localStorage.getItem('stamps')) || [];
    const newStamp = {
      id: Date.now(),
      name,
      year,
      description,
      image: e.target.result,
      addedAt: new Date().toISOString()
    };
    stamps.push(newStamp);
    localStorage.setItem('stamps', JSON.stringify(stamps));
  };
  reader.readAsDataURL(imageFile);
}

