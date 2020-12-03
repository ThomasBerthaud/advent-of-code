const getInput = require("../input-loader");

const input = getInput("2020", "3");

function computeNbTrees(deltaX, deltaY) {
  let x = (y = 0);
  let nbTrees = 0;

  while (y < input.length) {
    if (input[y][x] === "#") {
      nbTrees++;
    }

    x += deltaX;
    y += deltaY;
    if (x >= input[0].length) {
      x -= input[0].length;
    }
  }
  return nbTrees;
}

function firstPart() {
  console.log("\x1b[34mfirst part\x1b[0m");
  const nbTrees = computeNbTrees(3, 1);
  console.log("trees encountered: ", nbTrees);
}

function secondPart() {
  console.log("\x1b[34msecond part\x1b[0m");
  const nb1 = computeNbTrees(1, 1);
  const nb2 = computeNbTrees(3, 1);
  const nb3 = computeNbTrees(5, 1);
  const nb4 = computeNbTrees(7, 1);
  const nb5 = computeNbTrees(1, 2);

  console.log("results: ", nb1, nb2, nb3, nb4, nb5);
  console.log("answer: ", nb1 * nb2 * nb3 * nb4 * nb5);
}

firstPart();
secondPart();
