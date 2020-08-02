const cartContainer = document.querySelector('#cart-container')

// Récupérer le contenu du localStorage (key: cart)
const cart = JSON.parse(localStorage.getItem('cart')) || []
const keys = Object.keys(cart);

let quantity = 1;

function addOne(key) {
    cart[key]['quantity'] = cart[key]['quantity'] + 1
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`[data-key="${key}"] .orderQuantity`).innerHTML = cart[key]['quantity'];
}

function substractOne(key) {
    cart[key]['quantity'] = cart[key]['quantity'] - 1
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`[data-key="${key}"] .orderQuantity`).innerHTML = cart[key]['quantity'];
}

function addLine(key, name, choosenColor, quantity, formatPrice) {

    const TR = document.createElement("tr");
    TR.setAttribute('data-key', key)

    const TD1 = document.createElement("td");
    const TXT1 = document.createTextNode(name);
    TD1.appendChild(TXT1);
    TR.appendChild(TD1);


    const TD2 = document.createElement("td");
    const TXT2 = document.createTextNode(choosenColor);
    TD2.appendChild(TXT2);
    TR.appendChild(TD2);

    const TD3 = document.createElement('td');
    const span = document.createElement('span');
    span.setAttribute('class', 'orderQuantity')
    span.innerHTML = quantity
    const BTN3 = document.createElement('button');
    BTN3.innerHTML = '+';

    const BTN32 = document.createElement('button');
    BTN32.innerHTML = '-';
     BTN32.setAttribute('class', 'orderQuantityMinus');

    TD3.appendChild(BTN3);
    TD3.appendChild(span);
    TD3.appendChild(BTN32);
    TR.appendChild(TD3);


    const TD4 = document.createElement('td');
    const TXT4 = document.createTextNode(formatPrice);
    TD4.appendChild(TXT4);
    TR.appendChild(TD4);

    document.getElementById('order').appendChild(TR);

    BTN3.addEventListener('click', () => addOne(key));
    BTN32.addEventListener('click', () => substractOne(key));
}

// Prévoir le cas ou le panier est vide (afficher un message)
if (keys.length === 0) {
    cartContainer.innerHTML = '<h3>Le panier est vide</h3>'
}
else {
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const product = cart[key]

        let goodPrice = Math.round(product.price) / 100;
        let formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(goodPrice)

        addLine(key, product.name, product.color, product.quantity, formatPrice);
    }
}
