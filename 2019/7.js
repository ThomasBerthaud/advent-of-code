// prettier-ignore
const MEMORY = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 42, 55, 76, 89, 114, 195, 276, 357, 438, 99999, 3, 9, 1001, 9, 3, 9, 1002, 9, 3, 9, 1001, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 101, 5, 9, 9, 4, 9, 99, 3, 9, 102, 3, 9, 9, 101, 5, 9, 9, 1002, 9, 2, 9, 101, 4, 9, 9, 4, 9, 99, 3, 9, 102, 5, 9, 9, 1001, 9, 3, 9, 4, 9, 99, 3, 9, 1001, 9, 4, 9, 102, 5, 9, 9, 1001, 9, 5, 9, 1002, 9, 2, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99];

class IntCode {
  constructor(initialMemory) {
    this.initialMemory = initialMemory;
    this.memory = [...this.initialMemory];
    this.input = [];
    this.output = [];
    this.pointer = 0;
    this.done = false;
  }

  run(input) {
    if (this.done) {
      throw new Error("trying to run an already done IntCode");
    }
    this.input = input;
    let [opCode, mode1, mode2, mode3] = this.parseOpCode(this.memory[this.pointer]);
    let needInput = this.input.length === 0;
    while (opCode !== 99 && !needInput) {
      let nbInstructions;
      let jumpIndex = null;

      switch (opCode) {
        // store addition of 1st and 2nd parameter into 3rd parameter
        case 1:
          this.add(this.pointer, mode1, mode2);
          nbInstructions = 4;
          break;
        // store multiplication of 1st and 2nd parameter into 3rd parameter
        case 2:
          this.multiply(this.pointer, mode1, mode2);
          nbInstructions = 4;
          break;
        // store input into 1st parameter
        case 3:
          needInput = this.storeInput(this.pointer);
          nbInstructions = needInput ? 0 : 2;
          break;
        // outputs what is stored in 1st parameter
        case 4:
          this.setOutput(this.pointer, mode1);
          nbInstructions = 2;
          break;
        // jumps to value given by 2nd parameter if 1st paramerer is non-zero
        case 5:
          jumpIndex = this.jumpIfTrue(this.pointer, mode1, mode2);
          break;
        // jumps to value given by 2nd parameter if 1st paramerer is zero
        case 6:
          jumpIndex = this.jumpIfFalse(this.pointer, mode1, mode2);
          break;
        // if 1st parameter is less than 2nd parameter, store 1 in 3rd parameter, else store 0
        case 7:
          this.lessThan(this.pointer, mode1, mode2);
          nbInstructions = 4;
          break;
        // if 1st parameter is equal to 2nd parameter, store 1 in 3rd parameter, else store 0
        case 8:
          this.equals(this.pointer, mode1, mode2);
          nbInstructions = 4;
          break;
        default:
          throw new Error("wrong opCode " + opCode);
      }
      this.pointer = jumpIndex !== null ? jumpIndex : this.pointer + nbInstructions;
      [opCode, mode1, mode2, mode3] = this.parseOpCode(this.memory[this.pointer]);
    }
    if (opCode === 99) {
      this.done = true;
    }
    return this.output.splice(0, this.output.length);
  }

  add(pointer, mode1, mode2) {
    this.memory[this.memory[pointer + 3]] = this.getValue(pointer + 1, mode1) + this.getValue(pointer + 2, mode2);
  }

  multiply(pointer, mode1, mode2) {
    this.memory[this.memory[pointer + 3]] = this.getValue(pointer + 1, mode1) * this.getValue(pointer + 2, mode2);
  }

  storeInput(pointer) {
    if (this.input.length === 0) return true;
    this.memory[this.memory[pointer + 1]] = this.input.shift();
    return false;
  }

  setOutput(pointer, mode1) {
    this.output.push(this.getValue(pointer + 1, mode1));
  }

  jumpIfTrue(pointer, mode1, mode2) {
    return this.getValue(pointer + 1, mode1) !== 0 ? this.getValue(pointer + 2, mode2) : pointer + 3;
  }

  jumpIfFalse(pointer, mode1, mode2) {
    return this.getValue(pointer + 1, mode1) === 0 ? this.getValue(pointer + 2, mode2) : pointer + 3;
  }

  lessThan(pointer, mode1, mode2) {
    this.memory[this.memory[pointer + 3]] =
      this.getValue(pointer + 1, mode1) < this.getValue(pointer + 2, mode2) ? 1 : 0;
  }

  equals(pointer, mode1, mode2) {
    this.memory[this.memory[pointer + 3]] =
      this.getValue(pointer + 1, mode1) === this.getValue(pointer + 2, mode2) ? 1 : 0;
  }

  parseOpCode(instruction) {
    const padded = instruction.toString().padStart(5, "0");
    return [padded.slice(3), padded[2], padded[1], padded[0]].map(Number);
  }

  getValue(indexOrValue, parameterMode) {
    return parameterMode === 1 ? this.memory[indexOrValue] : this.memory[this.memory[indexOrValue]];
  }
}

let max = -Infinity;
let bestSequence = null;
getAllPermutations("56789").forEach(sequence => {
  const phaseSettings = sequence.split("").map(Number);
  //create amplifiers
  const amplifierA = new IntCode(MEMORY);
  const amplifierB = new IntCode(MEMORY);
  const amplifierC = new IntCode(MEMORY);
  const amplifierD = new IntCode(MEMORY);
  const amplifierE = new IntCode(MEMORY);
  //first round get phase settings as 1st input
  const outputA = amplifierA.run([phaseSettings[0], 0]);
  const outputB = amplifierB.run([phaseSettings[1], ...outputA]);
  const outputC = amplifierC.run([phaseSettings[2], ...outputB]);
  const outputD = amplifierD.run([phaseSettings[3], ...outputC]);
  let outputE = amplifierE.run([phaseSettings[4], ...outputD]);
  // feedback loop
  while (notDone(amplifierA, amplifierB, amplifierC, amplifierD, amplifierE)) {
    const outputA = amplifierA.run(outputE);
    const outputB = amplifierB.run(outputA);
    const outputC = amplifierC.run(outputB);
    const outputD = amplifierD.run(outputC);
    outputE = amplifierE.run(outputD);
  }
  if (outputE[0] > max) {
    max = outputE[0];
    bestSequence = sequence;
  }
});
console.log(`max output: ${max} (sequence: ${bestSequence})`);

// https://initjs.org/all-permutations-of-a-set-f1be174c79f8
function getAllPermutations(string) {
  const results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (let i = 0; i < string.length; i++) {
    const firstChar = string[i];
    const charsLeft = string.substring(0, i) + string.substring(i + 1);
    const innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

function notDone(...amplifiers) {
  return amplifiers.some(amplifier => !amplifier.done);
}
