'use strict';

/* function calcAge(birthYear) {
  const age = 2037 - birthYear;
  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = 'Manuel'; // will print (Manuel) because, is belong current scope and (Cesar) is located parent scope
      const str = `Oh, you are a millinial, ${firstName}`;
      console.log(str);
    }
    //  console.log(str); -> throw ReferenceError because is availabe only inside (if) statement
  }
  printAge();
  return age;
}

const firstName = 'Cesar';
calcAge(1991);
// printAge(); -> throw ReferenceError because is outer calcAge's scope

// Example hoisting
if (!numberProduct) {
  // allway return undefined
  deleteShoppinCart();
}

var numberProduct = 10;

function deleteShoppinCart(params) {
  console.log(arguments);
  console.log('All products deleted!');
}
deleteShoppinCart('prpr');

const person = {
  name: 'Cesar',
  birthYear: 1991,
  clacAge: function (year) {
    console.log(`Cesar has ${year - this.birthYear} years old`);
    const isMillenial = () => {
      console.log(
        `Him is millenial ${
          this.year >= 1981 && this.year <= 1996 ? 'SI' : 'NO'
        }`
      );
    };
    isMillenial();
  },
};

person.clacAge(2021); */

const cesar = {
  name: 'Cesar',
  age: 29,
  family: ['🧗', '🙍'],
};

const marriedCesar = cesar;
marriedCesar.age = 30;
// Not work
console.log(`Before marriage:`, cesar);
console.log(`After marriage:`, marriedCesar);

// Coping Objects
//const cesarCopy = Object.assign({}, cesar);
const cesarCopy = { ...cesar }; // using spraid operator
cesarCopy.age = 40;
cesarCopy.family.push('⛹');
// it is works
console.log(`Before marriage:`, cesar);
console.log(`After marriage copy:`, cesarCopy);
