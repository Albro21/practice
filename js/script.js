
const hearts = document.querySelectorAll('.bi-heart, .bi-heart-fill');

function saveHeartState(id, isFilled) {
    localStorage.setItem('heart-' + id, isFilled ? 'filled' : 'empty');
}

function getHeartState(id) {
    return localStorage.getItem('heart-' + id);
}

hearts.forEach(heart => {
    const id = heart.id;

    const state = getHeartState(id);
    if (state === 'filled') {
        heart.classList.replace('bi-heart', 'bi-heart-fill');
        heart.style.color = 'red';
    } else {
        heart.classList.replace('bi-heart-fill', 'bi-heart');
        heart.style.color = '';
    }

    heart.addEventListener('click', () => {
        if (heart.classList.contains('bi-heart')) {
            heart.classList.replace('bi-heart', 'bi-heart-fill');
            heart.style.color = 'red';
            saveHeartState(id, true);
        } else {
            heart.classList.replace('bi-heart-fill', 'bi-heart');
            heart.style.color = '';
            saveHeartState(id, false);
        }
    });
});

document.querySelectorAll('.bi-cart, .bi-cart-fill').forEach(cartIcon => {
    cartIcon.addEventListener('click', () => {
        if (cartIcon.classList.contains('bi-cart')) {
            cartIcon.classList.replace('bi-cart', 'bi-cart-fill');
            cartIcon.style.color = '#0d6efd';

            const rect = cartIcon.getBoundingClientRect();
            const plusOne = document.createElement('span');
            plusOne.textContent = '+1';
            plusOne.className = 'plus-one';

            plusOne.style.position = 'fixed';
            plusOne.style.left = `${rect.left + 2}px`;
            plusOne.style.top = `${rect.top - 12}px`;

            document.body.appendChild(plusOne);

            setTimeout(() => {
                plusOne.remove();
            }, 700);

            setTimeout(() => {
                cartIcon.classList.replace('bi-cart-fill', 'bi-cart');
                cartIcon.style.color = '';
            }, 500);
        }
    });
});

const rotatingImages = document.querySelectorAll('.rotating-image');
const totalImages = 9;

setInterval(() => {
    rotatingImages.forEach(img => {
        const randomIndex = Math.floor(Math.random() * totalImages) + 1;
        img.src = `images/food_plate_${randomIndex}.avif`;
    });
}, 2000);

function addToCart(id, name, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        cart.push({ id, name, image, price, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateTotalPrice();
}

function updateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
    });

    const priceElement = document.getElementById('cart-price');
    if (priceElement) {
        priceElement.textContent = total.toFixed(2) + '€';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTotalPrice();
});
