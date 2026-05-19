const ship = require("./ship");
function gameboard() {
  let currentBoard = 0;

  let getBoard = () => {
    return currentBoard;
  };

  let createBoard = (sizeX, sizeY) => {
    const grid = Array(sizeY)
      .fill(null)
      .map(() => Array(sizeX).fill(null));
    currentBoard = grid;
  };
  let placeShip = (length, startPositionX, startPositionY, direction) => {
    let newShip = ship(length);
    if ((direction == "horizontal")) {
      if (
        startPositionY < 0 ||
        startPositionX < 0 ||
        startPositionX + length > currentBoard.length
      ) {
        throw new Error("Invalid placement");
      }
      for (let x = startPositionX; x < startPositionX + length; x++) {
                if(currentBoard[x][startPositionY]!=null) throw new Error("Another ship in the way");
        currentBoard[x][startPositionY] = newShip;
      }
    } else {//default vertical
        //check for invalid placement
      if (
        startPositionY < 0 ||
        startPositionX < 0 ||
        startPositionY + length > currentBoard[0].length
      ) {
        throw new Error("Invalid placement");
      }
      for (let y = startPositionY; y < startPositionY + length; y++) {
        if(currentBoard[startPositionX][y]!=null) throw new Error("Another ship in the way");
        currentBoard[startPositionX][y] = newShip;
      }
    }
  };
  let receiveAttack = (x, y) => {};

  return { getBoard, createBoard, placeShip, receiveAttack };
}
module.exports = gameboard;
