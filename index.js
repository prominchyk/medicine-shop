'use strict';
let content = '';
let contentShops = '';
let divShops = document.querySelector('.shops');
let divMedicins = document.querySelector('.medicins');
let itemShops = document.getElementsByClassName('itemShop');

let order;
if(!localStorage.getItem('order')) {
    order = [];
} else {
    order = JSON.parse(localStorage.getItem('order'));
}

fetch('http://medicin-shop-server/shopsSaved.php').then(responseShops => {
    return responseShops.json();
}).then(dataShops => {
    contentShops = dataShops;
    contentShops[0].activeShop = true;
    for(let i = 1; i < contentShops.length; i++) {
        contentShops[i].activeShop = false;
    }
    for(let elem of contentShops) {
        let itemShop = document.createElement('div');
        itemShop.classList.add('itemShop');
        itemShop.textContent = elem.name;
        elem.activeShop && itemShop.classList.add('activeShop');
        divShops.append(itemShop);
        for(let item of itemShops) {
            item.addEventListener('click', function() {
            for(let shop of itemShops) {
                shop.classList.remove('activeShop');
            }
                item.classList.add('activeShop');
            for(let shop of contentShops) {
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

for(let elem of contentShops) {
    if(elem.activeShop) {
        for(let itemMedicine of content) {
            if(elem.name === itemMedicine.shop) {
            let itemMedicament = document.createElement('div');
            itemMedicament.classList.add('itemMedicament');
            let pictureMed = document.createElement('img');
            pictureMed.src = itemMedicine.picture;
            let nameMed = document.createElement('p');
            nameMed.textContent = itemMedicine.name;
            let priceMed = document.createElement('p');
            priceMed.textContent = Number(itemMedicine.price).toFixed(2) + ' $';
            let buttonCart = document.createElement('button');
            buttonCart.textContent = 'add to Cart';
            itemMedicament.append(pictureMed);
            itemMedicament.append(nameMed);
            itemMedicament.append(priceMed);
            itemMedicament.append(buttonCart);
            divMedicins.append(itemMedicament);
            if(order.length > 0) {
                for(let itemOrder of order) {
                    if(itemOrder.active && itemOrder.medName === nameMed.textContent) {
                        buttonCart.classList.add('activeButtonCart');
                    }
                }
            }
            buttonCart.addEventListener('click', function() {
                this.classList.add('activeButtonCart');
                let flag = false;
                if(order.length > 0) {
                    for(let itemOrder of order) {
                        if(itemOrder.medName === itemMedicine.name && itemOrder.shopName === elem.name) {
                            flag = true;
                            break;
                        }
                    } 
                }
                if(flag === false) {
                    order.push({'shopName': elem.name, 'medName': itemMedicine.name, 'medPrice': itemMedicine.price, 'picture': itemMedicine.picture, 'active': true, 'count': 1});
                }
                localStorage.setItem('order', JSON.stringify(order));
            })
        }
    }
    } 
}
for(let elem of itemShops) {
    elem.addEventListener('click', function() {
        for(let itemMedicine of content) {
            if(elem.textContent === itemMedicine.shop) {
            let itemMedicament = document.createElement('div');
            itemMedicament.classList.add('itemMedicament');
            let pictureMed = document.createElement('img');
            pictureMed.src = itemMedicine.picture;
            let nameMed = document.createElement('p');
            nameMed.textContent = itemMedicine.name;
            let priceMed = document.createElement('p');
            priceMed.textContent = Number(itemMedicine.price).toFixed(2) + ' $';
            let buttonCart = document.createElement('button');
            buttonCart.textContent = 'add to Cart';
            itemMedicament.append(pictureMed);
            itemMedicament.append(nameMed);
            itemMedicament.append(priceMed);
            itemMedicament.append(buttonCart);
            divMedicins.append(itemMedicament);
            if(order.length > 0) {
                for(let itemOrder of order) {
                    if(itemOrder.active && itemOrder.medName === nameMed.textContent) {
                        buttonCart.classList.add('activeButtonCart');
                    }
                }
            }
            buttonCart.addEventListener('click', function() {
                this.classList.add('activeButtonCart');
                let flag = false;
                if(order.length > 0) {
                    for(let itemOrder of order) {
                        if(itemOrder.medName === itemMedicine.name && itemOrder.shopName === elem.textContent) {
                            flag = true;
                            break;
                        }
                    } 
                }
                if(flag === false) {
                    order.push({'shopName': elem.textContent, 'medName': itemMedicine.name, 'medPrice': itemMedicine.price, 'picture': itemMedicine.picture, 'active': true, 'count': 1});
                }
                localStorage.setItem('order', JSON.stringify(order));
            })
        }
        }
    })
}
})
});



