'use strict';
let content = '';
let contentShops = '';
let divShops = document.querySelector('.shops');
let divMedicins = document.querySelector('.medicins');
let itemShops = document.getElementsByClassName('itemShop');
let numberProduct = document.querySelector('.numberProduct');
let buttonCart;

let order;
let number;
if (!localStorage.getItem('order')) {
    order = [];
    number = 0;
} else {
    order = JSON.parse(localStorage.getItem('order'));
    number = localStorage.getItem('number')
}

const createItemMedicament = (parent, domElem) => {
    let itemMedicament = document.createElement('div');
    itemMedicament.classList.add('itemMedicament');
    let pictureMed = document.createElement('img');
    pictureMed.src = parent.picture;
    let nameMed = document.createElement('p');
    nameMed.textContent = parent.name;
    let priceMed = document.createElement('p');
    priceMed.textContent = Number(parent.price).toFixed(2) + ' $';
    buttonCart = document.createElement('button');
    buttonCart.textContent = 'add to Cart';
    itemMedicament.append(pictureMed);
    itemMedicament.append(nameMed);
    itemMedicament.append(priceMed);
    itemMedicament.append(buttonCart);
    domElem.append(itemMedicament);

    if (order.length > 0) {
        numberProduct.textContent = order.length;
        for (let itemOrder of order) {
            if(itemOrder.active && itemOrder.medName === nameMed.textContent) {
                buttonCart.classList.add('activeButtonCart');
            }
        }
    }
}

const buttonCartClickHandler = (button, parent, elem) => {
        button.classList.add('activeButtonCart');
        let flag = false;
        if (order.length > 0) {
            for (let itemOrder of order) {
                if(itemOrder.medName === parent.name && itemOrder.shopName === el.name) {
                    flag = true;
                    break;
                }
            } 
        }
        if(flag === false) {
            numberProduct.textContent++;
            order.push({'shopName': elem.name, 'medName': parent.name, 'medPrice': parent.price, 'picture': parent.picture, 'active': true, 'count': 1});
        }
        localStorage.setItem('order', JSON.stringify(order));
        localStorage.setItem('number', numberProduct.textContent);
}

fetch('http://medicin-shop-server/shopsSaved.php').then(responseShops => {
    return responseShops.json();
}).then(dataShops => {
    contentShops = dataShops;
    contentShops[0].activeShop = true;
    for(let i = 1; i < contentShops.length; i++) {
        contentShops[i].activeShop = false;
    }
    for (let elem of contentShops) {
        let itemShop = document.createElement('div');
        itemShop.classList.add('itemShop');
        itemShop.textContent = elem.name;
        elem.activeShop && itemShop.classList.add('activeShop');
        divShops.append(itemShop);
        for (let item of itemShops) {
            item.addEventListener('click', function() {
            for (let shop of itemShops) {
                shop.classList.remove('activeShop');
            }
                item.classList.add('activeShop');
            for (let shop of contentShops) {
                shop.activeShop = false;
                if(shop.name === this.textContent) {
                    shop.activeShop = true;
                }
            }
            divMedicins.innerHTML = '';
            })
        }
    }
    fetch('http://medicin-shop-server/contentSaved.php').then(response => {
    return response.json();
}).then(data => {
    content = data;

for (let elem of contentShops) {
    if (elem.activeShop) {
        for (let itemMedicine of content) {
            if (elem.name === itemMedicine.shop) {
                createItemMedicament(itemMedicine, divMedicins);
                buttonCart.addEventListener('click', function(event) {
                    buttonCartClickHandler(event.target, itemMedicine, elem);
                })
            
            }
        }
    } 
}
for (let elem of itemShops) {
    elem.addEventListener('click', function() {
        for (let itemMedicine of content) {
            if (elem.textContent === itemMedicine.shop) {
                createItemMedicament(itemMedicine, divMedicins);
                buttonCart.addEventListener('click', function(event) {
                    buttonCartClickHandler(event.target, itemMedicine, elem);
                })
            }
        }
    })
}
})
}).catch(error => alert('Connection error. Please try again later'));



