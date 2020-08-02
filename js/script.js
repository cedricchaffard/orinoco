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

document.addEventListener('DOMContentLoaded', function() {
    window.onscroll = function (ev) {
        const scrollDown = document.getElementById('scrolldown')
        if (scrollDown) {
            scrollDown.className = (window.pageYOffset < 20) ? "scrolldownVisible" : "scrolldownInvisible";
        }

        const down = document.getElementById('down')
        if(down){
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

showTeddies.onmouseover = function() {
        document.querySelector('#collection ul').style.display = 'block';
};
showTeddies.onmouseout = function() {
        document.querySelector('#collection ul').style.display = 'none';
};

function asideswipe()   {
    var listName = document.querySelector('#collection ul'),
    display = getComputedStyle(listName, null).display;
     
    if(display == "block")  {
        document.querySelector("#collection ul").style.display = "none";
    }else   {
        document.querySelector("#collection ul").style.display = "block";
    }
} 

const menuColor = document.querySelector('#account');
const cartColor = document.querySelector('#cart');
const userColor = document.querySelector('#user');
window.addEventListener('scroll', () => {
    if(window.pageYOffset > 400) {
        menuColor.style.color = 'black';
        cartColor.style.color = 'black';
        userColor.style.color = 'black';
    }else{
        menuColor.style.color = 'white';
        cartColor.style.color = 'white';
        userColor.style.color = 'white';
    }
});
