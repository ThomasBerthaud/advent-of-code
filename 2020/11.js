const getInput = require("../input-loader");
const input = getInput("2020", "11");

function firstPart() {
  console.log("\x1b[34mfirst part\x1b[0m");

  let nbChangedSeats = Infinity;
  let currentState = input;

  do {
    nbChangedSeats = 0;
    for (let i = 0; i < currentState.length; i++) {
      for (let j = 0; j < currentState[i].length; j++) {
        const cell = currentState[i][j];
        if (cell === "L" && hasNoOccupiedAdjacent(currentState, i, j)) {
          nbChangedSeats++;
        }
      }
    }
  } while (nbChangedSeats > 0);
}

function secondPart() {
  console.log("\x1b[34msecond part\x1b[0m");
}

firstPart();
secondPart();
