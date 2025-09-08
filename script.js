// Part 2: JavaScript Functions - Scope, Parameters, Return Values

// Function to calculate discount based on price and percentage
function calculateDiscount(price, discountPercentage) {
    // Local scope variable
    const discount = price * (discountPercentage / 100);
    return price - discount;
}

// Function to update product price display
function updatePriceDisplay(productName, originalPrice, discountPercentage) {
    // Using global scope variable for DOM access
    const discountedPrice = calculateDiscount(originalPrice, discountPercentage);
    return `${productName}: $${discountedPrice.toFixed(2)} (Save ${discountPercentage}%)`;
}

// Function to toggle card flip
function toggleCardFlip(cardElement) {
    cardElement.classList.toggle('card-flipped');
    return cardElement.classList.contains('card-flipped');
}

// Function to toggle popup visibility
function togglePopup(popupElement, isOpen) {
    popupElement.classList.toggle('active', isOpen);
    return isOpen ? 'Popup opened' : 'Popup closed';
}

// New: Function to update all product prices with discounts
function updateAllProductPrices(products) {
    products.forEach(product => {
        const priceElement = document.querySelector(`.product-item[data-product="${product.name}"] .price`);
        if (priceElement) {
            priceElement.textContent = updatePriceDisplay(product.name, product.price, product.discount);
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize featured product price with discount
    const productCard = document.getElementById('product-card');
    const originalPrice = 29.99;
    const discountPercentage = 10;
    const priceText = updatePriceDisplay('Stethoscope', originalPrice, discountPercentage);
    document.querySelector('.card-front p').textContent = priceText;

    // Card flip animation trigger
    const flipButtons = document.querySelectorAll('.flip-btn');
    flipButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleCardFlip(productCard);
        });
    });

    // Popup animation trigger
    const openPopupBtn = document.getElementById('open-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const popup = document.getElementById('popup');

    openPopupBtn.addEventListener('click', () => {
        togglePopup(popup, true);
    });

    closePopupBtn.addEventListener('click', () => {
        togglePopup(popup, false);
    });

    // New: Initialize product listing prices with discounts
    const products = [
        { name: 'Stethoscope', price: 29.99, discount: 10, element: document.querySelector('.product-item:nth-child(1)') },
        { name: 'Wheelchair', price: 199.99, discount: 15, element: document.querySelector('.product-item:nth-child(2)') },
        { name: 'Digital Thermometer', price: 15.99, discount: 5, element: document.querySelector('.product-item:nth-child(3)') },
        { name: 'Syringe (Pack of 10)', price: 9.99, discount: 8, element: document.querySelector('.product-item:nth-child(4)') }
    ];

    // Add data-product attribute for JavaScript targeting
    products.forEach(product => {
        product.element.setAttribute('data-product', product.name);
    });

    // Update all product prices
    updateAllProductPrices(products);
});