const getInput = require("../input-loader");

const input = getInput("2020", "1");

function firstPart() {
  for (let i = 0; i < input.length; i++) {
    const lefthand = parseInt(input[i]);
    for (let j = i + 1; j < input.length; j++) {
      const righthand = parseInt(input[j]);
      if (righthand + lefthand === 2020) {
        console.log("found it: ", righthand * lefthand);
        return;
      }
    }
  }
  console.log("not found");
}

function secondPart() {
  for (let i = 0; i < input.length; i++) {
    const first = parseInt(input[i]);
    for (let j = i + 1; j < input.length; j++) {
      const second = parseInt(input[j]);
      for (let k = j + 1; k < input.length; k++) {
        const third = parseInt(input[k]);
        if (first + second + third === 2020) {
          console.log("found it: ", first * second * third);
          return;
        }
      }
    }
  }
  console.log("not found");
}

firstPart();
secondPart();
