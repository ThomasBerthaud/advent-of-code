// prettier-ignore
const MEMORY = [3,225,1,225,6,6,1100,1,238,225,104,0,2,218,57,224,101,-3828,224,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1102,26,25,224,1001,224,-650,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1102,44,37,225,1102,51,26,225,1102,70,94,225,1002,188,7,224,1001,224,-70,224,4,224,1002,223,8,223,1001,224,1,224,1,223,224,223,1101,86,70,225,1101,80,25,224,101,-105,224,224,4,224,102,8,223,223,101,1,224,224,1,224,223,223,101,6,91,224,1001,224,-92,224,4,224,102,8,223,223,101,6,224,224,1,224,223,223,1102,61,60,225,1001,139,81,224,101,-142,224,224,4,224,102,8,223,223,101,1,224,224,1,223,224,223,102,40,65,224,1001,224,-2800,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,1102,72,10,225,1101,71,21,225,1,62,192,224,1001,224,-47,224,4,224,1002,223,8,223,101,7,224,224,1,224,223,223,1101,76,87,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,226,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1107,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,7,226,677,224,1002,223,2,223,1005,224,359,101,1,223,223,1007,226,226,224,102,2,223,223,1005,224,374,101,1,223,223,108,677,677,224,102,2,223,223,1006,224,389,1001,223,1,223,107,677,226,224,102,2,223,223,1006,224,404,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,419,1001,223,1,223,1107,677,677,224,1002,223,2,223,1006,224,434,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,449,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,464,101,1,223,223,7,677,226,224,102,2,223,223,1006,224,479,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,494,101,1,223,223,1008,226,677,224,1002,223,2,223,1005,224,509,1001,223,1,223,1007,677,226,224,102,2,223,223,1005,224,524,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,539,101,1,223,223,1108,226,226,224,1002,223,2,223,1006,224,554,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,569,1001,223,1,223,7,226,226,224,102,2,223,223,1005,224,584,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,614,1001,223,1,223,108,226,226,224,1002,223,2,223,1006,224,629,101,1,223,223,107,677,677,224,102,2,223,223,1005,224,644,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,659,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226];

class IntCode {
  constructor(initialMemory) {
    this.initialMemory = initialMemory;
    this.memory = [];
    this.input = Infinity;
    this.output = Infinity;
  }

  // TODO refacto pour que chaque fonction gère le saut d'instructions
  run(input) {
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
    this.memory[this.memory[pointer + 1]] = this.input;
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

const computer = new IntCode(MEMORY);
console.log(computer.run(5));
