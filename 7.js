// prettier-ignore
const MEMORY = [3,8,1001,8,10,8,105,1,0,0,21,42,55,76,89,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,9,1001,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,101,5,9,9,4,9,99,3,9,102,3,9,9,101,5,9,9,1002,9,2,9,101,4,9,9,4,9,99,3,9,102,5,9,9,1001,9,3,9,4,9,99,3,9,1001,9,4,9,102,5,9,9,1001,9,5,9,1002,9,2,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99];

class IntCode {
  constructor(initialMemory) {
    this.initialMemory = initialMemory;
    this.memory = [];
    this.input = [];
    this.output = Infinity;
  }

  // TODO refacto pour que chaque fonction gère le saut d'instructions
  run(input) {
    console.log(`seq: ${input[0]}, input: ${input[1]}`);
    this.memory = [...this.initialMemory];
    this.input = input;
    this.output = null;
    let pointer = 0;
    let [opCode, mode1, mode2, mode3] = this.parseOpCode(this.memory[0]);
    while (opCode !== 99) {
      let nbInstructions;
      let jumpIndex = null;

      switch (opCode) {
        // store addition of 1st and 2nd parameter into 3rd parameter
        case 1:
          this.add(pointer, mode1, mode2);
          nbInstructions = 4;
          break;
        // store multiplication of 1st and 2nd parameter into 3rd parameter
        case 2:
          this.multiply(pointer, mode1, mode2);
          nbInstructions = 4;
          break;
        // store input into 1st parameter
        case 3:
          this.storeInput(pointer);
          nbInstructions = 2;
          break;
        // outputs what is stored in 1st parameter
        case 4:
          this.setOutput(pointer, mode1);
          nbInstructions = 2;
          break;
        // jumps to value given by 2nd parameter if 1st paramerer is non-zero
        case 5:
          jumpIndex = this.jumpIfTrue(pointer, mode1, mode2);
          break;
        // jumps to value given by 2nd parameter if 1st paramerer is zero
        case 6:
          jumpIndex = this.jumpIfFalse(pointer, mode1, mode2);
          break;
        // if 1st parameter is less than 2nd parameter, store 1 in 3rd parameter, else store 0
        case 7:
          this.lessThan(pointer, mode1, mode2);
          nbInstructions = 4;
          break;
        // if 1st parameter is equal to 2nd parameter, store 1 in 3rd parameter, else store 0
        case 8:
          this.equals(pointer, mode1, mode2);
          nbInstructions = 4;
          break;
        default:
          throw new Error("wrong opCode " + opCode);
      }
      pointer = jumpIndex !== null ? jumpIndex : pointer + nbInstructions;
      [opCode, mode1, mode2, mode3] = this.parseOpCode(this.memory[pointer]);
    }
    return this.output;
  }

  add(pointer, mode1, mode2) {
    this.memory[this.memory[pointer + 3]] = this.getValue(pointer + 1, mode1) + this.getValue(pointer + 2, mode2);
  }

  multiply(pointer, mode1, mode2) {
    this.memory[this.memory[pointer + 3]] = this.getValue(pointer + 1, mode1) * this.getValue(pointer + 2, mode2);
  }

  storeInput(pointer) {
    if (this.input.length === 0) throw new Error("no more input to read");
    this.memory[this.memory[pointer + 1]] = this.input.shift();
  }

  setOutput(pointer, mode1) {
    this.output = this.getValue(pointer + 1, mode1);
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

const memoryTest = [3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0];

const computer = new IntCode(memoryTest);
let max = -Infinity;
let bestSequence = null;

// TODO get all combinations of numbers between 0 and 4
for (let i = 0; i <= 44444; i++) {
  if (hasDoublon(i)) break;
  const sequence = i
    .toString()
    .padStart(5, "0")
    .split("")
    .map(Number);
  if (hasDoublon(sequence)) break;

  const output = sequence.reduce((input, seq) => {
    const output = computer.run([seq, input]);
    console.log("output", output);
    return output;
  }, 0);
  if (output > max) {
    max = output;
    bestSequence = sequence;
  }
}
console.log(max, bestSequence);

function hasDoublon(sequence) {
  return sequence.reduce((a, b));
}
