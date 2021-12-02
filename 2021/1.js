const getInput = require("../input-loader");

const input = getInput("2021", "1");

const totalIncrease = input.reduce((total, depth, index, data) => {
  return total + (Number(depth) > Number(data[index - 1]) ? 1 : 0);
}, 0);

console.log("total: ", totalIncrease);
