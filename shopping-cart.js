'use strict';

let medicineInCart = document.querySelector('.medicineInCart');
let orderArr = JSON.parse(localStorage.getItem('order'));
let totalCost = document.querySelector('.totalCost');
let totalSum = 0; 
let form = document.querySelector('form');
let formName = document.querySelector('#formName');
let formPhone = document.querySelector('#formPhone');
let formEmail = document.querySelector('#formEmail');
let formAddress = document.querySelector('#formAddress');
let formOrder = document.querySelector('#formOrder');
let nameMessage = document.querySelector('.nameMessage');
let phoneMessage = document.querySelector('.phoneMessage');

if(orderArr) {
    for(let orderItem of orderArr) {
        //let counter = 1;
        let counter = orderItem.count;
        let medicineItem = document.createElement('div');
        medicineItem.classList.add('medicineItem');

        let medicineShop = document.createElement('p');
        medicineShop.classList.add('medicineShop');
        medicineShop.textContent = orderItem.shopName;
        medicineItem.append(medicineShop);

        let medicineName = document.createElement('p');
        medicineName.classList.add('medicineName');
        medicineName.textContent = orderItem.medName;
        medicineItem.append(medicineName);

        let price = document.createElement('span');
        price.classList.add('cartPrice');
        price.innerHTML = 'Price: <span class="medSum">' + Number(orderItem.medPrice).toFixed(2) + '<span> $';
        medicineItem.append(price);

        let medicineCount = document.createElement('div');
        medicineCount.classList.add('medicineCount');
        let counterText = document.createElement('span');
        counterText.textContent = counter;
        medicineCount.append(counterText);
        let up = document.createElement('div');
        up.classList.add('upButton');
        up.textContent = '↑';
        let down = document.createElement('div');
        down.classList.add('downButton');
        down.textContent = '↓';
        medicineCount.append(up);
        medicineCount.append(down);

        medicineItem.append(medicineCount);
        medicineInCart.append(medicineItem);

        up.addEventListener('click', function addCounter() {
            if(medicineItem.classList.contains('canceled')) {
                up.removeEventListener('click', addCounter);
                counter -= 2;
            }
            totalSum = 0;
            totalCost.textContent = 'Total price: ';
            counter++;
            counterText.textContent = counter;
            orderItem.count = counter;
            localStorage.setItem('order', JSON.stringify(orderArr));
            price.innerHTML = 'Price: <span class="medSum">' + (orderItem.medPrice * counter).toFixed(2) + '<span> $';
            calculateTotalSum();
        })

        down.addEventListener('click', function subCounter() {
            totalSum = 0;
            totalCost.textContent = 'Total price: ';
            counter--;
            counterText.textContent = counter;
            orderItem.count = counter;
            localStorage.setItem('order', JSON.stringify(orderArr));
            price.innerHTML = 'Price: <span class="medSum">' + (orderItem.medPrice * counter).toFixed(2) + '<span> $';
            if(counter <= 0) {
                counter++;
                orderArr.splice(orderArr.indexOf(orderItem), 1);
                localStorage.setItem('order', JSON.stringify(orderArr));
                medicineItem.classList.add('canceled');
                down.removeEventListener('click', subCounter);
            }
            calculateTotalSum();
        })
    }
}

function calculateTotalSum() {
    let medSums = document.getElementsByClassName('medSum');
    for(let medSum of medSums) {
        totalSum += parseFloat(medSum.textContent);
    }
    totalCost.textContent += totalSum.toFixed(2) + ' $';
}

calculateTotalSum();

form.addEventListener('submit', function(event) {
    if(!(/^[a-zA-Z]+\s[a-zA-Z]+$/.test(formName.value))) {
        event.preventDefault();
        nameMessage.textContent = 'Check Your name and surname.';
        console.log (formName.value);
    }
    else if(!(/^\+\d{10,}$/.test(formPhone.value))) {
        event.preventDefault();
        phoneMessage.textContent = 'Check Your phone number. Start with \'+\'.';
        console.log (formPhone.value);
    }
    else {
        event.preventDefault();
        formOrder.value = localStorage.getItem('order');
        form.submit();
        localStorage.clear('order');
    }
})






