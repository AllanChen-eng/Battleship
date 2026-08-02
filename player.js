import { gameboard } from "./gameboard.js";
export function player(name, fleet) {
  let board;
  let screenName = "Player One";
  let size;

  let makeNewGameboard = (sizeColumns, sizeRows) => {
    board = gameboard();
    board.createBoard(sizeColumns, sizeRows);
    size = sizeColumns;
  };
  let getGameboard = () => {
    return board;
  };
  let getName = () => {
    //should be player1 or player2
    return name;
  };
  let setScreenName = (name) => {
    screenName = name;
  };
  let getScreenName = () => {
    if (screenName != null) {
      return screenName;
    } else {
      return name;
    }
  };
  let setAsComputer = () => {
    setScreenName("Computer");
    //for now, we are going to manually place where ships are placed
    fleet.forEach((currentShip) => {
      while (true) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        const rotation = Math.random() < 0.5 ? "horizontal" : "vertical";
        try {
          board.placeShip(currentShip, row, col, rotation);
          console.log("placed ship of " + currentShip + "at" + row + " " + col);
          break;
        } catch {}
      }
    });
    //board.placeShip(3, 0, 0, "vertical");
    //board.placeShip(3, 2, 4, "horizontal");
  };
  return {
    makeNewGameboard,
    getGameboard,
    getName,
    setScreenName,
    getScreenName,
    setAsComputer,
  };
}
