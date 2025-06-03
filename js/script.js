document.querySelectorAll('.bi-heart, .bi-heart-fill').forEach(heart => {
    heart.addEventListener('click', () => {
        if (heart.classList.contains('bi-heart')) {
            heart.classList.replace('bi-heart', 'bi-heart-fill');
            heart.style.color = 'red';
        } else {
            heart.classList.replace('bi-heart-fill', 'bi-heart');
            heart.style.color = '';
        }
    });
});

document.querySelectorAll('.bi-cart, .bi-cart-fill').forEach(cartIcon => {
    cartIcon.addEventListener('click', () => {
        if (cartIcon.classList.contains('bi-cart')) {
            cartIcon.classList.replace('bi-cart', 'bi-cart-fill');
            cartIcon.style.color = '#0d6efd';

            setTimeout(() => {
                cartIcon.classList.replace('bi-cart-fill', 'bi-cart');
                cartIcon.style.color = '';
            }, 500);
        }
    });
});

const image = document.getElementById('rotating-image');
const totalImages = 7;
let currentIndex = 1;

setInterval(() => {
    currentIndex++;
    if (currentIndex > totalImages) currentIndex = 1;
    image.src = `images/food_plate_${currentIndex}.png`;
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
