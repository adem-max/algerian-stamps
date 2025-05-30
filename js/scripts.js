const products = [
  { id: 1, name: "1957 Postage Stamp", price: 200, img: "images/stamp-1.jpg" },
  { id: 2, name: "1962 Independence Stamp", price: 450, img: "images/stamp-2.jpg" },
  { id: 3, name: "National Flower Stamp", price: 300, img: "images/stamp-3.jpg" },
  { id: 4, name: "Historic Landmark Stamp", price: 350, img: "images/stamp-4.jpg" },
  { id: 5, name: "1957 Postage Stamp Variant", price: 200, img: "images/stamp-5.jpg" },
  { id: 6, name: "1962 Independence Stamp Variant", price: 450, img: "images/stamp-6.jpg" },
  { id: 7, name: "National Flower Stamp Variant", price: 300, img: "images/stamp-7.jpg" },
  { id: 8, name: "Historic Landmark Stamp Variant", price: 350, img: "images/stamp-8.jpg" }
];

let cart = [];

function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Clear existing content
  
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
      <h3>${product.name}</h3>
      <p>${product.price} DA</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    document.getElementById('cart-count').innerText = cart.length;
    updateCart();
  }
}

// ... rest of your functions remain the same ...
