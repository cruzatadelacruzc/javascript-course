// Remember, we're gonna use strict mode in all scripts now!
"use strict";
let option;
option = prompt(`
    Chossen one number of the menu:
    0- Exit
    1- Calculate maximun and minimun value
    2- Session to Debugger any 🐛
    3- Print Forestcast(🌡)
  `);

switch (option) {
  case "1": {
    const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

    const calcTempAmplitudeNew = function (temps) {
      let max = temps[0];
      let min = temps[0];
      for (let currentTemp in temps) {
        if (typeof temps[currentTemp] !== "number") continue;

        max = temps[currentTemp] > max ? temps[currentTemp] : max;

        min = temps[currentTemp] < min ? temps[currentTemp] : min;
      }
      console.log(max, min);
      return max - min;
    };

    const amplitudeNew = calcTempAmplitudeNew(temperatures);
    console.log("The substract is: " + amplitudeNew);
    break;
  }
  case "2": {
    const measureKelvin = function () {
      const measurement = {
        type: "temp",
        unit: "celcius",
        value: Number(prompt("Degrees celcius: ")),
      };

      console.table(measurement);
      console.warn(measurement.value);
      console.error(measurement.value);

      const kelvin = measurement.value + 273;
      return kelvin;
    };
    console.log(measureKelvin());
    break;
  }
  case "3": {
    const printForecast = function (forescasts) {
      let response = "";
      for (let i = 0; i < forescasts.length; i++) {
        response += `...${forescasts[i]} in ${i + 1} days`;
      }
      console.log(`${response}...`);
    };

    printForecast([17, 21, 23]);
    printForecast([12, 5, -50, 0, 4]);
    break;
  }
  default: {
    console.log(`Good Bye, 🤙`);
    break;
  }
}
