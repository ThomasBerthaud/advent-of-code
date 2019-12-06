const START = 130254;
const END = 678275;
let nb = 0;

for (let i = START; i <= END; i++) {
  if (hasTwoAdjacentDigits(i) && neverDecrease(i)) {
    nb++;
  }
}
console.log(nb);

function hasTwoAdjacentDigits(i) {
  const digits = i.toString().split("");
  for (let i = -1; i < digits.length - 2; i++) {
    if (
      digits[i] !== digits[i + 1] &&
      digits[i + 1] === digits[i + 2] &&
      digits[i + 2] !== digits[i + 3]
    )
      return true;
  }
  return false;
}

function neverDecrease(i) {
  const digits = i.toString().split("");
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i + 1]) return false;
  }
  return true;
}
