let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Apple 2020 MacBook Air Laptop',
        image: '1.jpg',
        price: 81990
    },
    {
        id: 2,
        name: 'Apple 2022 MacBook Air Laptop',
        image: '2.jpg',
        price: 106990
    },
    {
        id: 3,
        name: 'Apple 2023 MacBook Pro Laptop',
        image: '3.jpg',
        price: 322490
    },
    {
        id: 4,
        name: 'Apple 2023 MacBook Air Laptop',
        image: '4.jpg',
        price: 154900
    },
    {
        id: 5,
        name: 'Apple 2022 Mac Studio',
        image: '5.jpg',
        price: 389900
    },
    {
        id: 6,
        name: 'ASUS Vivobook Pro 15',
        image: '6.jpg',
        price: 63990
    },
    {
        id: 7,
        name: 'Dell G15 5520 Gaming Laptop',
        image: '7.jpg',
        price: 120000
    },
    {
        id: 8,
        name: 'Dell New 14"',
        image: '8.jpg',
        price: 33990
    },
    {
        id: 9,
        name: 'Lenovo IdeaPad Gaming 3',
        image: '9.jpg',
        price: 53990
    }

];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">Rs. ${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCart(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
