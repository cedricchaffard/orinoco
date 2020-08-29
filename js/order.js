// ORDER SUMMARY LAYOUT
var url = new URL(window.location.href);
var params = new URLSearchParams(url.search);

// DATAS REQUIRED
const orderId = params.get('orderId')
const firstName = params.get('firstName')
const lastName = params.get('lastName')
const total = params.get('total')

// DOM CREATION
const $order = document.querySelector('#order')
$order.innerHTML = `<p style="color: black;">
    Merci ${firstName} ${lastName} pour votre commande n°${orderId} d'un montant de ${total}
</p>`