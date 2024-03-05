'use strict';

let shops = [
    {shopName: 'Drugs 24', 
    activeShop: true,
    assortment: [
        {medicamentName: 'Medicament11',
        price: 20.10,
        picture: 'picture.png'},

        {medicamentName: 'Medicament12',
        price: 21.55,
        picture: 'picture.png'},

        {medicamentName: 'Medicament13',
        price: 25.80,
        picture: 'picture.png'},

        {medicamentName: 'Medicament14',
        price: 28.88,
        picture: 'picture.png'},

        {medicamentName: 'Medicament15',
        price: 29.67,
        picture: 'picture.png'},

    ]}, 

    {shopName: 'Pharmacy',
    activeShop: false,
    assortment: [
        {medicamentName: 'Medicament21',
        price: 20.10,
        picture: 'picture.png'},

        {medicamentName: 'Medicament22',
        price: 21.55,
        picture: 'picture.png'},

        {medicamentName: 'Medicament23',
        price: 25.80,
        picture: 'picture.png'},

        {medicamentName: 'Medicament24',
        price: 28.88,
        picture: 'picture.png'}
    ]}, 

    {shopName: 'Pharmacy 2',
    activeShop: false,
    assortment: [
        {medicamentName: 'Medicament31',
        price: 20.10,
        picture: 'picture.png'},

        {medicamentName: 'Medicament32',
        price: 21.55,
        picture: 'picture.png'},

        {medicamentName: 'Medicament33',
        price: 25.80,
        picture: 'picture.png'}
    ]}, 

    {shopName: 'Pharmacy 3',
    activeShop: false,
    assortment: [
        {medicamentName: 'Medicament41',
        price: 20.10,
        picture: 'picture.png'},

        {medicamentName: 'Medicament42',
        price: 21.55,
        picture: 'picture.png'},

        {medicamentName: 'Medicament43',
        price: 25.80,
        picture: 'picture.png'},

        {medicamentName: 'Medicament44',
        price: 28.88,
        picture: 'picture.png'},

        {medicamentName: 'Medicament45',
        price: 29.67,
        picture: 'picture.png'},

    ]}, 

    {shopName: 'Pharmacy 4',
    activeShop: false,
    assortment: [
        {medicamentName: 'Medicament51',
        price: 20.10,
        picture: 'picture.png'},

        {medicamentName: 'Medicament52',
        price: 21.55,
        picture: 'picture.png'}
    ]}
    ];

let divShops = document.querySelector('.shops');
let divMedicins = document.querySelector('.medicins');

let order;
if(!localStorage.getItem('order')) {
    order = [];
} else {
    order = JSON.parse(localStorage.getItem('order'));
}

for(let elem of shops) {
    let itemShop = document.createElement('div');
    itemShop.classList.add('itemShop');
    itemShop.textContent = elem.shopName;
    elem.activeShop && itemShop.classList.add('activeShop');
    divShops.append(itemShop);

    if(elem.activeShop) {
        for(let itemMedicine of elem.assortment) {
            let itemMedicament = document.createElement('div');
            itemMedicament.classList.add('itemMedicament');
            let pictureMed = document.createElement('img');
            let nameMed = document.createElement('p');
            nameMed.textContent = itemMedicine.medicamentName;
            let priceMed = document.createElement('p');
            priceMed.textContent = itemMedicine.price.toFixed(2) + ' $';
            let buttonCart = document.createElement('button');
            buttonCart.textContent = 'add to Cart';
            itemMedicament.append(pictureMed);
            itemMedicament.append(nameMed);
            itemMedicament.append(priceMed);
            itemMedicament.append(buttonCart);
            divMedicins.append(itemMedicament);
            buttonCart.addEventListener('click', function() {
                let flag = false;
                if(order.length > 0) {
                    for(let itemOrder of order) {
                        if(itemOrder.medName === itemMedicine.medicamentName && itemOrder.shopName === elem.shopName) {
                            flag = true;
                            break;
                        }
                    } 
                }
                if(flag === false) {
                    order.push({'shopName': elem.shopName, 'medName': itemMedicine.medicamentName, 'medPrice': itemMedicine.price});
                }
                localStorage.setItem('order', JSON.stringify(order));
            })
        }
    } 
    let itemShops = document.getElementsByClassName('itemShop');
    itemShop.addEventListener('click', function() {
        for(let shop of itemShops) {
            shop.classList.remove('activeShop');
        }
        itemShop.classList.add('activeShop');
        for(let shop of shops) {
            shop.activeShop = false;
            if(shop.shopName === this.textContent) {
                shop.activeShop = true;
            }
        }
        divMedicins.innerHTML = '';
    if(elem.activeShop) {
        for(let itemMedicine of elem.assortment) {
            let itemMedicament = document.createElement('div');
            itemMedicament.classList.add('itemMedicament');
            let pictureMed = document.createElement('img');
            let nameMed = document.createElement('p');
            nameMed.textContent = itemMedicine.medicamentName;
            let priceMed = document.createElement('p');
            priceMed.textContent = itemMedicine.price.toFixed(2) + ' $';
            let buttonCart = document.createElement('button');
            buttonCart.textContent = 'add to Cart';
            itemMedicament.append(pictureMed);
            itemMedicament.append(nameMed);
            itemMedicament.append(priceMed);
            itemMedicament.append(buttonCart);
            divMedicins.append(itemMedicament);
            buttonCart.addEventListener('click', function() {
                let flag = false;
                if(order.length > 0) {
                    for(let itemOrder of order) {
                        if(itemOrder.medName === itemMedicine.medicamentName && itemOrder.shopName === elem.shopName) {
                            flag = true;
                            break;
                        }
                    } 
                }
                if(flag === false) {
                    order.push({'shopName': elem.shopName, 'medName': itemMedicine.medicamentName, 'medPrice': itemMedicine.price});
                }
                localStorage.setItem('order', JSON.stringify(order));
            })
        }
    } 
})
}



