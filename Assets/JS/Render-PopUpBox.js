import products from './data_product.js';
import { overlayBtn } from './render.js'

const quickShops = document.querySelectorAll('.quick-box.id')
const boxPop = document.querySelector('.overlay');
// const xClose = document.querySelector('.x-close');

function openBoxPop(element) {
    element.style.display = 'block'
}


function closeBoxPop(element) {
    element.style.display = 'none'
}

function returnProductIndexI(products, id) {
    for (let i = 0; i < 16; i++) {

        if (products[i].id == id) return products[i]
        else continue;
    }
}

// console.log(products.length)
console.log(returnProductIndexI(products, 7003102314702).title)


// Open Pop up box
for (let quickShop of quickShops) {
    quickShop.addEventListener('click', (event) => {
        event.stopPropagation();
        boxPop.innerHTML = '';
        overlayBtn(returnProductIndexI(products, event.target.classList[1]), boxPop)
        openBoxPop(boxPop);

        // Close Pop up box
        document.querySelector('.quick-shop-click').addEventListener('click', () => closeBoxPop(boxPop));
        document.querySelector('.wrapper').addEventListener('click', (event) => event.stopPropagation());
        document.querySelector('.x-close').addEventListener('click', () => closeBoxPop(boxPop));
        document.querySelector('.add-to-cart').addEventListener('click', () => closeBoxPop(boxPop));


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
    }, true);
};




