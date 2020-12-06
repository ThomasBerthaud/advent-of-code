const getInput = require("../input-loader");
const input = getInput("2020", "6");

function firstPart() {
  console.log("\x1b[34mfirst part\x1b[0m");
  let groupAnswers = [];
  let sum = 0;
  input.forEach((line) => {
    if (line === "") {
      sum += groupAnswers.length;
      groupAnswers = [];
    } else {
      line.split("").forEach((char) => {
        if (groupAnswers.indexOf(char) === -1) {
          groupAnswers.push(char);
        }
      });
    }
  });
  sum += groupAnswers.length;

  console.log("count: ", sum);
}

function secondPart() {
  console.log("\x1b[34msecond part\x1b[0m");
  let groupAnswers = {};
  let nbPeopleInGroup = 0;
  let sum = 0;
  input.forEach((line) => {
    if (line === "") {
      let nbAnyAnswer = 0;
      for (let nb of Object.values(groupAnswers)) {
        if (nb == nbPeopleInGroup) {
          nbAnyAnswer++;
        }
      }
      sum += nbAnyAnswer;
      groupAnswers = {};
      nbPeopleInGroup = 0;
    } else {
      line.split("").forEach((char) => (!groupAnswers[char] ? (groupAnswers[char] = 1) : groupAnswers[char]++));
      nbPeopleInGroup++;
    }
  });
  let nbAnyAnswer = 0;
  for (let nb of Object.values(groupAnswers)) {
    if (nb == nbPeopleInGroup) {
      nbAnyAnswer++;
    }
  }
  sum += nbAnyAnswer;

  console.log("count: ", sum);
}

firstPart();
secondPart();
