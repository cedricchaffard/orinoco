const cartContainer = document.querySelector('#cart-container')

// Récupérer le contenu du localStorage (key: cart)
const cart = JSON.parse(localStorage.getItem('cart')) || []
const keys = Object.keys(cart);

console.log(cart)

let quantity = 1;

// const span = document.createElement('span');
//     span.innerHTML = quantity;

function addOne(key) {
    console.log(key)
    cart[key]['quantity'] = cart[key]['quantity'] + 1
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`[data-key="${key}"] .orderQuantity`).innerHTML = cart[key]['quantity'];
}

function substractOne(key) {
    console.log(key)
    cart[key]['quantity'] = cart[key]['quantity'] - 1
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`[data-key="${key}"] .orderQuantity`).innerHTML = cart[key]['quantity'];
}

function addLine(key, name, choosenColor, quantity, formatPrice) {

    let totalPerTeddies = quantity * parseFloat(formatPrice);
    let totalPricePerTeddy = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPerTeddies)

    const line = document.createElement('tr')
    line.setAttribute('data-key', key)

    // const TD3 = document.createElement('td');
    // const span = document.createElement('span');
    // span.setAttribute('class', 'orderQuantity')
    // span.innerHTML = quantity
    
    line.innerHTML += `<td>${name}</td>
        <td>${choosenColor}</td>
        <td>
        <span class="orderQuantity">
        <button class="orderQuantityMinus">-</button>
        ${quantity}
        <button class="orderQuantityPlus">+</button>
        </span>
        <td>${formatPrice}</td>
        <td id="total-price">${totalPricePerTeddy}</td>`

    // if (quantity === 0) {
    //     var element = document.querySelector('td');
    
    //     var parent = element.parentNode;
    //     parent.removeChild(element);
    
    //     console.log(quantity)
    // }
    
    /*const totalOfOrder = document.querySelector('#total-order');

    totalOfOrder.innerHTML +=

    `<td>${totalPricePerTeddy}</td>`*/

    return line
}



// Prévoir le cas ou le panier est vide (afficher un message)
if (keys.length === 0) {
    cartContainer.innerHTML = '<h3>Le panier est vide</h3>'
}
else {
    let cartBody = ''
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const product = cart[key]

        let goodPrice = Math.round(product.price) / 100;
        let formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(goodPrice)

        const line = addLine(key, product.name, product.color, product.quantity, formatPrice);
        cartBody += line.outerHTML

    }

    cartContainer.innerHTML = '<table>' +
        '<tbody>' + cartBody + '</tbody>' +
        '</table>'

    for (let i = 0; i < keys.length; i++) {
        document.querySelector(`[data-key="${keys[i]}"] .orderQuantityPlus`).addEventListener('click', () => addOne(keys[i]));
        document.querySelector(`[data-key="${keys[i]}"] .orderQuantityMinus`).addEventListener('click', () => substractOne(keys[i]));
    }
}


