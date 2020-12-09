const getInput = require("../input-loader");
const input = getInput("2020", "9");

const PREAMBLE_LENGTH = 25;

function findInvalidNb() {
  function isValid(nb, previousNbs) {
    for (let j = 0; j < PREAMBLE_LENGTH; j++) {
      for (let k = j; k < PREAMBLE_LENGTH; k++) {
        if (parseInt(previousNbs[j]) + parseInt(previousNbs[k]) === parseInt(nb)) {
          return true;
        }
      }
    }
    return false;
  }

  for (let i = PREAMBLE_LENGTH; i < input.length; i++) {
    const currentNb = input[i];
    const previousNbs = input.slice(i - PREAMBLE_LENGTH, i);
    if (!isValid(currentNb, previousNbs)) {
      return parseInt(currentNb);
    }
  }
  return -1;
}

function firstPart() {
  console.log("\x1b[34mfirst part\x1b[0m");
  console.log("answer: ", findInvalidNb());
}

function secondPart() {
  console.log("\x1b[34msecond part\x1b[0m");
  const invalid = findInvalidNb();

  for (let i = 0; i < input.length; i++) {
    let range = 1;
    let sum = parseInt(input[i]);
    while (sum < invalid) {
      sum += parseInt(input[i + range]);
      range++;
    }
    if (sum === invalid) {
      const sortedRange = input
        .slice(i, i + range)
        .map((nb) => parseInt(nb))
        .sort((a, b) => a - b);
      console.log("answer: ", sortedRange[0] + sortedRange[sortedRange.length - 1]);
      return;
    }
  }
  console.log("did not find range");
}

firstPart();
secondPart();
