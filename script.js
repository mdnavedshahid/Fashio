// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');
const cartCount = document.querySelector('.cart-count');
const productsGrid = document.getElementById('featured-products');
const tshirtsGrid = document.getElementById('t-shirts-products');
const shirtsGrid = document.getElementById('shirts-products');
const pantsGrid = document.getElementById('pants-products');
const lowersGrid = document.getElementById('lowers-products');
const categoryCards = document.querySelectorAll('.category-card');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart count on all pages
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// Product data
const products = [
    // T-Shirts
    {
        id: 1,
        title: "Classic Stripped T-Shirt",
        price: 19.99,
        originalPrice: 24.99,
        category: "t-shirts",
        image: "img/1.jpeg",
        description: "Comfortable classic white t-shirt made from 100% cotton.",
        colors: ["white", "black", "gray"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        title: "Graphic Print T-Shirt",
        price: 24.99,
        category: "t-shirts",
        image: "img/16.jpeg",
        description: "Trendy graphic print t-shirt with unique design.",
        colors: ["black", "red", "blue"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        title: "Striped Cotton T-Shirt",
        price: 22.99,
        originalPrice: 29.99,
        category: "t-shirts",
        image: "img/18.jpeg",
        description: "Stylish striped t-shirt perfect for casual outings.",
        colors: ["blue", "navy", "gray"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 4,
        title: "Summer Yellow T-Shirt",
        price: 18.99,
        category: "t-shirts",
        image: "img/2.jpeg",
        description: "Soft v-neck t-shirt with a comfortable fit.",
        colors: ["white", "black", "pink"],
        sizes: ["S", "M", "L", "XL"]
    },
    // Shirts
    {
        id: 5, 
        title: "Kids Light Printed Set",
        price: 29.99,
        originalPrice: 34.99,
        category: "shirts",
        image: "img/3.jpeg",
        description: "Stylish kids shirt set for special occasions.",
        colors: ["blue", "green", "red"],
        sizes: ["S", "M", "L"]
    },
    {
        id: 6,
        title: "Casual Shorts Combo",
        price: 39.99,
        category: "shirts",
        image: "img/6.jpeg",
        description: "Comfortable Shorts combo for everyday wear.",
        colors: ["white", "blue", "gray"],
        sizes: ["S", "M", "L", "XL"]

    },
    
   

    {
      id: 7,
      title: "Blue Set For Kids",
      price: 39.99,
      category: "shirts",
      image: "img/4.jpeg",
      description: "Illigant set for a kid for occasions.",
      colors: ["white", "blue", "gray"],
      sizes: ["S", "M", "L", "XL"]

  },

  {
    id: 8,
    title: "Short Pants Pack 4 in 1",
    price: 39.99,
    category: "shirts",
    image: "img/19.jpeg",
    description: "Combo of 4 stylish shorts for kids.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]

}, 


{
  id: 9,
  title: "Bottom Wear Pack 4 in 1",
  price: 39.99,
  category: "shirts",
  image: "img/11.jpeg",
  description: "Combo of 4 stylish shorts for kids.",
  colors: ["white", "blue", "gray"],
  sizes: ["S", "M", "L", "XL"]

},


{
  id: 10,
  title: "Skyblue T-Shirt For Kids",
  price: 39.99,
  category: "shirts",
  image: "img/13.jpeg",
  description: "Comfortable t-shirt for kids.",
  colors: ["white", "blue", "gray"],
  sizes: ["S", "M", "L", "XL"]

},

{
  id: 11,
  title: "Pink Half Sleeve T-Shirt",
  price: 39.99,
  category: "shirts",
  image: "img/14.jpeg",
  description: "Pink half sleeve t-shirt for kids.",
  colors: ["white", "blue", "gray"],
  sizes: ["S", "M", "L", "XL"]

},

{
  id: 12,
  title: "T shirt Combo Pack 3 in 1",
  price: 39.99,
  category: "shirts",
  image: "img/15.jpeg",
  description: "T shirt combo pack for kids.",
  colors: ["white", "blue", "gray"],
  sizes: ["S", "M", "L", "XL"]

},


{
  id: 19,
  title: "Soccer Sports T shirt",
  price: 39.99,
  category: "shirts",
  image: "img/21.jpeg",
  description: "Soccer sports t-shirt for kids.",
  colors: ["white", "blue", "gray"],
  sizes: ["S", "M", "L", "XL"]

},



{
  id: 20,
  title: "Socks For Kids",
  price: 39.99,
  category: "shirts",
  image: "img/20.jpeg",
  description: "Pure Cotton Socks Special for Summers.",
  colors: ["white", "blue", "gray"],
  sizes: ["S", "M", "L", "XL"]

},

// Lowers
    {
        id: 13,
        title: "Cotton Lower",
        price: 29.99,
        originalPrice: 34.99,
        category: "lowers",
        image: "img/9.jpeg",
        description: "Comfortable Lower for everyday wear and sports.",
        colors: ["blue", "black", "gray"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 14,
        title: "Shorts Combo",
        price: 34.99,
        category: "lowers",
        image: "img/5.jpeg",
        description: "Stylish denim shorts for casual wear.",
        colors: ["blue", "black"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 15,
        title: "Printed Lower",
        price: 24.99,
        category: "lowers",
        image: "img/7.jpeg",
        description: "Breathable athletic shorts for workouts.",
        colors: ["black", "gray", "blue"],
        sizes: ["S", "M", "L", "XL"]
    },
   {
        id: 16,
        title: " Black Linen Shorts",
        price: 32.99,
        category: "lowers",
        image: "img/12.jpeg",
        description: "Lightweight linen shorts for hot weather.",
        colors: ["beige", "white", "khaki"],
        sizes: ["S", "M", "L", "XL"]
    },

    {
      id: 17,
      title: "Light Printed Lower",
      price: 32.99,
      category: "lowers",
      image: "img/10.jpeg",
      description: "Stylish printed shorts for casual outings.",
      colors: ["beige", "white", "khaki"],
      sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 18,
    title: " Black Shorts For Men",
    price: 32.99,
    category: "lowers",
    image: "img/8.jpeg",
    description: "Comfortable black shorts for everyday wear.",
    colors: ["beige", "white", "khaki"],
    sizes: ["S", "M", "L", "XL"]
},


{
  id: 21,
  title: " Cotton For Men",
  price: 32.99,
  category: "lowers",
  image: "img/8.jpeg",
  description: "Comfortable black innerwear for men specially made with 100% pure cotton.",
  colors: ["beige", "white", "khaki"],
  sizes: ["S", "M", "L", "XL"]
},



];

// Display products
function displayProducts(productsArray, container) {
    container.innerHTML = '';
    
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                ${product.originalPrice ? `<div class="product-badge">Sale</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <a href="product.html?id=${product.id}" class="btn view-details">View Details</a>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
    // Add event listeners to "View Details" buttons
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', function() {
          const productId = parseInt(this.getAttribute('data-id'));
          // Navigate to product page with ID parameter
          window.location.href = `product.html?id=${productId}`;
      });
  });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
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

// Filter products by category
function filterProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Initialize the page
function init() {
    updateCartCount();
    
    // Display featured products (first 6 products)
    displayProducts(products.slice(0, 4), productsGrid);
    
    // Display products by category
    displayProducts(filterProductsByCategory('t-shirts'), tshirtsGrid);
    displayProducts(filterProductsByCategory('shirts'), shirtsGrid);
    displayProducts(filterProductsByCategory('pants'), pantsGrid);
    displayProducts(filterProductsByCategory('lowers'), lowersGrid);
    
    // Category buttons
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            document.getElementById(category).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Notification styles (added dynamically)
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--success-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);
