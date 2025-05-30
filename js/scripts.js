// Modernized Product Data with correct image paths
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

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productList = document.getElementById('product-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartOverlay = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');

// Initialize the app
function init() {
    renderProducts();
    updateCart();
    setupEventListeners();
    
    // Set cart position to closed on load
    cartOverlay.style.right = '-100%';
}

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProducts(button.dataset.filter);
        });
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        const isCartClick = e.target.closest('.cart-container') || 
                           e.target.closest('.cart-icon') || 
                           e.target.classList.contains('cart-icon');
        
        if (!isCartClick) {
            cartOverlay.style.right = '-100%';
        }
    });
}

// Render products with optional filter
function renderProducts(filter = 'all') {
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
                <img src="${product.img}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-year">${product.year}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${product.price} DA</p>
                <button onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
    showToast(`${product.name} added to cart`);
}

// Update cart UI and localStorage
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price} DA × ${item.quantity}</span>
            </div>
            <div class="cart-item-actions">
                <button onclick="adjustQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="adjustQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = `${total} DA`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Adjust item quantity
function adjustQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showToast('Item removed from cart');
}

// Toggle cart visibility
function toggleCart() {
    cartOverlay.style.right = cartOverlay.style.right === '0px' ? '-100%' : '0px';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }

    // In a real app, you would process payment here
    showToast('Order placed successfully!', 'success');
    cart = [];
    updateCart();
}

// Show toast notification
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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
