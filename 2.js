// prettier-ignore
const program = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,5,23,1,23,6,27,2,9,27,31,1,5,31,35,1,35,10,39,1,39,10,43,2,43,9,47,1,6,47,51,2,51,6,55,1,5,55,59,2,59,10,63,1,9,63,67,1,9,67,71,2,71,6,75,1,5,75,79,1,5,79,83,1,9,83,87,2,87,10,91,2,10,91,95,1,95,9,99,2,99,9,103,2,10,103,107,2,9,107,111,1,111,5,115,1,115,2,119,1,119,6,0,99,2,0,14,0];

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    const output = execute(noun, verb, [...program]);
    if (output === 19690720) {
      console.log(`noun: ${noun}, verb: ${verb}, total: ${100 * noun + verb}`);
      return;
    }
  }
}

function execute(noun, verb, program) {
  program[1] = noun;
  program[2] = verb;
  let index = 0;
  let opCode = program[0];
  while (opCode !== 99) {
    if (opCode === 1) {
      program[program[index + 3]] =
        program[program[index + 1]] + program[program[index + 2]];
    } else if (opCode === 2) {
      program[program[index + 3]] =
        program[program[index + 1]] * program[program[index + 2]];
    } else {
      throw new Error("wrong opCode " + opCode);
    }
    index += 4;
    opCode = program[index];
  }
  return program[0];
}
