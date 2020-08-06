const cartContainer = document.querySelector('#cart-container')

// Récupérer le contenu du localStorage (key: cart)
const cart = JSON.parse(localStorage.getItem('cart')) || []
const keys = Object.keys(cart);

console.log(cart)

let quantity = 1;

// const span = document.createElement('span');
//     span.innerHTML = quantity;

function addOne(key) {
    cart[key]['quantity'] = cart[key]['quantity'] + 1
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`[data-key="${key}"].orderQuantity`).innerHTML = cart[key]['quantity'];
}

function substractOne(key) {
    cart[key]['quantity'] = cart[key]['quantity'] - 1
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`[data-key="${key}"].orderQuantity`).innerHTML = cart[key]['quantity'];
}

function addLine(key, name, choosenColor, quantity, formatPrice) {

    let totalPerTeddies = quantity * parseFloat(formatPrice);
    let totalPricePerTeddy = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPerTeddies)

    // const TD3 = document.createElement('td');
    // const span = document.createElement('span');
    // span.setAttribute('class', 'orderQuantity')
    // span.innerHTML = quantity
    
    cartContainer.innerHTML +=
    
    `<td>${name}</td>
    <td>${choosenColor}</td>
    <td>
    <span class="orderQuantity">
    <button class="orderQuantityMinus">-</button>
    ${quantity}
    <button class="orderQuantityPlus">+</button>
    </span>
    <td>${formatPrice}</td>
    <td id="total-price">${totalPricePerTeddy}</td>`

    document.querySelector('.orderQuantityPlus').addEventListener('click', () => addOne(key));
    document.querySelector('.orderQuantityMinus').addEventListener('click', () => substractOne(key));

    // if (quantity === 0) {
    //     var element = document.querySelector('td');
    
    //     var parent = element.parentNode;
    //     parent.removeChild(element);
    
    //     console.log(quantity)
    // }
    
    const totalOfOrder = document.querySelector('#total-order');

    totalOfOrder.innerHTML +=

    `<td>${totalPricePerTeddy}</td>`

    console.log(totalPricePerTeddy)
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


