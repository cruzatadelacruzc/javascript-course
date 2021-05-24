'use strict';
// create constructor object
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const guantanamero = new Person('Cesar', 1991);

// Prototype
Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this.birthYear;
};

console.log(guantanamero.calcAge());
console.log(guantanamero.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(guantanamero));
console.log(Person.prototype.isPrototypeOf(Person));

// check is Person property
console.log(guantanamero.hasOwnProperty('firstName'));
Person.prototype.species = 'Homo sapiens';
console.log(guantanamero.hasOwnProperty('species'));

// Object.prototype (top of prototype chain)
console.log(guantanamero.__proto__.__proto__);
console.log(guantanamero.__proto__.__proto__.__proto__);

// Create new Car Object
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const ferrari = new Car('FERRARI', 320);
const audi = new Car('AUDI', 330);

// create 2 methods in Car, increase speed by 10 and decrease - 5
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

ferrari.accelerate();
ferrari.accelerate();
ferrari.break();
// Create accelerate N Speed time in audi car
audi.__proto__.accelerateNSpeed = function (speed) {
  this.speed += speed;
  console.log(`${this.make} increase speed to ${this.speed} km/h`);
};

audi.accelerateNSpeed(45);

// Class as expession
const PersonCl = class {};

// Class as declaration Better option
class Animal {
  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  }

  // Methods will be added automaticly to prototype property
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }
}

const lion = new Animal('Lion', 2020);
console.log(lion);
console.log(`Lion has ${lion.calcAge()} years old`);

// Getters and Setters
console.log('==========Using literal object=============');
const account = {
  owner: 'Cesar',
  movements: [200, 150, 42, 160, 300],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(movement) {
    this.movements.push(movement);
  },
};

console.log(`Get latest movement ${account.latest}`);
account.latest = 1000;
console.log(`Set latest movement ${account.movements}`);

console.log('==========Using Class=============');
class Account {
  constructor(owner, movements) {
    this.owner = owner;
    this.movements = movements;
  }

  set owner(name) {
    name.includes(' ') ? (this.owner = name) : alert(`${name} is no fullname`);
  }

  get latestMovement() {
    return this.movements.slice(-1).pop();
  }

  set addMovements(movement) {
    this.movements.push(movement);
  }
}
const accoutnClass = new Account('Manuel', [50, 42, 160]);
console.log(`Get latest movement ${accoutnClass.latestMovement}`);
accoutnClass.addMovements = 1000;
console.log(`Set latest movement ${accoutnClass.movements}`);

const fullNameOwner = prompt(`Provide owner fullname`);
accoutnClass.owner = fullNameOwner;
accoutnClass.owner && console.log(`Welcome owner ${accoutnClass.owner}!!`);

// static method

Car.sayHello = () =>
  console.log('Hello 🌐, Iam static method in Literal Object');
Car.sayHello();
//audi.sayHello(); That is error

class Human {
  static sayHello() {
    console.log('Hello 🌐, Iam static method in Class');
  }
}
Human.sayHello();

// Object.crate
const PersonProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const ariel = Object.create(PersonProto);
console.log(ariel);
ariel.name = 'Ariel';
ariel.birthYear = 1986;
console.log(ariel.calcAge());
console.log(ariel.__proto__ === PersonProto);

const marco = Object.create(PersonProto);
marco.init('Marcos', 2014);
console.log(marco.calcAge());

// Inheritance beteenw classes: constructor function

Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this.birthYear;
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const isabella = new Student('Arlin', 2001, 'JavaScript: Zero to Expert');
console.log(`${isabella.firstName} has ${isabella.calcAge()} years old`);
isabella.introduce();

// create EV Car child of Car
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
// Linking prototypes
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.chargeBattery = chargeTo;
};
// polimorphin
EV.prototype.accelerate = function () {
  this.speed += 5;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of 89`
  );
};
const tesla = new EV('Tesla', 135, 25);
tesla.chargeBattery = 90;
console.log(tesla);
tesla.break();
tesla.accelerate();

// Inheritance ES6X

class Mammals extends Animal {
  constructor(name, birthYear, owner) {
    // Always needs to happen first(call super)
    super(name, birthYear);
    this.owner = owner;
  }

  introduce() {
    console.log(
      `I am dog ${
        this.name
      } and I have ${this.calcAge()} years old and my master is ${this.owner}`
    );
  }
}

const dog = new Mammals('Rintintín', 2018, 'Cesar');
dog.introduce();

// Inheritance Object.create
const CubanProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const OrientalProto = Object.create(CubanProto);
OrientalProto.init = function (name, birthYear, district) {
  CubanProto.init.call(this, name, birthYear);
  this.district = district;
};

OrientalProto.introduce = function () {
  console.log(
    `My name is ${this.name} of ${this.calcAge()} years old. I from ${
      this.district
    } city`
  );
};

const jueliet = Object.create(OrientalProto);
jueliet.init('Jueliet', 1986, 'Guantanamo');
jueliet.introduce();
