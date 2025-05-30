// Update all image paths to include 'images/' prefix
const products = [
    { 
        id: 1, 
        name: "1957 Independence Issue", 
        price: 200, 
        img: "images/1.jpg", // Updated path
        // ... rest of product data
    },
    // ... other products
];

// Update renderProducts function to include image container
function renderProducts(filter = 'all') {
    productList.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="image-container">
                <img src="${product.img}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price} DA</p>
                <button onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}
