const getInput = require("../input-loader");
const input = getInput("2020", "10");

function firstPart() {
  console.log("\x1b[34mfirst part\x1b[0m");
  const sorted = input.map((v) => parseInt(v)).sort((a, b) => a - b);
  const differences = {
    1: 1, // charging outlet
    3: 1, // device adapter
  };

  for (let i = 0; i < sorted.length - 1; i++) {
    const value = sorted[i];
    const nextValue = sorted[i + 1];
    differences[nextValue - value] = ~~differences[nextValue - value] + 1;
  }
  console.log("answer: ", differences[1] * differences[3]);
}

function secondPart() {
  console.log("\x1b[34msecond part\x1b[0m");
}

firstPart();
secondPart();
