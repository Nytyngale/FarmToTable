let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Banana',
        tag: 'banana',
        price: 1,
        inCart: 0
    },
    {
        name: 'Red Apple',
        tag: 'rapple',
        price: 1,
        inCart: 0
    },{
        name: 'Green Apple',
        tag: 'gapple',
        price: 1,
        inCart: 0
    },{
        name: 'Strawberry',
        tag: 'stwb',
        price: 2,
        inCart: 0
    },{
        name: 'Grapes',
        tag: 'grapes',
        price: 2,
        inCart: 0
    },{
        name: 'Green Grapes',
        tag: 'greengrapes',
        price: 2,
        inCart: 0
    },{
        name: 'Oranges',
        tag: 'orange',
        price: 1,
        inCart: 0
    },{
        name: 'Yellow peach',
        tag: 'ypeach',
        price: 2,
        inCart: 0
    },{
        name: 'White Peach',
        tag: 'wpeach',
        price: 2,
        inCart: 0
    },{
        name: 'Cherry',
        tag: 'cherry',
        price: 4,
        inCart: 0
    },{
        name: 'Lettuce',
        tag: 'lettuce',
        price: 2,
        inCart: 0
    },{
        name: 'Russet Potato',
        tag: 'russet',
        price: 1,
        inCart: 0
    },{
        name: 'Carrot',
        tag: 'carrot',
        price: 1,
        inCart: 0
    },{
        name: 'Cucumber',
        tag: 'ccmbr',
        price: 2,
        inCart: 0
    },{
        name: 'Onion',
        tag: 'onion',
        price: 1,
        inCart: 0
    },{
        name: 'Cabbage',
        tag: 'cbg',
        price: 1,
        inCart: 0
    },{
        name: 'Broccoli',
        tag: 'bcli',
        price: 2,
        inCart: 0
    },{
        name: 'Corn',
        tag: 'corn',
        price: 1,
        inCart: 0
    },{
        name: 'Tomato',
        tag: 'tomato',
        price: 2,
        inCart: 0
    },{
        name: 'Spinach',
        tag: 'spinach',
        price: 1,
        inCart: 0
    }

];


for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumber(products[i]);
        totalCost(products[i]);
    })
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumber');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumber(product) {
    let productNumbers = localStorage.getItem('cartNumber');

    productNumbers = parseInt(productNumbers);

    if(productNumbers ) {
        localStorage.setItem('cartNumber', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;    
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));

}

function totalCost(product){

    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <br>
            <ul style="list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;">
                <li style="display: inline-block; width: 200px;"><div class="product">
                    <span>${item.name}</span>
                </div></li>
                <li style="display: inline-block; margin-right: 110px;"><div class="product"><div class="price">
                    $${item.price}.00
                </div></li>
                <li style="display: inline-block; margin-right: 110px;"><div class="product"><div class="quantity">
                    <span>${item.inCart}</span>
                </div></li>
                <li style="display: inline-block; margin-right: 110px;"><div class="product"><div class = "total">
                    $${item.inCart * item.price}.00
                </div></li>
            </ul>
            `;
        });

        productContainer.innerHTML += `
            <br>
            <hr>
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle" style="margin-left:450px">
                    Cart Total
                </h4>
                <h4 class="basketTotal" style="margin-left:470px">
                    $${cartCost}.00
                </h4>
        `;

    }

}

onLoadCartNumbers();
displayCart();