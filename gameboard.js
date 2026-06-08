import { ship } from "./ship.js";

export function gameboard() {
  let shipPositions = 0;
  let attackPositions = 0;
  let missedShots = [];
  let ships = [];

  let getBoard = () => {
    return shipPositions;
  };

  let createBoard = (sizeRows, sizeColumns) => {
    const grid = Array(sizeRows)
      .fill(null)
      .map(() => Array(sizeColumns).fill(null));

    shipPositions = grid;

    const grid2 = Array(sizeRows)
      .fill(null)
      .map(() => Array(sizeColumns).fill(null));

    attackPositions = grid2;
  };

  let placeShip = (length, startRow, startColumn, direction) => {
    let newShip = ship(length);

    if (direction == "horizontal") {
      if (
        startRow < 0 ||
        startColumn < 0 ||
        startColumn + length > shipPositions[0].length
      ) {
        throw new Error("Invalid placement");
      }

      for (let column = startColumn; column < startColumn + length; column++) {
        if (shipPositions[startRow][column] != null)
          throw new Error("Another ship in the way");

        shipPositions[startRow][column] = newShip;
      }
    } else {
      // vertical
      if (
        startRow < 0 ||
        startColumn < 0 ||
        startRow + length > shipPositions.length
      ) {
        throw new Error("Invalid placement");
      }

      for (let row = startRow; row < startRow + length; row++) {
        if (shipPositions[row][startColumn] != null)
          throw new Error("Another ship in the way");

        shipPositions[row][startColumn] = newShip;
      }
    }

    ships.push(newShip);
  };

  let receiveAttack = (row, column) => {
    let tile = shipPositions[row][column];

    if (attackPositions[row][column] != null) {
      throw new Error("Position has already been attacked on");
    }

    if (tile == null) {
      missedShots.push({ row, column });
      attackPositions[row][column] = "miss";
    } else {
      tile.isHit();
      attackPositions[row][column] = "hit";
      if(tile.isSunk()){
        return true;
      }
    }
  };

  let getMissedShots = () => {
    return missedShots;
  };
  let getAttackPositions = () => {
    return attackPositions;
  };
  let hasLost = () => {
    if (ships.length == 0) {
      throw new Error("No ships on gameboard");
    }

    for (const ship of ships) {
      if (!ship.isSunk()) return false;
    }

    return true;
  };

  let getShips = () => {
    return ships;
  };

  return {
    getBoard,
    createBoard,
    placeShip,
    receiveAttack,
    getMissedShots,
    getAttackPositions,
    hasLost,
    getShips,
  };
}
