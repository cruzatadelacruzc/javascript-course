'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  // New sintaxt in ES6 to writte function without keyword function
  order(startIndex, mainIdex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIdex]];
  },
  // Quick Desctructuring and default value
  orderDelivery({ startIndex = 2, mainIndex = 2, time = '20:00', address }) {
    console.log(
      `Order recived! ${this.starterMenu[startIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
//=============Destructuring Array===========
const arr = [5, 9, 8];
const [x, y, z] = arr;
console.log(x, y, z);
// get first and second value
const [cat1, cat2] = restaurant.categories;
console.log(cat1, cat2);
// get first and third value
const [cate1, , cate3] = restaurant.categories;
console.log(cate1, cate3);
// switch value
const [main, secondary] = [cate3, cate1];
console.log(main, secondary);
//recive 2 return values from a function
const [startOrder, mainOrder] = restaurant.order(2, 0);
console.log(startOrder, mainOrder);

const nested = [1, 4, 9, [4, 3]];
const [i, , j, [k, l]] = nested;
console.log(nested);
console.log(i, j, k, l);

// define default value if not exists
const arr2 = [5, 6];
const [p = 2, q = 4, r = 11] = arr2;
console.log(arr2);
console.log(p, q, `r with default value ${r}`);

//============Desctructuring Objects==========
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// using custom variable
const {
  name: restaurentName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurentName, hours, tags);

// using default value
const { menu = [], starterMenu: starter = [] } = restaurant;
console.log(`menu with default empty [] ${menu}`, starter);

// Mutating variables
let a = 234;
let b = 564;
const obj = { a: 5, b: 3, v: 9 };
({ a, b } = obj); // throw error {a,v} = obj
console.log(a, b);

//Nested Object
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(`Time to open ${o} and close ${c}`);

// Quick Desctructuring
restaurant.orderDelivery({
  mainIndex: 2,
  startIndex: 1,
  time: '23:45',
  address: '6 Oeste e/ 16 y 17 Norte',
});

// Using quick desctructuring and Default value
restaurant.orderDelivery({ address: 'Wall Street and 5th Avenue' });

//=============== Spread operator===============
const array = [3, 4, 5];
const oldArr = [1, 2, array[0], array[1], array[2]]; // old way to do
console.log(`using old way ${oldArr}`);
const newArr = [1, 2, ...array];
console.log(`using spread operator ${newArr}`);

// pass or print individual value of the array using spread operator
console.log(...newArr);

// creating new array
const newMenu = [...restaurant.mainMenu, 'Qimbombó'];
console.log(newMenu);

// Copy array
const copyArr = [...restaurant.mainMenu];
console.log(copyArr);

// Join 2 array
const menus = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menus);

// Iterables: array, map, set, string but NO Object
const myName = 'Cesar';
console.log(...myName.toUpperCase());

// real-world example
/* const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('ingredient 2?'),
  prompt('ingredient 3?'),
]; 

restaurant.orderPasta(...ingredients); */

// create a new object
const newRestaurant = { founded: 2025, ...restaurant, owner: 'Cesar' };
console.log(`My new Restaurant: `, newRestaurant);

// copy and modify object
const copyRestaurant = { ...restaurant };
copyRestaurant.name = 'La 💯🔥';
console.log(`Old restaurant name ${restaurant.name}`);
console.log(`New restaurant name ${copyRestaurant.name}`);

//===================REST Pattern===============
// SPREAD, because on RIGTH side
const [d, e] = [1, 2, ...[3, 4]];

//REST, because on LEFT side
const [f, g, ...others] = [1, 2, 3, 4, 5];
console.log(f, g, 'This is rest: ' + others);

// Object
const { sat, ...weekdays } = restaurant.openingHours;
console.log('This is rest weekdays without (Sat): ', weekdays);

// Function
const add = function (...restNumber) {
  console.log(restNumber);
};

add(1, 2);
add(1, 2, 3);
add(1, 2, 3, 4);

// Spread operator opposit a Rest pattern
const h = [23, 4, 21];
add(...h);

restaurant.orderPizza('mushroom', 'onion', 'olives', 'spinach');

//===============OR operator==========
// is assingned 10 because numGests is null (false)
const gests = restaurant.numGests || 10;
console.log(`Using OR Operator and print value: ${gests}`);

//restaurant.numGests = 0;
// is assingned 0 because numGests is defined (true)
const gests1 = restaurant.numGests && 10 && null;
console.log(`Using AND Operator and print value: ${gests1}`);

// Nullish: null and undefined (NOT 0 or ' ')
const gestCorrect = restaurant.numGests ?? 10;
console.log(`Using Nullish value: ${gestCorrect}`);

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Create 2 array with team's players
const [teamBayer, teamDortmund] = game.players;
console.log(`Team of Bayern's players: ${teamBayer}`);
console.log(`Team of Dortmund's players: ${teamDortmund}`);

// Extract the GK and rest of the players
const [gkBayer, ...restBayerTeam] = teamBayer;
console.log(
  `GolKeeper of team Bayer is ${gkBayer} and rest of the team: ${restBayerTeam}`
);

const [gkDortmund, ...restDortmundTeam] = teamDortmund;
console.log(
  `GolKeeper of team Dortmund is ${gkDortmund} and rest of the team: ${restDortmundTeam}`
);

// Put all players in the same team
const allPlayers = [...teamBayer, ...teamDortmund];
console.log(`All players of both teams ${allPlayers}`);

// Put team Dortmund and 3 players of team Bayer
const playersPlus3 = [...teamDortmund, 'Kimmich', 'Coman', 'Muller'];
console.log(`All team Dortmund and 3 players of team Bayer: ${playersPlus3}`);

// Create odds of the teams and draw
const {
  odds: { team1: team1Odd, x: drawOdd, team2: team2Odd },
} = game;
console.log(
  `Odd of team1: ${team1Odd}, odd of team2: ${team2Odd} and odd of draw ${drawOdd}`
);

// Print players and goals that were scored in total
const printGoals = (...players) =>
  console.log(`${players.length} goals were scored`);

printGoals(...game.scored);

// Print which team is more likely to win
const teamToWin = function ({ team1: team1Odd, team2: team2Odd }) {
  team1Odd > team2Odd &&
    console.log(`Team with odd ${team1Odd} to win is team 1`);
  team1Odd < team2Odd &&
    console.log(`Team with odd ${team2Odd} to win is team 2`);
};

teamToWin(game.odds);

// LOOP Array
const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// one entry [index, element]
for (const [i, item] of fullMenu.entries()) {
  console.log(`${i}: ${item}`);
}

// ==================Optional Chaining===============
// restaurant.openingHours.mon trhow error but using (?) not throw error

// property object
console.log(`Restaurant opening hours at ${restaurant.openingHours.mon?.open}`);

// array
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? '-24';
  console.log(`On ${day}, we open at ${open}`);
}

// method
console.log(restaurant.orderRisotto?.(1, 3) ?? 'Method does not exists');

//==================LOOP over Object=================

// Properties name
const properties = Object.keys(restaurant.openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(restaurant.openingHours)) {
  openStr += `${day},`;
}
console.log(openStr);

// Properties values
for (const { open, close } of Object.values(restaurant.openingHours)) {
  console.log(`We open at ${open} and close at ${close}`);
}

for (const [key, { open, close }] of Object.entries(restaurant.openingHours)) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//==============Sets================
const orderArr = ['Risotto', 'Pasta', 'Chees', 'Pasta', 'Risotto'];
const orderSet = new Set(orderArr);
console.log(orderSet);

const stuffUnique = [...orderSet];
console.log(stuffUnique);

console.log(new Set('Cesar'));
console.log(orderSet.size);
console.log(`We have Pasta ${orderSet.has('Pasta')}`);
console.log(`Deleting Pasta of the order`, orderSet.delete('Chees'), orderSet);

//============Map================
const map = new Map();
map
  .set('name', 'Classico Italiano')
  .set(2, 'CapoCannoiere')
  .set('open', 13)
  .set('close', 22)
  .set(true, 'We are open 🧗‍♂️')
  .set(false, 'We are close 😠 ');
console.log(map);
/* const timeUser =
  Number(prompt('Give me a time for I know if is not out service')) 
console.log(
  `The Gym is ${map.get(
    timeUser >= map.get('open') && timeUser < map.get('close')
  )} `
); */
const question = new Map([
  ['question', 'What is the best programing language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 2],
  [true, 'Correct, but 🤫 '],
  [false, '😠, tray again'],
]);

console.log(question.get('question'));
for (const [key, value] of question) {
  typeof key === 'number' && console.log(`Answer ${key}: ${value}`);
}

const answerUser = 2; /* Number(prompt('Your answer is?')); */

console.log(question.get(question.get('correct') === answerUser));

// Convert map to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// Create events no duplicate
const eventsNoDuplicate = [...new Set(gameEvents.values())];
console.log(eventsNoDuplicate);

// remove event minute 64
gameEvents.delete(64);
console.log(`Removed yellow card event on min 64`);
for (const [min, event] of gameEvents) {
  console.log(`Min ${min}: ${event}`);
}

// calculate  average event in game
const fullTime = [...gameEvents.keys()].pop();
console.log(
  ` An event happened, on average, every ${fullTime / gameEvents.size} minutes`
);

// print which Half time is?
for (const [min, event] of gameEvents) {
  const half = min < 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}

//============= Work with String===========
const myName1 = 'Cesar Curzata De la Cruz';
console.log('Cesar'.length);
console.log(myName1.slice(2)); // cut to position 2 result [sar]
console.log(myName1.slice(2, 4));
console.log(myName1.slice(myName1.indexOf(' '), myName1.indexOf(' D'))); // Only first last name

// normalize string email
const email = ' cmcruzTa@uCI.cU  ';
console.log(`Emial normalizaded:${email.toLowerCase().trim()}`);

// using split and join
console.log(myName1.split(' ').join(','));

// Capitalize Letter
const capitalizeLetter = letter => {
  const words = letter.split(' ');
  let wordUpper = [];
  for (const word of words) {
    wordUpper.push(word.replace(word[0], word[0].toUpperCase()));
  }
  console.log(...wordUpper);
};

capitalizeLetter('rafaela de la Cruz moreno');

// Padding, OJO con el limite
const message = 'Padding for message';
console.log('Put (+) before word:', message.padStart(25, '+').padEnd(35, '+'));

// Create mask credit card
const maskCreditCard = number => {
  const str = number + ''; // trick to convert number to string
  return str.slice(-4).padStart(str.length, '*');
};

console.log(
  `Create mask to Credit Card number 9204959875382485:`,
  maskCreditCard(9204959875382485)
);

// Repeat
const planesInLine = n => {
  console.log(`There are ${n} plane arriving: ${'🛬'.repeat(n)}`);
};
planesInLine(10);

// =============== challenge 4 ===================

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const rows = document.querySelector('textarea').value.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLocaleLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(output.padEnd(20) + '✅'.repeat(i + 1));
  }
});
