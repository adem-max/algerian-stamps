const products = [
  { id: 1, name: "1957 Postage Stamp", price: 200, img: "images/stamp-1.jpg" },
  { id: 2, name: "1962 Independence Stamp", price: 450, img: "images/stamp-2.jpg" },
  { id: 3, name: "National Flower Stamp", price: 300, img: "images/stamp-3.jpg" },
  { id: 4, name: "Historic Landmark Stamp", price: 350, img: "images/stamp-4.jpg" }
  { id: 1, name: "1957 Postage Stamp", price: 200, img: "images/stamp-5.jpg" },
  { id: 2, name: "1962 Independence Stamp", price: 450, img: "images/stamp-6.jpg" },
  { id: 3, name: "National Flower Stamp", price: 300, img: "images/stamp-7.jpg" },
  { id: 4, name: "Historic Landmark Stamp", price: 350, img: "images/stamp-8.jpg" }
];

let cart = [];

function renderProducts() {
  const productList = document.getElementById('product-list');
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} DA</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  document.getElementById('cart-count').innerText = cart.length;
  updateCart();
}

function toggleCart() {
  const cartBox = document.getElementById('cart');
  cartBox.style.display = cartBox.style.display === 'block' ? 'none' : 'block';
}

function updateCart() {
  const list = document.getElementById('cart-items');
  const total = document.getElementById('total-price');
  list.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name} - ${item.price} DA`;
    list.appendChild(li);
    totalPrice += item.price;
  });

  total.innerText = totalPrice + ' DA';
}

function checkout() {
  alert('This is a mock checkout. Thank you for your interest!');
}

window.onload = renderProducts;
