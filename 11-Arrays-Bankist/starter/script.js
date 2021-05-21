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

const accounts = [account1, account2, account3, account4];

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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
let arr = [21, 34, 12, 54, 32];

// array  mutator methods

// splice methods to remove element
console.log(arr.splice(-1, 1));
console.log(arr);
console.log(arr.reverse());
console.log(
  arr.forEach((value, i) => console.log(`Index ${value} and value ${value}`))
);

// reducer method should always return
console.log(
  arr.reduce((sumadorPar, currentNumber) => {
    if (currentNumber % 2 == 0) {
      return sumadorPar + currentNumber;
    }
    return sumadorPar - currentNumber;
  })
);
/* TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4] */

// calculate average human age
const calcAvgHumanAge = ages =>
  Math.trunc(
    ages
      .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
      .filter(age => age >= 18)
      .reduce((acc, age, i, arr) => acc + age / arr.length, 0)
  );

console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Empty array + fill()
const x = new Array(7);
console.log(x);
x.fill(2, 3, 6);
console.log(x);

// array from()
const y = Array.from({ length: 7 }, (current, index) => index * 6);
console.log(y);

//TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// calculate portion food
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// find dog of Sarah
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog eating to ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  } `
);

// create arrays ownersDogEatToMuch and ownersDogEatToLittle
const ownersDogEatToMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(`${ownersDogEatToMuch.join(' and ')}'s dogs  eat a lot`);

const ownersDogEatToLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(`${ownersDogEatToLittle.join(' and ')}'s dogs eat too little`);

//using some()

console.log(dogs.some(dog => dog.curFood === dog.recFood));

//  current > (recommended * 0.90) && current < (recommended * 1.10)

const recommendedPortion = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(recommendedPortion));

// using filter again
console.log(dogs.filter(recommendedPortion));

// sort it by recommended food portion in an ascending order using diference (minus)
const dogsSorted = dogs
  .slice()
  .sort((dog1, dog2) => dog1.recFood - dog2.recFood);
console.log(dogsSorted);
