const cartContainer = document.querySelector('#cart-container')

// Récupérer le contenu du localStorage (key: cart)
const cart = JSON.parse(localStorage.getItem('cart')) || []
let keys = Object.keys(cart);

let quantity = 1;

for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const product = cart[key]
    const productsOrder = product._id
    // products.push(productsOrder)
    console.log(productsOrder)
}


//Fonction de supression d'un produit
function removeItem(key) {
    if (confirm('Etes-vous sûr de vouloir supprimer le produit?')) {
        // On supprime du localStorage la clé du produit
        delete cart[key]
        localStorage.setItem('cart', JSON.stringify(cart));
        keys = Object.keys(cart)
        if (keys.length === 0) {
            cartContainer.innerHTML = '<h3>Le panier est vide</h3>'
        } else {
            // On supprime visuellement la ligne du tableau
            const line = document.querySelector(`[data-key="${key}"]`)
            line.remove()
            document.querySelector(`#total`).innerHTML = getTotalCart();
        }
    }
}

function getTotalPricePerTeddy(quantity, price) {
    const goodPrice = Math.round(price) / 100;
    const totalPerTeddies = quantity * goodPrice;
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPerTeddies)
}

function computeTotals(key) {
    const product = cart[key]
    const totalPricePerTeddy = getTotalPricePerTeddy(product.quantity, product.price)
    document.querySelector(`[data-key="${key}"] td:last-child`).innerHTML = totalPricePerTeddy;
    document.querySelector(`#total`).innerHTML = getTotalCart();
}

function getTotalCart() {
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
    let newQuantity = cart[key]['quantity'] - 1
    if (newQuantity === 0) {
        removeItem(key)
    } else {
        cart[key]['quantity'] = cart[key]['quantity'] - 1
        localStorage.setItem('cart', JSON.stringify(cart));
        document.querySelector(`[data-key="${key}"] .orderQuantity`).innerHTML = cart[key]['quantity'];
        computeTotals(key)
    }
}

function addLine(key, name, choosenColor, quantity, price, imageUrl) {

    const goodPrice = Math.round(price) / 100
    const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(goodPrice)
    const totalPricePerTeddy = getTotalPricePerTeddy(quantity, price)

    return `<tr data-key="${key}">
        <td id="checkout-product-image" style="background-image:url(${imageUrl});background-size:16vh;background-repeat:no-repeat;background-position:center;"></td>
        <td>${name}</td>
        <td>${choosenColor}</td>
        <td>
        <button class="orderQuantityMinus">-</button>
        <span class="orderQuantity">${quantity}</span>
        <button class="orderQuantityPlus">+</button>
        </td>
        <td>
        <button class="remove" data-key="${key}">X</button>
        </td>
        <td>${formatPrice}</td>
        <td id="total-price" class="sum-per-teddy">${totalPricePerTeddy}</td>
    </tr>`
}


// Prévoir le cas ou le panier est vide (afficher un message)
if (keys.length === 0) {
    cartContainer.innerHTML = '<h3>Le panier est vide</h3>'
} else {
    const tbody = cartContainer.querySelector('tbody')

    // Création du DOM
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const product = cart[key]

        const tr = addLine(key, product.name, product.color, product.quantity, product.price, product.imageUrl);
        tbody.innerHTML += tr

    }

    tbody.innerHTML += `<tr>
        <td colspan="6">Total</td>
        <td id="total">${getTotalCart()}</td>
    </tr>`

    // Ajout des évènements permettant d'ajuster les quantités
    for (let i = 0; i < keys.length; i++) {
        document.querySelector(`[data-key="${keys[i]}"] .orderQuantityPlus`).addEventListener('click', () => addOne(keys[i]));
        document.querySelector(`[data-key="${keys[i]}"] .orderQuantityMinus`).addEventListener('click', () => substractOne(keys[i]));
        document.querySelector(`[data-key="${keys[i]}"] .remove`).addEventListener('click', () => removeItem(keys[i]));
    }
}


//Récupération des éléments du formulaire
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('firstName', e.target.firstName.value)
    console.log('lastName', e.target.lastName.value)
    console.log('address', e.target.address.value)
    console.log('postalcode', e.target.postalcode.value)
    console.log('city', e.target.city.value)
    console.log('email', e.target.email.value)
    console.log('message', e.target.message.value)
    const total = getTotalCart()
    const orderTeddies = {
        products : [],
        contact: {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            address: e.target.address.value,
            city: e.target.city.value,
            email: e.target.email.value,
        }
    }
    console.log(typeof orderTeddies.contact.firstName)
    console.log(typeof orderTeddies.contact.lastName)
    console.log(typeof orderTeddies.contact.address)
    console.log(typeof orderTeddies.contact.city)
    console.log(typeof orderTeddies.contact.email)
    let products = orderTeddies.products
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const product = cart[key]
        const productsOrder = product._id
        console.log(typeof productsOrder)
        products.push(productsOrder)
    }
    postOrder(orderTeddies)
        .then((resp) => {
            // Redirection vers la page de recap avec en paramètre le numéro de commande, le total, nom et prénom du contact
            console.log('Victoire')
        })
});

// Vérification de la validité des informations 
const inputs = document.querySelectorAll("input")
const textareas = document.querySelectorAll("textarea")
const checkValidity = (input) => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault()
        if (!e.target.validity.valid) {
            e.target.parentElement.classList.add('error')
        }
    })

    input.addEventListener('input', (e) => {
        if (e.target.validity.valid) {
            e.target.parentElement.classList.remove('error')
        }
    })
}

Array.from(inputs).forEach(checkValidity);
Array.from(textareas).forEach(checkValidity);
