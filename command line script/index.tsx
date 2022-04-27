const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log(`
Enter the x and y coordinates of Knight piece
(Between 0 and 7))`);
readline.question("Enter x: ", (a) => {
  console.log(`x : ${a}`);
  readline.question("Enter y: ", (b) => {
    console.log(`y : ${b}`);
    compute(parseInt(a), parseInt(b));
    readline.close();
  });
});
function compute(x: number, y: number) {
  let positions: Array<Array<number>> = [];
  if (x > 7 || y > 7 || x < 0 || y < 0) {
    console.log("Invalid input");
    return;
  }
  let __x: Array<number> = [2, 1, -1, -2, -2, -1, 1, 2];
  let __y: Array<number> = [1, 2, 2, 1, -1, -2, -2, -1];
  for (let i = 0; i < 8; i++) {
    let newX: number = x + __x[i];
    let newY: number = y + __y[i];
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
      continue;
    }
    positions.push([newX, newY]);
  }
  if (positions.length === 0) {
    console.log("No positions found");
  } else {
    console.log("The Positions are: ");
    positions.forEach((pos) => {
      console.log(`${pos[0]} , ${pos[1]}`);
    });
  }
}
