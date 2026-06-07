import { gameboard } from "./gameboard.js";
export function player(name) {
  let board;
  let makeNewGameboard = (sizeColumns, sizeRows) => {
    board = gameboard();
    board.createBoard(sizeColumns, sizeRows);
    //for now, we are going to randomly place where ships are placed
    board.placeShip(3, 0, 0, "vertical");
    board.placeShip(3, 2, 4, "horizontal");
  };
  let getGameboard = () => {
    return board;
  };
  let getName = () => {
    //should be player1 or player2
    return name;
  };
  return { makeNewGameboard, getGameboard, getName };
}
