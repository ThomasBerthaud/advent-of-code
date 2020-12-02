const getInput = require("../input-loader");

const input = getInput("2020", "2");

function firstPart() {
  let totalValid = 0;

  input.forEach((line) => {
    const [constraints, rawExpectedChar, password] = line.split(" ");
    const [min, max] = constraints.split("-");
    const nbExpectedChar = password
      .split("")
      .reduce((total, char) => (char === rawExpectedChar[0] ? total + 1 : total), 0);

    if (nbExpectedChar <= max && nbExpectedChar >= min) {
      totalValid++;
    }
  });

  console.log("total valid passwords :", totalValid);
}

function secondPart() {
  let totalValid = 0;

  input.forEach((line) => {
    const [constraints, rawExpectedChar, password] = line.split(" ");
    const [pos1, pos2] = constraints.split("-");
    const expectedChar = rawExpectedChar[0]; // to remove ':' after expected char

    // -1 because given pos start at 1 not 0
    if (
      (password[pos1 - 1] !== expectedChar && password[pos2 - 1] === expectedChar) ||
      (password[pos1 - 1] === expectedChar && password[pos2 - 1] !== expectedChar)
    ) {
      totalValid++;
    }
  });

  console.log("total valid passwords: ", totalValid);
}

firstPart();
secondPart();
