const fs = require("fs");

module.exports = function getInput(year, day) {
  return fs
    .readFileSync(__dirname + `/${year}/${day}-input.txt`)
    .toString()
    .split("\n");
};
