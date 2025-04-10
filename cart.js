// DOM Elements
const cartItems = document.getElementById('cartItems');
const subtotal = document.getElementById('subtotal');
const shipping = document.getElementById('shipping');
const tax = document.getElementById('tax');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.querySelector('.checkout-btn');
const recommendedProducts = document.getElementById('recommendedProducts');

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart items
function displayCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart-message">
                <p>Your cart is currently empty.</p>
                <a href="index.html" class="btn">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-product">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-product-info">
                    <h3>${item.title}</h3>
                    <p>Color: Black | Size: M</p>
                </div>
            </div>
            <div class="cart-price">$${item.price.toFixed(2)}</div>
            <div class="cart-quantity">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                </div>
            </div>
            <div class="cart-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="remove-item">
                <i class="fas fa-trash-alt" data-id="${item.id}"></i>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            updateQuantity(itemId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            updateQuantity(itemId, 1);
        });
    });
    
    // Add event listeners to quantity inputs
    document.querySelectorAll('.cart-quantity input').forEach(input => {
        input.addEventListener('change', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            const newQuantity = parseInt(this.value);
            
            if (newQuantity >= 1) {
                updateQuantity(itemId, 0, newQuantity);
            } else {
                this.value = 1;
            }
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item i').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            removeItem(itemId);
        });
    });
    
    updateCartTotals();
}

// Update quantity
function updateQuantity(itemId, change, newQuantity = null) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        if (newQuantity !== null) {
            cart[itemIndex].quantity = newQuantity;
        } else {
            cart[itemIndex].quantity += change;
            
            if (cart[itemIndex].quantity < 1) {
                cart[itemIndex].quantity = 1;
            }
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// Remove item
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Update cart totals
function updateCartTotals() {
    const subtotalValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingValue = subtotalValue > 0 ? 5.00 : 0.00;
    const taxValue = subtotalValue * 0.1; // 10% tax
    
    subtotal.textContent = `$${subtotalValue.toFixed(2)}`;
    shipping.textContent = `$${shippingValue.toFixed(2)}`;
    tax.textContent = `$${taxValue.toFixed(2)}`;
    cartTotal.textContent = `$${(subtotalValue + shippingValue + taxValue).toFixed(2)}`;
}

// Update cart count (for all pages)
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// Display recommended products
function displayRecommendedProducts() {
    // In a real app, you would fetch recommended products based on cart items
    // For demo, we'll just show some random products
    const recommended = [
        {
            id: 17,
            title: "Premium Polo Shirt",
            price: 34.99,
            category: "t-shirts",
            image: "images/t-shirt5.jpg"
        },
        {
            id: 18,
            title: "Casual Button-Down Shirt",
            price: 42.99,
            category: "shirts",
            image: "images/shirt5.jpg"
        },
        {
            id: 19,
            title: "Slim Fit Jeans",
            price: 59.99,
            category: "pants",
            image: "images/pants5.jpg"
        },
        {
            id: 20,
            title: "Cotton Cargo Shorts",
            price: 39.99,
            category: "lowers",
            image: "images/lowers5.jpg"
        }
    ];
    
    recommendedProducts.innerHTML = '';
    
    recommended.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                </div>
                <div class="product-actions">
                    <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <a href="product.html?id=${product.id}" class="btn view-details">View Details</a>
                </div>
            </div>
        `;
        
        recommendedProducts.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = recommended.find(p => p.id === productId);
            
            addToCart(product);
        });
    });
}

// Add to cart function
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${product.title} added to cart`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Checkout button
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some products before checkout.');
    } else {
        alert('Proceeding to checkout. In a real app, this would redirect to a payment page.');
        // In a real app: window.location.href = 'checkout.html';
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    displayRecommendedProducts();
    updateCartCount();
});
