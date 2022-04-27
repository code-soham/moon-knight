var readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("\nEnter the x and y coordinates of Knight piece\n(Between 0 and 7))");
readline.question("Enter x: ", function (a) {
    console.log("x : ".concat(a));
    readline.question("Enter y: ", function (b) {
        console.log("y : ".concat(b));
        compute(parseInt(a), parseInt(b));
        readline.close();
    });
});
function compute(x, y) {
    var positions = [];
    if (x > 7 || y > 7 || x < 0 || y < 0) {
        console.log("Invalid input");
        return;
    }
    var __x = [2, 1, -1, -2, -2, -1, 1, 2];
    var __y = [1, 2, 2, 1, -1, -2, -2, -1];
    for (var i = 0; i < 8; i++) {
        var newX = x + __x[i];
        var newY = y + __y[i];
        if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
            continue;
        }
        positions.push([newX, newY]);
    }
    if (positions.length === 0) {
        console.log("No positions found");
    }
    else {
        console.log("The Positions are: ");
        positions.forEach(function (pos) {
            console.log("".concat(pos[0], " , ").concat(pos[1]));
        });
    }
}
