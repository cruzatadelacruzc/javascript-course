'use strict';

// default parameter value
const bookings = [];
const creatingBooking = function (
  fligthNum,
  numPasseger = 1,
  price = Math.trunc(189 * numPasseger)
) {
  const booking = {
    fligthNum,
    numPasseger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
creatingBooking('BHL12');
creatingBooking('BHL12', 3);
creatingBooking('BHL12', 3, 150);
creatingBooking('BHL12', undefined, 800);

// reference parameter
const flight = 'BHL12';
const cesar = {
  name: 'Cesar Cruzata',
  passport: 8762345123,
};

/* const checkIn = (fligthNum, passeger) => {
  fligthNum = 'LKOI7';
  passeger.name = 'Mr.' + passeger.name;
  if (passeger.passport == 8762345123) alert('Ckeck in 🖖');
  else alert('Wrong passport 🖐');
};

checkIn(flight, cesar);
console.log(flight);
console.log(cesar); */

// Hig-Order function
const oneWord = str => str.replace(/ /g, '').toLowerCase();

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = (str, fn) => {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Name function: ${fn.name}`);
};

transformer('cesar is my name', upperFirstWord);
transformer('Cesar Is My Name', oneWord);

// Function returns other function
const gree = greeting => name => console.log(`${greeting} ${name}`);

const greetingHey = gree('Hey');

greetingHey('Cesar');
gree('Cesar')('Hey');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(fligthNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} fligth ${this.iataCode}${fligthNum}`
    );
    this.bookings.push(`fligth ${this.iataCode}${fligthNum}`);
  },
};
lufthansa.book(43, 'Cesar');

// Using call method
const caribeanwings = {
  airline: 'caribeanwings',
  iataCode: 'CW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work because, this keyword is Null
// book1(23, 'Rafaela Moreno')

// first argument shoul be parameter for set this keyword.
book.call(caribeanwings, 23, 'Rafaela Moreno');
console.log(caribeanwings);

// Using apply method, no longer using, instead using call method

const fligthData = [34, 'Jueliet De la Cruz'];
book.apply(caribeanwings, fligthData);
console.log(caribeanwings);

// better code
book.call(caribeanwings, ...[43, 'Jueliet De la Cruz']);

// Using bind method
const bookLH = book.bind(lufthansa);
const bookCW = book.bind(caribeanwings);
bookLH(11, 'Robert Ge');
bookCW(12, 'Pepe Prats');
console.log(caribeanwings);

// Example with Event Listener
caribeanwings.planes = 11;
caribeanwings.buyPlanes = function () {
  console.log(this);
  caribeanwings.planes++;
  console.log(caribeanwings.planes);
};

// It is not work because, this keyword is button element
/* document
  .querySelector('.buy')
  .addEventListener('click', caribeanwings.buyPlanes); */

// It's work because bind this keyword
document
  .querySelector('.buy')
  .addEventListener('click', caribeanwings.buyPlanes.bind(caribeanwings));

// Example with bind and present value
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// addVAT = value => value + value * 0.23
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));
console.log(addVAT(23));

// Another way for get the same result using bind
const addTaxRate = function (rate) {
  return value => value + value * rate;
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addTaxRate(0.23)(23));

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const option = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    typeof option === 'number' &&
      option >= 0 &&
      option <= 3 &&
      this.answers[option]++;
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'string') {
      console.log(`Poll results are: ${this.answers.join(',')}`);
    } else if (type === 'array') {
      console.log(this.answers);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//TEST DATA 1: [5, 2, 3]
//TEST DATA 2: [1, 5, 3, 9, 6, 1]

// We need new "this" keyword so we should use "call" method
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
