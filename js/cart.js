function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalElem = document.getElementById('cart-total');
    const totalNetElem = document.getElementById('cart-total-net');
    const totalPVNElem = document.getElementById('cart-total-pvn');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<h3 class="text-center">Your cart is empty</h3>`;
        checkoutBtn.disabled = true;
        totalElem.textContent = '€0.00';
        if (totalNetElem) totalNetElem.textContent = '€0.00';
        if (totalPVNElem) totalPVNElem.textContent = '€0.00';
        return;
    }

    cart.forEach(({ id, name, image, price, qty }) => {
        const subtotal = price * qty;
        total += subtotal;

        const div = document.createElement('div');
        div.classList.add('row', 'align-items-center', 'py-2', 'mx-0', 'cart-item');
        div.innerHTML = `
            <div class="col-6 d-flex align-items-center">
                <img src="images/${image}" class="rounded-circle me-3 hover-image" height="50px" alt="Food Plate">
                ${name}
            </div>
            <div class="col text-center">${price.toFixed(2)}€</div>
            <div class="col d-flex justify-content-center">
                <input type="number" min="1" value="${qty}" class="form-control qty-input" data-id="${id}" style="width: 80px;">
            </div>
            <div class="col text-center">${subtotal.toFixed(2)}€</div>
            <div class="col text-center">
                <button class="btn btn-sm btn-danger remove-btn" data-id="${id}" title="Remove item">&times;</button>
            </div>
        `;
        cartItems.appendChild(div);
    });

    const totalNet = total / 1.21;
    const totalPVN = total - totalNet;

    totalElem.textContent = `€${total.toFixed(2)}`;
    if (totalNetElem) totalNetElem.textContent = `€${totalNet.toFixed(2)}`;
    if (totalPVNElem) totalPVNElem.textContent = `€${totalPVN.toFixed(2)}`;

    checkoutBtn.disabled = false;

    attachEvents();
}

function attachEvents() {
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', e => {
            let newQty = parseInt(e.target.value);
            if (isNaN(newQty) || newQty < 1) {
                newQty = 1;
                e.target.value = 1;
            }
            const id = e.target.dataset.id;
            updateQty(id, newQty);
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.target.dataset.id;
            removeItem(id);
        });
    });
}

function updateQty(id, qty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = qty;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.addEventListener('DOMContentLoaded', renderCart);