import products from './data_product.js';

function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

function getSalePrice(pro) {
    if (pro.sale) {
        return `
        <div class="price">
            <span class="primary-price line-through">${formatCurrency(pro.price)}</span>
            <span class="sale-price">${formatCurrency(pro.price * ((100 - pro.sale) / 100))}</span>
            <span class="sale-price-save">${formatCurrency(pro.price * (pro.sale / 100))}</span>
        </div>`
    } else {
        return `
        <div class="price">
            <span class="primary-price">${formatCurrency(pro.price)}</span>
        </div>`
    }
}
function getSalePrice2(pro) {
    if (pro.sale) {
        return `
        <div class="price">
            <span class="primary-price line-through">${formatCurrency(pro.price)}</span>
            <span class="sale-price">${formatCurrency(pro.price * ((100 - pro.sale) / 100))}</span>
        </div>`
    } else {
        return `
        <div class="price">
            <span class="primary-price">${formatCurrency(pro.price)}</span>
        </div>`
    }
}


function isNewSale(pro) {
    if (pro.isNew) {
        return `<span class="new">NEW</span>`
    } if (pro.sale) {
        return `<span class="sale">-${pro.sale}%</span>`
    } else {
        return ``;
    }
}

function isSize(pro, parent) {
    if (pro.size) {
        const size = document.createElement('div');
        size.className = 'size';
        const sizeP = document.createElement('p');
        sizeP.innerHTML = `SIZE: XL`
        const sizeRow = document.createElement('div');
        sizeRow.className = 'grid--row';

        function isSizeLabelClick(pro, parent) {
            let i = 0;
            for (var label of pro.size) {
                const column = document.createElement('div');
                column.className = 'col l-2 m-2 c-2';
                column.innerHTML = `<input type="radio" name="${pro.id}-size" id="${pro.id}_size_${i}">`;
                const labelList = document.createElement('label');
                labelList.htmlFor = `${pro.id}_size_${i}`;
                const labelClick = document.createElement('div');
                labelClick.className = 'border';
                labelClick.innerHTML = label;

                parent.appendChild(column);
                column.appendChild(labelList);
                labelList.appendChild(labelClick);
                i++;
            }

        }

        parent.appendChild(size);
        size.append(sizeP, sizeRow);
        isSizeLabelClick(pro, sizeRow)
    } else {
        return ``;
    }
}


function quantity(parent) {
    const button = document.createElement('div')
    button.className = 'button'
    const minus = document.createElement('span')
    minus.className = 'minus hover'
    const number = document.createElement('span')
    number.className = 'number'
    const plus = document.createElement('span')
    plus.className = 'plus hover'


    minus.textContent = '-'
    number.textContent = '01'
    plus.textContent = '+'

    parent.appendChild(button)
    button.append(minus, number, plus)
}

function overlayBtn(products, parent) {
    //overlay button
    const quickShopClick = document.createElement('div')
    quickShopClick.className = 'quick-shop-click'
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    const closeX = document.createElement('div')
    closeX.className = 'x-close'
    const colorSize = document.createElement('div')
    colorSize.className = 'color-size'
    const addToCart = document.createElement('div')
    addToCart.className = 'add-to-cart'
    addToCart.textContent = 'ADD TO CART'

    //overlay button__nested
    parent.appendChild(quickShopClick)
    quickShopClick.appendChild(wrapper)

    //overlay button __content
    closeX.textContent = 'X'
    wrapper.innerHTML += `
    <span class="title">${products.title}</span>
    ${getSalePrice(products)}`

    isSize(products, colorSize);
    quantity(wrapper);

    wrapper.append(closeX, colorSize, addToCart)
}


function renderList(products, position) {
    const elProducts = position
    elProducts.innerHTML = '';
    let i = 0;
    for (; i < 8; i++) {
        //create Element
        const card = document.createElement('div');
        card.className = 'card col l-3 m-4 c-6'
        const imgProduct = document.createElement('div');
        imgProduct.className = 'img-product';

        //quickShop Popup
        const quickBox = document.createElement('div');
        quickBox.className = `quick-box id ${products[i].id}`;
        const quickView = document.createElement('div');
        quickView.className = `quick-view ${products[i].id}`;
        const quickShop = document.createElement('div');
        quickShop.className = `quick-shop ${products[i].id}`;

        //Create Element __ content
        imgProduct.innerHTML = `
        <img src="https://${products[i].thumbnails[0]}" alt="" class="primary-img">
        <img src="https://${products[i].thumbnails[1]}" alt="" class="hide-img">
        <div class="sale-new">
            ${isNewSale(products[i])}
        </div>`
        //QuickShop Popup__content
        quickView.innerHTML = `
        <span class="quick">Quick View</span>
        <span class="hide-icon"><i class="fa-regular ${products[i].id} fa-eye"></i></span>`
        quickShop.innerHTML = ` <span class="quick">Quick Shop</span>
        <span class="hide-icon"><i class="fa-regular ${products[i].id} fa-eye"></i></span>`


        //Create Element __ nested
        elProducts.appendChild(card); // append card to the HTML
        card.appendChild(imgProduct);// append img product to the card
        //QuickShop Popup__nested
        imgProduct.appendChild(quickBox);
        quickBox.append(quickView, quickShop);

        //card description
        const cardDesc = document.createElement('div');
        cardDesc.className = 'card-desc';
        card.appendChild(cardDesc);
        cardDesc.innerHTML = `
                    <div class="card-desc">
                          <span class="title hover">${products[i].title}</span>
                          ${getSalePrice2(products[i])}
                    </div>`
    }
    i = 0;
}

const section2ListProduct = document.querySelector('.sec-2 .list-card.grid--row')
const section4ListProduct = document.querySelector('.sec-4 .list-card.grid--row')

renderList(products, section2ListProduct)
renderList(products, section4ListProduct)

export { overlayBtn }
