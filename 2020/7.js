const getInput = require("../input-loader");
const input = getInput("2020", "7");

function getBags(input) {
  const bags = {};
  input.forEach((line) => {
    const [parent, children] = line.split(" contain ");
    const type = parent.split(" bags")[0];
    const containing = children.split(", ").map((child) => {
      const words = child.split(" ");
      return { type: words[1] + " " + words[2], nb: words[0] };
    });
    bags[type] = containing;
  });
  return bags;
}

function firstPart() {
  function isContaining(bags, type) {
    if (!bags[type]) {
      return false;
    }
    if (bags[type].some((bag) => bag.type.includes("shiny gold"))) {
      return true;
    }
    return bags[type].reduce((is, bag) => is || isContaining(bags, bag.type), false);
  }

  console.log("\x1b[34mfirst part\x1b[0m");
  const bags = getBags(input);

  let nbCanContain = 0;
  for (let type of Object.keys(bags)) {
    if (isContaining(bags, type)) {
      nbCanContain++;
    }
  }
  console.log("answer: ", nbCanContain);
}

function secondPart() {
  function countBags(bags, type) {
    if (bags[type][0].type === "other bags.") {
      return 1;
    }
    return bags[type].reduce((nb, bag) => nb + countBags(bags, bag.type) * bag.nb, 1);
  }

  console.log("\x1b[34msecond part\x1b[0m");
  const bags = getBags(input);
  // countBags() gives total bags but we want nb of bags INSIDE shiny gold bag, so -1
  console.log("answer: ", countBags(bags, "shiny gold") - 1);
}

firstPart();
secondPart();
