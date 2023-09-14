import products from './data_product.js';
import { overlayBtn } from './render.js'

const quickShops = document.querySelectorAll('.quick-box.id')
console.log(quickShops);
const boxPop = document.querySelector('.overlay')
const xClose = document.querySelector('.x-close');

function openBoxPop(element) {
    element.style.display = 'block'
}

function closeBoxPop(element) {
    element.style.display = 'none'
}

// Open Pop up box
for (let quickShop of quickShops) {
    quickShop.addEventListener('click', (event) => {
        let a = event.target.classList[0];
        console.log(a);

        // openBoxPop(boxPop)
    }
    )
};

// Close Pop up box
boxPop.querySelector('.quick-shop-click').addEventListener('click', () => closeBoxPop(boxPop));
boxPop.querySelector('.wrapper').addEventListener('click', (event) => event.stopPropagation());
xClose.addEventListener('click', () => closeBoxPop(boxPop));
boxPop.querySelector('.add-to-cart').addEventListener('click', () => closeBoxPop(boxPop));


// Adjust number of product
const minus = document.querySelector('.button .minus')
const plus = document.querySelector('.button .plus')
const number = document.querySelector('.button .number')

//quantity change
let a = 1;
function numPlus() {
    a++;
    a = (a < 10) ? '0' + a : a;
    number.textContent = a
}

function numMinus() {
    if (a > 1) {
        a--;
        a = (a < 10) ? '0' + a : a;
        number.textContent = a
    }
}

plus.addEventListener('click', numPlus)
minus.addEventListener('click', numMinus)


//Convert Contain fit with ID of products
quickShops.filter