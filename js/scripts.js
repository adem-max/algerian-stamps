// =================================================================================
// MAIN APPLICATION LOGIC (for index.html)
// =================================================================================

// This listener ensures that the code runs only after the entire HTML document has been loaded.
document.addEventListener('DOMContentLoaded', () => {

    // --- Product & Stamp Data ---
    const products = [
        {
            id: 1,
            name: "1957 Independence Issue",
            price: 200,
            img: "images/1.jpg",
            category: "historical",
            year: 1957,
            description: "First anniversary of Algerian independence"
        },
        {
            id: 2,
            name: "1962 Revolution Heroes",
            price: 450,
            img: "images/2.jpg",
            category: "historical",
            year: 1962,
            description: "Commemorating the revolution leaders"
        },
        {
            id: 3,
            name: "Algerian Jasmine",
            price: 300,
            img: "images/3.jpg",
            category: "flora",
            year: 1975,
            description: "National flower series"
        },
        {
            id: 4,
            name: "Casbah of Algiers",
            price: 350,
            img: "images/4.jpg",
            category: "historical",
            year: 1980,
            description: "UNESCO World Heritage site"
        },
        {
            id: 5,
            name: "Saharan Wildlife",
            price: 280,
            img: "images/5.jpg",
            category: "flora",
            year: 1992,
            description: "Endangered species series"
        },
        {
            id: 6,
            name: "50th Independence",
            price: 500,
            img: "images/6.jpg",
            category: "commemorative",
            year: 2012,
            description: "Golden jubilee celebration"
        },
        {
            id: 7,
            name: "Traditional Crafts",
            price: 320,
            img: "images/7.jpg",
            category: "commemorative",
            year: 2018,
            description: "Cultural heritage series"
        },
        {
            id: 8,
            name: "African Unity",
            price: 400,
            img: "images/8.jpg",
            category: "commemorative",
            year: 2020,
            description: "Pan-African cooperation"
        }
    ];

    // --- Cart State ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- DOM Element Selections (for the main shop page) ---
    const productList = document.getElementById('product-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cartOverlay = document.getElementById('cart');
    const cartCount = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');

    // --- AUTHENTICATION LOGIC (for Artist Login) ---
    const loginBtn = document.getElementById('loginButton'); // Corrected from 'loginBtn'
    const loginModal = document.getElementById('loginModal');

    if (loginBtn && loginModal) {
        const closeModal = loginModal.querySelector('.close');
        const loginForm = document.getElementById('loginForm');

        // Open modal
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'block';
        });

        // Close modal via 'x' button
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                loginModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside of it
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });

        // Handle login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                // Simple check for demonstration purposes. Replace with real authentication.
                if (username === "lahcen" && password === "lahcenbelfarah") {
                    localStorage.setItem('isAuthenticated', 'true');
                    loginModal.style.display = 'none';
                    window.location.href = "admin.html"; // Redirect to admin page
                } else {
                    alert('Invalid credentials.');
                }
            });
        }
    }

    // --- SHOP & CART FUNCTIONS ---

    // Render products with an optional category filter
    const renderProducts = (filter = 'all') => {
        if (!productList) return; // Don't run if on admin page
        productList.innerHTML = '';

        const filteredProducts = filter === 'all'
            ? products
            : products.filter(product => product.category === filter);

        if (filteredProducts.length === 0) {
            productList.innerHTML = '<p class="no-products">No stamps found in this category.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="image-container">
                    <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null;this.src='images/placeholder.jpg';">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-year">${product.year}</p>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price} DA</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            productList.appendChild(productCard);
        });
    };

    // Update the cart display and save to localStorage
    const updateCart = () => {
        if (!cartItemsEl || !totalPriceEl || !cartCount) return; // Don't run if elements aren't on the page

        cartItemsEl.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price} DA &times; ${item.quantity}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="adjust-qty-btn" data-id="${item.id}" data-change="-1">-</button>
                    <span>${item.quantity}</span>
                    <button class="adjust-qty-btn" data-id="${item.id}" data-change="1">+</button>
                    <button class="remove-from-cart-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsEl.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalPriceEl.textContent = `${total} DA`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Add item to cart
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        showToast(`${product.name} added to cart`);
    };

    // Adjust item quantity in cart
    const adjustQuantity = (productId, change) => {
        const item = cart.find(item => item.id === productId);
        if (!item) return;
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(item.id, false); // Don't show toast again
        }
        updateCart();
    };

    // Remove item from cart
    const removeFromCart = (productId, showMsg = true) => {
        const itemRemoved = cart.find(item => item.id === productId);
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        if (showMsg) {
            showToast(`${itemRemoved.name} removed from cart`);
        }
    };
    
    // Toggle cart slide-in/out visibility
    window.toggleCart = () => {
         if (!cartOverlay) return;
         cartOverlay.style.right = cartOverlay.style.right === '0px' ? '-100%' : '0px';
    };
    
    // Checkout function
    window.checkout = () => {
        if (cart.length === 0) {
            showToast('Your cart is empty', 'error');
            return;
        }
        showToast('Order placed successfully!', 'success');
        cart = [];
        updateCart();
        toggleCart(); // Close the cart after checkout
    };

    // --- EVENT LISTENERS (for main page elements) ---
    const setupMainEventListeners = () => {
        if (filterButtons) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    renderProducts(button.dataset.filter);
                });
            });
        }
        
        // Use event delegation for dynamically created buttons
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const productId = parseInt(e.target.closest('.add-to-cart-btn').dataset.id);
                addToCart(productId);
            }
            if (e.target.closest('.adjust-qty-btn')) {
                const button = e.target.closest('.adjust-qty-btn');
                const productId = parseInt(button.dataset.id);
                const change = parseInt(button.dataset.change);
                adjustQuantity(productId, change);
            }
            if (e.target.closest('.remove-from-cart-btn')) {
                const productId = parseInt(e.target.closest('.remove-from-cart-btn').dataset.id);
                removeFromCart(productId);
            }
            
            // Close cart when clicking outside of it
            const isCartClick = e.target.closest('.cart-container') || e.target.closest('.cart-icon');
            if (cartOverlay && cartOverlay.style.right === '0px' && !isCartClick) {
                 toggleCart();
            }
        });
    };

    // --- INITIALIZATION (for main shop page) ---
    const initMainPage = () => {
        if (productList) { // Only run if we are on the main page
            renderProducts();
            updateCart();
            setupMainEventListeners();
            if(cartOverlay) {
                cartOverlay.style.right = '-100%';
            }
        }
    };

    initMainPage();
});


