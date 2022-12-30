'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Rana Talha',
  movements: [1430, 1000, -560, 1700, 50, -90],
  interestRate: 1.6,
  pin: 5555,
};

const account6 = {
  owner: 'Muhammad Awais',
  movements: [4130, 1000, 1700, -450, 5000, 900, -300],
  interestRate: 1.1,
  pin: 6666,
};

const account7 = {
  owner: 'Muhammad Rizwan',
  movements: [2330, 3000, -700, 500, 900, 100],
  interestRate: 1.5,
  pin: 7777,
};

const account8 = {
  owner: 'Umer Shabir',
  movements: [1330, 2000, -700, 500, -900, 400, 200],
  interestRate: 1.4,
  pin: 8888,
};

const accounts = [account1, account2, account3, account4, account5, account6, account7, account8];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// ------------ && ---------------

// 7. Creating DOM Elements

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = '';


const movs = sort ? movements.slice().sort((a,b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements">
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);

    // containerMovements.insertAdjacentHTML('beforeend', html);
  });
};

// ------------ && ---------------

// 11. Computing Usernames

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

// console.log(accounts);

// ------------ && ---------------

// 12. The filter Method


// ------------ && ---------------

// 13. The reduce Method

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// const balances = movements.reduce(function(acc, cur, i, arr){
//   console.log(`Iteration${i}: ${acc}`);
//   return acc + cur
// }, 0);

// ------------ && ---------------

// 15. The Magic of Chaining Methods

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest}€`;
};

// ------------ && ---------------

// 17. The find Method

// ------------ && ---------------

// 18. Implementing Login

const updateUI = function (acc) {
  // Display movements

  displayMovement(acc.movements);

  // Display Balance

  calcDisplayBalance(acc);

  // Display Summary

  calcDisplaySummary(acc);
};

// Event handler

let currentAcount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAcount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  

  if (currentAcount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAcount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input field

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // updateUI
    updateUI(currentAcount);
  }
});


// ------------ && ---------------


// 19. Implementing Transfers


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAcount.balance >= amount &&
    receiverAcc?.username !== currentAcount.username
  ) {
    //Update the transfer
    currentAcount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // updateUI
    updateUI(currentAcount);
  }

  inputTransferTo.value = inputTransferAmount.value = '';
    // inputLoginPin.blur();
});


// ------------ && ---------------


// 20. The findIndex Method


btnClose.addEventListener('click', function(e){

  e.preventDefault();

  if(inputCloseUsername.value === currentAcount.username && Number(inputClosePin.value) === currentAcount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAcount.username)

    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
})


// ------------ && ---------------


// 21. some and every


btnLoan.addEventListener('click', function(e){

  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAcount.movements.some(mov => mov >= amount * 0.1)) {

     // ADD movements

     currentAcount.movements.push(amount);


     // Update UI 

        updateUI(currentAcount);

  }

  inputLoanAmount.value = '';
});


// 22. flat and flatMap


// ------------ && ---------------


// 23. Sorting Arrays


let sorted = false;

btnSort.addEventListener('click', function(e){

  e.preventDefault();

  displayMovement(currentAcount.movements, !sorted);
  sorted = !sorted;
})

