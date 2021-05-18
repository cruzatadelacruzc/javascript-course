"use strict";
function calculateAge1(birthDate) {
  return 2030 - birthDate;
}

console.log(
  `This is the age ${calculateAge1(1991)} calculate with calculateAge1`
);

const calculateAge2 = function (birthDate) {
  return 2030 - birthDate;
};

console.log(
  `This is the age ${calculateAge2(1991)} calculate with calculateAge2`
);

const calculateAge3 = (birthDate) => 2030 - birthDate;

// Paaaarty 🎉
console.log(
  `This is the age ${calculateAge3(1991)} calculate with calculateAge3 🏆 `
);

function cutFruitPieces(fruit) {
  return fruit * 4;
}

// Create a cotel 🍹
function fruitProcessor(apple, kiwi) {
  const applePieces = cutFruitPieces(apple);
  const kiwiPieces = cutFruitPieces(kiwi);

  const juice = `🍹 with ${applePieces} pieces of 🍎  and ${kiwiPieces} pieces of 🥝 `;
  return juice;
}
console.log(fruitProcessor(4, 2));

const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(
  `Bills Array: ${bills}
Tips Array: ${tips} 
Totals Array: ${totals}`
);
const person = {
  firstName: "Cesar",
  lastName: "Cruzata",
  birthYear: 1991,
  job: "developer",
  friends: ["Maceo", "Michel", "Maximo", "Alexei"],
  calcAge: function () {
    this.age = new Date().getFullYear() - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} ${this.lastName} is a ${this.calcAge()} old ${
      this.job
    } borned at ${this.birthYear} with friends as ${this.friends} 🇨🇺 `;
  },
};
const interestedIn = prompt(
  "What do you to known about Cesar? Choosen between: firstName, lastName, location, birthYear, age, job, email, friends or summary"
);

person.location = "Cuba";
person["email"] = "cruzatadelacruzc@gmail.com";

let message = `Cesar info about ${interestedIn}: `;
if (interestedIn === "age") {
  console.log(message + person.calcAge());
} else if (interestedIn === "summary") {
  console.log(message + person.getSummary());
} else if (person[interestedIn]) {
  console.log(message + person[interestedIn]);
} else {
  console.log(
    "Wrong request, try again! Choosen between: Choosen between: firstName, lastName, location, birthYear, age, job, email, friends or summary"
  );
}

// property age is available in this at this point
if (person.age) console.log(person.age);

console.log('-----Using Special Keyword "continue" inside loop-------');
const array = ["Cesar", 1991, true, "Cruzata", person];
for (let i = 0; i < array.length; i++) {
  if (typeof array[i] === "string") continue;
  console.log(array[i], typeof array[i]);
}

console.log('-----Using Special Keyword "break" inside loop-------');
for (let i = 0; i < array.length; i++) {
  if (typeof array[i] === "number") break;
  console.log(array[i], typeof array[i]);
}
