const getInput = require("../input-loader");
const input = getInput("2020", "5");

function getSeatPos(seat) {
  const rowChars = seat.slice(0, 7).split("");
  const columnChars = seat.slice(7).split("");

  const rowRange = rowChars.reduce(
    (range, char) => {
      switch (char) {
        case "B":
          range[0] = range[0] + Math.round((range[1] - range[0]) / 2);
          break;
        case "F":
          range[1] = range[1] - Math.round((range[1] - range[0]) / 2);
          break;
      }
      return range;
    },
    [0, 127]
  );
  if (rowRange[0] !== rowRange[1]) console.error("wrong rowRange", rowRange);

  const columnRange = columnChars.reduce(
    (range, char) => {
      switch (char) {
        case "L":
          range[1] = range[1] - Math.round((range[1] - range[0]) / 2);
          break;
        case "R":
          range[0] = range[0] + Math.round((range[1] - range[0]) / 2);
          break;
      }
      return range;
    },
    [0, 7]
  );
  if (columnRange[0] !== columnRange[1]) console.error("wrong columnRange", columnRange);

  return { row: rowRange[0], column: columnRange[0] };
}

function firstPart() {
  console.log("\x1b[34mfirst part\x1b[0m");
  let highestId = -Infinity;
  input.forEach((seat) => {
    const seatInfo = getSeatPos(seat);
    const seatId = seatInfo.row * 8 + seatInfo.column;
    if (seatId > highestId) highestId = seatId;
  });
  console.log("highest id: ", highestId);
}

function secondPart() {
  console.log("\x1b[34msecond part\x1b[0m");
  const maxId = 127 * 8 + 7;
  const seatIds = new Array(maxId).fill(false);

  input.forEach((seat) => {
    const seatInfo = getSeatPos(seat);
    const seatId = seatInfo.row * 8 + seatInfo.column;
    seatIds[seatId] = true;
  });
  for (let i = 0; i < maxId; i++) {
    if (!seatIds[i] && seatIds[i - 1] && seatIds[i + 1]) {
      console.log("seatEmpty: ", i);
    }
  }
}

firstPart();
secondPart();
