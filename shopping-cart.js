'use strict';

let medicineInCart = document.querySelector('.medicineInCart');
let orderArr = JSON.parse(localStorage.getItem('order'));
let totalCost = document.querySelector('.totalCost');
let counter = 1;
let totalSum = 0;

if(orderArr) {
    for(let orderItem of orderArr) {
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
        price.innerHTML = 'Price: <span class="medSum">' + orderItem.medPrice.toFixed(2) + '<span> $';
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

        up.addEventListener('click', function() {
            totalSum = 0;
            totalCost.textContent = 'Total price: ';
            counter++;
            counterText.textContent = counter;
            price.innerHTML = 'Price: <span class="medSum">' + (orderItem.medPrice * counter).toFixed(2) + '<span> $';
            calculateTotalSum();
        })

        down.addEventListener('click', function() {
            totalSum = 0;
            totalCost.textContent = 'Total price: ';
            counter--;
            counterText.textContent = counter;
            price.innerHTML = 'Price: <span class="medSum">' + (orderItem.medPrice * counter).toFixed(2) + '<span> $';
            if(counter < 1) {
                orderArr.splice(orderArr.indexOf(orderItem), 1);
                localStorage.setItem('order', JSON.stringify(orderArr));
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


