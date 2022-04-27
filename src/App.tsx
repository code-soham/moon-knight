import { Typography, Button, Modal, Box } from "@mui/material";
import React from "react";
import "./App.css";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [coords, setCoords] = React.useState<{ x: number; y: String }>({
    x: 0,
    y: "0",
  });
  const [positions, setPositions] = React.useState<Array<Array<number>>>([]);
  function toChessCoords(x: number, y: number) {
    return {
      x: 8 - x,
      y: "abcdefgh"[y],
    };
  }
  function getPositions(x: number, y: number) {
    let positions: Array<Array<number>> = [];
    let __x = [2, 1, -1, -2, -2, -1, 1, 2];
    let __y = [1, 2, 2, 1, -1, -2, -2, -1];
    for (let i = 0; i < 8; i++) {
      let newX = x + __x[i];
      let newY = y + __y[i];
      if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
        continue;
      }
      positions.push([newX, newY]);
    }
    return positions;
  }
  function setBoard(x: number, y: number) {
    let cells = document.querySelectorAll(".square");
    cells.forEach((cell) => {
      cell.classList.remove("knight");
      cell.classList.remove("moon-knight");
    });
    let target = cells[x * 8 + y];
    target.classList.add("knight");
    let pos: Array<Array<number>> = getPositions(x, y);
    setPositions(pos);
    pos.forEach((pos) => {
      let target = cells[pos[0] * 8 + pos[1]];
      target.classList.add("moon-knight");
    });
  }
  function play(row: number, col: number) {
    setCoords(toChessCoords(row, col));
    setBoard(row, col);
  }
  function getResult() {
    if (coords.x !== 0) {
      return (
        <Typography variant="h5" component="h2" align="center" color="white">
          Selection : {coords.x}
          {coords.y}
          <Button onClick={handleOpen}> View Moves</Button>
        </Typography>
      );
    } else {
      return (
        <Typography variant="h5" component="h2" align="center" color="white">
          Please select a square
        </Typography>
      );
    }
  }
  function renderBoard() {
    const count = 64;
    const board = [];
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / 8);
      const col = i % 8;
      const piece =
        (i % 2 === 0 && row % 2 === 1) || (i % 2 === 1 && row % 2 === 0)
          ? "black"
          : "white";
      const square = (
        <div
          className={`square ${piece}`}
          key={i}
          onClick={() => play(row, col)}
        ></div>
      );
      board.push(square);
    }
    return <div className="board">{board}</div>;
  }
  return (
    <div className="App">
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {positions.map((pos) => {
              return (
                <Typography
                  variant="h6"
                  component="p"
                  align="center"
                  color="#123456"
                >
                  {(toChessCoords(pos[0], pos[1]).x).toString() +
                    toChessCoords(pos[0], pos[1]).y}
                </Typography>
              );
            })}
          </Box>
        </Modal>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
          KNIGHT MOVES{" "}
        </Typography>
        {renderBoard()}
        <Typography
          variant="h5"
          component="h5"
          gutterBottom
          align="center"
          color="burlywood"
        >
          Place Your Knight
        </Typography>
        {getResult()}
      </>
    </div>
  );
}

export default App;
