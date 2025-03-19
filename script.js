let cart = []
let wishlist = []

function addToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1
    } else {
        const product = {
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(product)
    }

    updateCartCount()
}
//
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

// input event on the search bar
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
    const discount = 0.1; // i added 10% discount
    const discountedPrice = product.price * (1 - discount);
    alert(`You entered: ${mobileNumber}\nYou get a 10% discount! The discounted price is ₹${discountedPrice.toFixed(2)}`);

   on
    closeLoginModal();
}

// Add Quick Checkout Button 
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
    const products = document.querySelectorAll('.product'); 
    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase(); 
      
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// let name=document.getElementsByTagName('footer')[0]
// console.log('name',name)
// let design=name.insertAdjacentText('beforebegin','Divya')

let name = document.getElementsByTagName('main')[0];
let container = document.createElement('div');

// Create a span for the text with a line
let textWithLine = document.createElement('span');
textWithLine.classList.add('text-with-line');
textWithLine.textContent = 'THIS WOMEN’S DAY, IT’S ALL ABOUT YOU!';

// Add the text-with-line span inside the container
container.classList.add('red-box');
container.appendChild(textWithLine);

// Create the additional text
let additionalText = document.createElement('span');
additionalText.classList.add('additional-text');
additionalText.textContent = 'Get Ready for Unbeatable Deals: Enjoy Special Offers Upto 50% - Shop Now!';

// Add the additional text span inside the container
container.appendChild(additionalText);

// Create the additional button
let additionalButton = document.createElement('button');
additionalButton.classList.add('additional-button');  // Proper class name
additionalButton.textContent = 'LEARN MORE';

// Add the button inside the container
container.appendChild(additionalButton);

// Insert the div before the footer element
container.style.marginTop = '50px';
name.insertAdjacentElement('beforebegin', container);

// Handle button click event to show more information
additionalButton.addEventListener('mouseover', function() {
  // Check if the container already exists to avoid creating it multiple times
  if (document.querySelector('.more-info-container')) return; // Prevent duplicate containers
  
  // Create the new container for the image and text
  let name1 = document.getElementsByTagName('footer')[0];
  let moreInfoContainer = document.createElement('div');
  moreInfoContainer.classList.add('more-info-container');
  
  // Create the image side (left side of the container)
  let imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');
  let image = document.createElement('img');
  image.src = 'logo.jpg';  // Placeholder image, change the source as needed
  image.alt = 'Scholarship Image';
  image.classList.add('info-image');
  imageContainer.appendChild(image);
  
  // Create the text side (right side of the container)
  let textContainer = document.createElement('div');
  textContainer.classList.add('text-container');
  
  let text1 = document.createElement('p');
  text1.textContent = 'Celebrate Women’s Day with Exquisite Jewelry Deals!';
  text1.style.fontWeight = 'bold';
  text1.style.fontSize = '25px';
  text1.style.marginTop = '45px';
  textContainer.appendChild(text1);

  let text2 = document.createElement('p');
  text2.textContent = 'This Women’s Day, show your appreciation by gifting something truly special. Our jewelry collection has been carefully curated to embody elegance, grace, and timeless beauty. Whether it’s a sparkling pair of earrings, a bold statement necklace, or a delicate bracelet, we have something to suit every personality and occasion.';
  textContainer.appendChild(text2);

  let text3 = document.createElement('p');
  text3.textContent = 'Take advantage of our exclusive Women’s Day offer! For a limited time only, enjoy amazing discounts of up to 50% on our entire range of jewelry. Whether you’re treating yourself or surprising a loved one, this is the perfect opportunity to add some sparkle and shine to your collection. Each piece is crafted with attention to detail, ensuring it lasts a lifetime.';
  textContainer.appendChild(text3);

  let text4 = document.createElement('p');
  text4.textContent = 'Don’t wait too long to take advantage of these unbeatable offers! With the perfect blend of elegance and style, our jewelry collections are the ultimate way to celebrate Women’s Day. Visit our store or shop online now to find the perfect piece for you or someone special. Make this Women’s Day truly unforgettable with the gift of timeless jewelry.';
  textContainer.appendChild(text4);

  // Append the image and text side into the new container
  moreInfoContainer.appendChild(imageContainer);
  moreInfoContainer.appendChild(textContainer);
  
  // Insert the new container into the page
  name1.insertAdjacentElement('beforebegin', moreInfoContainer);
  
  // Ensure the container is displayed as a flexbox layout
  moreInfoContainer.style.display = 'flex';
});
