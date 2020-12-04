const getInput = require("../input-loader");
const input = getInput("2020", "4");

function initFieldsCheck() {
  return {
    byr: false,
    iyr: false,
    eyr: false,
    hgt: false,
    hcl: false,
    ecl: false,
    pid: false,
  };
}

function firstPart() {
  console.log("\x1b[34mfirst part\x1b[0m");
  let nbPassports = 0;
  let nbValid = 0;

  let fields = initFieldsCheck();
  input.forEach((line) => {
    if (line === "") {
      nbPassports++;
      if (Object.values(fields).every((field) => field)) {
        nbValid++;
      }
      fields = initFieldsCheck();
    } else {
      line.split(" ").forEach((passportField) => {
        const [key, value] = passportField.split(":");
        fields[key] = true;
      });
    }
  });
  nbPassports++;
  if (Object.values(fields).every((field) => field)) {
    nbValid++;
  }

  console.log("nb passports: ", nbPassports);
  console.log("nb passport valid: ", nbValid);
}

function secondPart() {
  console.log("\x1b[34msecond part\x1b[0m");
  let nbPassports = 0;
  let nbValid = 0;
  const valueCheck = {
    byr: (value) => parseInt(value) >= 1920 && parseInt(value) <= 2002,
    iyr: (value) => parseInt(value) >= 2010 && parseInt(value) <= 2020,
    eyr: (value) => parseInt(value) >= 2020 && parseInt(value) <= 2030,
    hgt: (value) => {
      const digits = value.slice(0, value.length - 2);
      const system = value.slice(-2);
      switch (system) {
        case "cm":
          return parseInt(digits) >= 150 && parseInt(digits) <= 117935;
        case "in":
          return parseInt(digits) >= 59 && parseInt(digits) <= 76;
        default:
          return false;
      }
    },
    hcl: (value) => value.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/),
    ecl: (value) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value),
    pid: (value) => !isNaN(parseInt(value)) && value.length === 9,
    cid: (value) => true,
  };

  let fields = initFieldsCheck();
  input.forEach((line) => {
    if (line === "") {
      nbPassports++;
      if (Object.values(fields).every((field) => field)) {
        nbValid++;
      }
      fields = initFieldsCheck();
    } else {
      line.split(" ").forEach((passportField) => {
        const [key, value] = passportField.split(":");
        fields[key] = valueCheck[key](value);
      });
    }
  });
  nbPassports++;
  if (Object.values(fields).every((field) => field)) {
    nbValid++;
  }

  console.log("nb passports: ", nbPassports);
  console.log("nb passport valid: ", nbValid);
}

firstPart();
secondPart();
