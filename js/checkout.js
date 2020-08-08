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
    <td id="total-price" class="sum-per-teddy">${totalPricePerTeddy}</td>`

    document.querySelector('.orderQuantityPlus').addEventListener('click', () => addOne(key));
    document.querySelector('.orderQuantityMinus').addEventListener('click', () => substractOne(key));

    let list = document.getElementsByClassName("sum-per-teddy");
    for (var i = 0; i < list.length; i++) {
        list[i].setAttribute("id", "total-price" + i);

    }
    
}

for (let i in cart) {

    let totalPerTeddies = cart[i].quantity * parseFloat(cart[i].price) / 100;
    let totalPricePerTeddy = parseInt(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPerTeddies));

    console.log(totalPricePerTeddy)

}

let totalOfOrder = document.querySelector('#total-order');

let amountOne = document.getElementsByTagName("td");

// // let amount2 = document.querySelector('#total-price1');

// // totalOfOrder = amount1 + amount2

console.log(amountOne)

for (var i = 0; i < amountOne.length; i++) {

    console.log(amountOne);

    console.log(amountOne)
}

//     totalOfOrder = document.querySelector('#total-price') * totalPricePerTeddy

// console.log(amountOne)

// totalOfOrder.innerHTML = amountOne


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


