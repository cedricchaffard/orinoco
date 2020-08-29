// MENU BURGER RESPONSIVE VERSION
const burger = document.querySelector('.burger');
const cercle = document.querySelector('.cercle');
const menu = document.querySelector('.menug');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});

cercle.addEventListener('click', () => {
    cercle.classList.toggle('active');

});

//SCROLL DOWN / SCROLL TO TOP FUNCTIONS
document.addEventListener('DOMContentLoaded', function() {
    window.onscroll = function(ev) {
        const scrollDown = document.getElementById('scrolldown')
        if (scrollDown) {
            scrollDown.className = (window.pageYOffset < 20) ? "scrolldownVisible" : "scrolldownInvisible";
        }

        const down = document.getElementById('down')
        if (down) {
            down.className = (window.pageYOffset < 18) ? "textVisible" : "textInvisible";
        }


        const scrollTop = document.getElementById('scrolltotop')
        if (scrollTop) {
            scrollTop.className = (window.pageYOffset > 100) ? "scrolltotopVisible" : "scrolltotopInvisible";
        }
    }
});

//MENU BURGER TEDDIES

const showTeddies = document.querySelector('#collection');

showTeddies.onclick = function() {
    document.querySelector('#collection ul').style.display = 'block';
};

// showTeddies.onmouseout = function() {
//         document.querySelector('#collection ul').style.display = 'none';
// };

// MENU TEDDIES
function asideswipe() {
    var listName = document.querySelector('#collection ul'),
        display = getComputedStyle(listName, null).display;

    if (display == "block") {
        document.querySelector("#collection ul").style.display = "none";
    } else {
        document.querySelector("#collection ul").style.display = "block";
    }
}

//CART LINK COLOR CHANGE FOLLOWING THE SCROLL
const cartColor = document.querySelector('#cart');
const myCartColor = document.querySelector('#my-cart');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 350) {
        cartColor.style.color = 'black';
        myCartColor.style.color = 'black';
    } else {
        cartColor.style.color = 'white';
        myCartColor.style.color = 'white';
    }
});