// =================================================================================
// ADMIN PAGE LOGIC (for admin.html)
// =================================================================================

// This code runs specifically on the admin page.
// We check the URL to determine if we should execute admin-specific code.
if (window.location.pathname.endsWith("admin.html")) {
    
    // Check authentication status immediately
    if (localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.href = 'index.html'; // Redirect if not logged in
    }

    // Wait for the DOM to be loaded before manipulating it
    document.addEventListener('DOMContentLoaded', () => {
        const logoutButton = document.getElementById('logoutButton');
        const stampForm = document.getElementById('stampForm');

        // Logout functionality
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('isAuthenticated');
                window.location.href = 'index.html';
            });
        }

        // Handle new stamp form submission
        if (stampForm) {
            stampForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('stampName').value;
                const year = document.getElementById('stampYear').value;
                const description = document.getElementById('stampDescription').value;
                const imageFile = document.getElementById('stampImage').files[0];

                // In a real application, you would handle file upload and data saving.
                // For this demo, we just show a confirmation.
                if (name && year && description && imageFile) {
                    alert(`Stamp "${name}" (${year}) submitted successfully!`);
                    stampForm.reset();
                } else {
                    alert('Please fill out all fields.');
                }
            });
        }
    });
}


// =================================================================================
// GLOBAL HELPER FUNCTIONS
// =================================================================================

// Show a toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Global window load event for things like hiding a preloader
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fallback for broken images
    document.querySelectorAll('img').forEach(img => {
        if(img.naturalWidth === 0) {
            img.src = 'images/placeholder.jpg';
        }
    });
});
