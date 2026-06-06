import { gameboard } from "./gameboard.js";
export function player() {
  let gameboard;
  let makeNewGameboard = (sizeColumns, sizeRows)=>{
    gameboard = gameboard();
    gameboard.createBoard(sizeColumns,sizeRows);
    //for now, we are going to randomly place where ships are placed
    gameboard.placeShip(3,0,0,"vertical");
    gameboard.placeShip(3,2,4, "horizontal");
  }
  let getGameboard = () => {
    return gameboard
  };
}
