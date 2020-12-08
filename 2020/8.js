const getInput = require("../input-loader");
const input = getInput("2020", "8");

function executeProgram(program) {
  let accumulator = 0;
  let index = 0;
  const alreadyVisited = [];

  function execute(instruction) {
    const [name, arg] = instruction.split(" ");
    switch (name) {
      case "acc":
        accumulator += parseInt(arg);
        return index + 1;
      case "jmp":
        return index + parseInt(arg);
      case "nop":
        return index + 1;
    }
  }

  do {
    if (alreadyVisited[index] === true) break;
    alreadyVisited[index] = true;
    index = execute(program[index]);
  } while (index < program.length);
  return { accumulator, done: index >= program.length };
}

function firstPart() {
  console.log("\x1b[34mfirst part\x1b[0m");
  const { accumulator } = executeProgram(input);
  console.log("infinite loop found, acc: ", accumulator);
}

function secondPart() {
  console.log("\x1b[34msecond part\x1b[0m");

  for (let i = 0; i < input.length; i++) {
    const [name, arg] = input[i].split(" ");
    if (name === "jmp") {
      const fixedProgram = [...input];
      fixedProgram.splice(i, 1, "nop"); // replace 'jmp' instruction with 'nop' instruction to try to fix infinite loop
      const { accumulator, done } = executeProgram(fixedProgram);
      if (done) {
        console.log("program fixed ! acc: ", accumulator);
        return;
      }
    }
  }
}

firstPart();
secondPart();
