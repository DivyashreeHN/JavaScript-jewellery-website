let cart = [];
let wishlist = [];

function addToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        const product = {
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(product);
    }

    updateCartCount();
}

function updateCartCount() {
    const cartButton = document.querySelector(".cart-wishlist button"); 

    if (cartButton) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); 
        cartButton.innerText = `Cart 🛒${totalItems}`;
    } else {
        console.error("Cart button not found!");
    }
}

function viewCart() {
    const cartModal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `${item.name} - ₹${item.price} x ${item.quantity} = ${item.price * item.quantity} 
        <button onclick="removeFromCart(${index}, '${item.name}')">Remove</button>`;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total;
    cartModal.style.display = "flex";
}

function removeFromCart(index, productName) {
    cart.splice(index, 1);
    updateCartCount();
    alert(`${productName} has been removed from your cart!`);
    viewCart();
}

function closeCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = "none";
}

// Wishlist functionality
function addToWishlist(productName) {
    if (!wishlist.includes(productName)) {
        wishlist.push(productName);
        alert(`${productName} has been added to your wishlist!`);
    } else {
        alert(`${productName} is already in your wishlist.`);
    }
}

function viewWishlist() {
    const wishlistModal = document.getElementById("wishlist-modal");
    const wishlistItems = document.getElementById("wishlist-items");

    wishlistItems.innerHTML = "";
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = "<p>Your wishlist is empty!</p>";
    } else {
        wishlist.forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.innerHTML = item;
            wishlistItems.appendChild(itemDiv);
        });
    }

    wishlistModal.style.display = "flex";
}

function closeWishlist() {
    const wishlistModal = document.getElementById("wishlist-modal");
    wishlistModal.style.display = "none";
}

// Category Filtering
function filterByCategory(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Listen for the 'input' event on the search bar
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.toLowerCase(); // Get the search query (convert to lowercase)
    searchProducts(query);
});

// Function to handle Quick Checkout button click
function quickCheckout(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        openLoginModal(productName);
    }
}

// Function to open the Login Modal
function openLoginModal(productName) {
    const loginModal = document.getElementById("login-modal");
    loginModal.style.display = "flex";
    // You can store the product name or pass it to the next step
    sessionStorage.setItem('quickCheckoutProduct', productName);
}

// Function to close the Login Modal
function closeLoginModal() {
    const loginModal = document.getElementById("login-modal");
    loginModal.style.display = "none";
}

// Function to submit the mobile number and apply 10% discount
function submitMobileNumber() {
    const mobileNumber = document.getElementById('mobile-number').value;
    if (!mobileNumber || isNaN(mobileNumber) || mobileNumber.length < 10) {
        alert("Please enter a valid mobile number.");
        return;
    }

    // Get the product name from sessionStorage (saved from quickCheckout)
    const productName = sessionStorage.getItem('quickCheckoutProduct');
    const product = cart.find(item => item.name === productName);
    const discount = 0.1; // 10% discount
    const discountedPrice = product.price * (1 - discount);
    alert(`You entered: ${mobileNumber}\nYou get a 10% discount! The discounted price is ₹${discountedPrice.toFixed(2)}`);

    // Close the modal after successful submission
    closeLoginModal();
}

// Add Quick Checkout Button to each product in the cart
function viewCart() {
    const cartModal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity} 
        <button onclick="removeFromCart(${index}, '${item.name}')">Remove</button>
        <button onclick="quickCheckout('${item.name}')">Quick Checkout</button>`;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total;
    cartModal.style.display = "flex";
}


function searchProducts(query) {
    const products = document.querySelectorAll('.product'); // Get all products
    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase(); // Get the product name and convert it to lowercase
        // If the product name includes the query, show it, otherwise hide it
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
