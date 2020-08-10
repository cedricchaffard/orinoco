const cartContainer = document.querySelector('#cart-container')

// Récupérer le contenu du localStorage (key: cart)
const cart = JSON.parse(localStorage.getItem('cart')) || []
const keys = Object.keys(cart);

let quantity = 1;

function getTotalPricePerTeddy(quantity, price){
    const goodPrice = Math.round(price) / 100;
    const totalPerTeddies = quantity * goodPrice;
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPerTeddies)
}

function computeTotals(key){
    const product = cart[key]
    const totalPricePerTeddy = getTotalPricePerTeddy(product.quantity, product.price)
    document.querySelector(`[data-key="${key}"] td:last-child`).innerHTML = totalPricePerTeddy;
    document.querySelector(`#total`).innerHTML = getTotalCart();
}

function getTotalCart(){
    let total = 0;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        total += cart[key].quantity * (cart[key].price / 100)
    }
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total)
}

function addOne(key) {
    cart[key]['quantity'] = cart[key]['quantity'] + 1
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`[data-key="${key}"] .orderQuantity`).innerHTML = cart[key]['quantity'];
    computeTotals(key)
}

function substractOne(key) {
    cart[key]['quantity'] = cart[key]['quantity'] - 1
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`[data-key="${key}"] .orderQuantity`).innerHTML = cart[key]['quantity'];
    computeTotals(key)
}

function addLine(key, name, choosenColor, quantity, price) {

    const goodPrice = Math.round(price) / 100
    const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(goodPrice)
    const totalPricePerTeddy = getTotalPricePerTeddy(quantity, price)

    return `<tr data-key="${key}">
        <td>${name}</td>
        <td>${choosenColor}</td>
        <td>
        <button class="orderQuantityMinus">-</button>
        <span class="orderQuantity">${quantity}</span>
        <button class="orderQuantityPlus">+</button>
        <td>${formatPrice}</td>
        <td id="total-price" class="sum-per-teddy">${totalPricePerTeddy}</td>
    </tr>`
}

// Prévoir le cas ou le panier est vide (afficher un message)
if (keys.length === 0) {
    cartContainer.innerHTML = '<h3>Le panier est vide</h3>'
}
else {
    const tbody = cartContainer.querySelector('tbody')

    // Création du DOM
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const product = cart[key]

        const tr = addLine(key, product.name, product.color, product.quantity, product.price);
        tbody.innerHTML += tr
    }

    tbody.innerHTML += `<tr>
        <td colspan="4">Total</td>
        <td id="total">${getTotalCart()}</td>
    </tr>`

    // Ajout des évènements permettant d'ajuster les quantités
    for (let i = 0; i < keys.length; i++){
        document.querySelector(`[data-key="${keys[i]}"] .orderQuantityPlus`).addEventListener('click', () => addOne(keys[i]));
        document.querySelector(`[data-key="${keys[i]}"] .orderQuantityMinus`).addEventListener('click', () => substractOne(keys[i]));
    }
}


