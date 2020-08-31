// TEDDIES MENU CREATION - PARRALLAX LAYOUT
var teddies = getTeddies();
teddies.then(function(response) {

    const collectionName = document.querySelector('#collection-name')
    for (let product of response) {
        collectionName.innerHTML +=
            `<li>
                <a href="collection.html?id=${product._id}">${product.name}</a>
            </li>`
    }

    const main = document.querySelector('main')
    for (let product of response) {
        main.innerHTML +=
            `<div class="parrallax" style="background-image:url('${product.imageUrl}');max-width:'100%';">
            <div>
                <a id="scrolldown" class="scrolldownVisible" href="#down"></a>
            </div>
            <div class="center2" style="">
                <div class="cloud" id="nav">
                    <a href="collection.html?id=${product._id}">${product.name}</a>
                </div>
            </div>`
    }
})