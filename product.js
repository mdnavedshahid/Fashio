// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// DOM Elements
const mainProductImage = document.getElementById('mainProductImage');
const thumbnailImages = document.getElementById('thumbnailImages');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const productDescription = document.getElementById('productDescription');
const fullDescription = document.getElementById('fullDescription');
const colorOptions = document.getElementById('colorOptions');
const productCategory = document.getElementById('productCategory');
const productSKU = document.getElementById('productSKU');
const addToCartBtn = document.querySelector('.add-to-cart');
const quantityInput = document.getElementById('quantity');
const plusBtn = document.querySelector('.quantity-btn.plus');
const minusBtn = document.querySelector('.quantity-btn.minus');
const tabs = document.querySelectorAll('.tabs li');
const tabContents = document.querySelectorAll('.tab-content');
const relatedProducts = document.getElementById('relatedProducts');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// Sample product data - in a real app, this would come from a database
const products = [
  // T-Shirts
  {
      id: 1,
      title: "Classic Stripped T-Shirt",
      price: 19.99,
      originalPrice: 24.99,
      category: "t-shirts",
      image: "img/1.jpeg",
      images: [
         "img/1.jpeg",
         "img/1.jpeg",
      ],

      description: "Comfortable classic white t-shirt made from 100% cotton.",
      colors: ["white", "black", "gray"],
          sizes: ["S", "M", "L", "XL"]
      },
  
      {
          id: 2,
      title: "Graphic Print T-Shirt",
      price: 24.99,
      originalPrice: 29.99,
      category: "t-shirts",
      image: "img/16.jpeg",
      images: [
          "img/16.jpeg",
          "img/16.jpeg"
      ],
      description: "Stylish graphic tee with a unique design.",
      colors: ["blue", "red", "green"],
          sizes: ["S", "M", "L", "XL"]
      },

  {
      id: 3,
      title: "Striped Cotton T-Shirt",
      price: 22.99,
      originalPrice: 29.99,
      category: "t-shirts",
      image: "img/18.jpeg",
      images: [
          "img/18.jpeg",
          "img/18.jpeg"
      ],
      sizes: ["S", "M", "L", "XL"]
  },

  // ... other t-shirts
  // Shirts
  {
      id: 4,
      title: "Summer Yellow T-Shirt",
      price: 18.99,
      originalPrice: 49.99,
      category: "shirts",
      image: "img/2.jpeg",
      images: [
          "img/2.jpeg",
          "img/2.jpeg"
      ],
      description: "Stylish Summer Yellow T-Shirt for everyday wear.",
      colors: ["blue", "white", "green"],
          sizes: ["S", "M", "L", "XL"]
  },

  {
      id: 5,
      title: "Kids Light Printed Set",
      price: 29.99,
      originalPrice: 34.99,
      category: "shirts",
      image: "img/3.jpeg",
      images: [
          "img/3.jpeg",
          "img/3.jpeg"
      ],
description: "Stylish kids Kids Light Printed Set for special occasions.",
colors: ["white", "black"],
          sizes: ["S", "M", "L", "XL"]
  },


  {
    id: 6,
    title: "Casual Shorts Combo",
    price: 39.99,
    category: "shirts",
    image: "img/6.jpeg",
    images: [
        "img/6.jpeg",
        "img/6.jpeg"
    ],
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
    images: [
        "img/4.jpeg",
        "img/4.jpeg"
    ],
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
    images: [
        "img/19.jpeg",
        "img/19.jpeg"
    ],
    description: "Comfortable Shorts combo for everyday wear.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 9,
    title: "Bottom Wear Pack 4 in 1",
    price: 39.99,
    category: "shirts",
    image: "img/111.jpeg",
    images: [
        "img/11.jpeg",
        "img/11.jpeg"
    ],
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
    images: [
        "img/13.jpeg",
        "img/13.jpeg"
    ],
    description: "Comfortable T shirt for kids.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 11,
    title: "Pink Half Sleeve T-Shirt",
    price: 39.99,
    category: "shirts",
    image: "img/14.jpeg",
    images: [
        "img/14.jpeg",
        "img/14.jpeg"
    ],
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
    images: [
        "img/15.jpeg",
        "img/15.jpeg"
    ],
    description: "T shirt combo pack for kids for everyday wear.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 19,
    title: "Soccer Sports T shirt",
    price: 39.99,
    category: "shirts",
    image: "img/21.jpeg",
    images: [
        "img/21.jpeg",
        "img/21.jpeg"
    ],
    description: "Soccer Sports T shirt for kids.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  }, 

  {
    id: 20,
    title: "Socks For Kids",
    price: 39.99,
    category: "shirts",
    image: "img/20.jpeg",
    images: [
        "img/20.jpeg",
        "img/20.jpeg"
    ],
    description: "Pure Cotton Socks Special for Summers.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },
 // Shirts
  // Lowers 
  {
    id: 13,
    title: "Cotton Lower",
    price: 29.99,
    category: "lowers",
    image: "img/6.jpeg",
    images: [
        "img/9.jpeg",
        "img/9.jpeg"
    ],
    description: "Comfortable Lower for everyday wear and sports.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 14,
    title: "Shorts Combo",
    price: 34.99,
    category: "lowers",
    image: "img/5.jpeg",
    images: [
        "img/5.jpeg",
        "img/5.jpeg"
    ],
    description: "Comfortable combo for everyday wear and racing.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 15,
    title: "Printed Lower",
    price: 24.99,
    category: "lowers",
    image: "img/7.jpeg",
    images: [
        "img/7.jpeg",
        "img/7.jpeg"
    ],
    description: "Comfortable Lower for everyday wear and jogging.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 16,
    title: "Black Linen Shorts",
    price: 32.99,
    category: "lowers",
    image: "img/12.jpeg",
    images: [
        "img/12.jpeg",
        "img/12.jpeg"
    ],
    description: "Comfortable Lower for everyday wear and sports.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },



  {
    id: 17,
    title: "Black Linen Shorts",
    price: 32.99,
    category: "lowers",
    image: "img/10.jpeg",
    images: [
        "img/10.jpeg",
        "img/10.jpeg"
    ],
    description: "Stylish printed shorts for casual outings.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },


  {
    id: 18,
    title: "Black Shorts For Men",
    price: 32.99,
    category: "lowers",
    image: "img/8.jpeg",
    images: [
        "img/8.jpeg",
        "img/8.jpeg"
    ],
    description: "Comfortable black shorts for everyday wear.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },

  {
    id: 21,
    title: "Cotton Innerwear For Men",
    price: 32.99,
    category: "lowers",
    image: "img/17.jpeg",
    images: [
        "img/17.jpeg",
        "img/17.jpeg"
    ],
    description: "Comfortable black innerwear for men specially made with 100% pure cotton.",
    colors: ["white", "blue", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },
  // ... other products (make sure each has an images array)
];

// Find the current product
const product = products.find(p => p.id === productId);

// Display product details with multiple images
function displayProductDetails() {
    if (!product) {
        window.location.href = 'index.html';
        return;
    }
    
    // Set main product details
    productTitle.textContent = product.title;
    productPrice.innerHTML = `$${product.price.toFixed(2)}${product.originalPrice ? ` <span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}`;
    productDescription.textContent = product.description;
    fullDescription.textContent = `${product.description} This high-quality product is designed for comfort and style, making it perfect for any occasion.`;
    productCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    productSKU.textContent = `FR-${product.id.toString().padStart(3, '0')}`;
    
    // Set up product images
    thumbnailImages.innerHTML = '';
    
    // Use the images array if available, otherwise create default image names
    const productImages = product.images || [
        product.image,
        product.image.replace('.jpg', '-2.jpg'),
        product.image.replace('.jpg', '-3.jpg'),
        product.image.replace('.jpg', '-4.jpg'),
        product.image.replace('.jpg', '-5.jpg')
    ];
    
    // Add all images to thumbnails
    productImages.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${product.title} - View ${index + 1}`;
        
        // Make first image active by default
        if (index === 0) {
            img.classList.add('active');
            mainProductImage.src = imgSrc;
            mainProductImage.alt = product.title;
        }
        
        img.addEventListener('click', function() {
            mainProductImage.src = this.src;
            document.querySelectorAll('.thumbnail-images img').forEach(img => 
                img.classList.remove('active')
            );
            this.classList.add('active');
        });
        
        thumbnailImages.appendChild(img);
    });
    
    // Set up color options
    colorOptions.innerHTML = '';
    product.colors.forEach((color, index) => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option ${index === 0 ? 'selected' : ''}`;
        colorOption.style.backgroundColor = color;
        colorOption.dataset.color = color;
        colorOption.title = color.charAt(0).toUpperCase() + color.slice(1);
        
        colorOption.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
        
        colorOptions.appendChild(colorOption);
    });
    
    // Display related products (same category)
    const related = products.filter(p => p.category === product.category && p.id !== product.id);
    displayRelatedProducts(related);
}

function displayRelatedProducts(relatedProductsArray) {
    relatedProducts.innerHTML = '';
    
    relatedProductsArray.slice(0, 4).forEach(product => {
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
        
        relatedProducts.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const relatedProductId = parseInt(this.getAttribute('data-id'));
            const relatedProduct = products.find(p => p.id === relatedProductId);
            
            addToCart(relatedProduct);
        });
    });
}

// Enhanced addToCart function with color and size
function addToCart(product, quantity = 1, color = null, size = null) {
    color = color || document.querySelector('.color-option.selected')?.dataset.color || 'default';
    size = size || document.getElementById('size').value;
    quantity = quantity || parseInt(quantityInput.value) || 1;
    
    const existingItem = cart.find(item => 
        item.id === product.id && 
        item.color === color && 
        item.size === size
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity,
            color: color,
            size: size
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${quantity} × ${product.title} added to cart`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
}

// Tab functionality
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Review form submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your review!');
    this.reset();
    
    // Reset star ratings
    document.querySelectorAll('.rating-input i').forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
});

// Star rating functionality
document.querySelectorAll('.rating-input i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = parseInt(this.dataset.rating);
        
        document.querySelectorAll('.rating-input i').forEach((s, index) => {
            if (index < rating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProductDetails();
    updateCartCount();
    
    // Quantity controls
    plusBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // Add to cart button
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });
});
