import { UIFactory } from "./UIHandler.js";
import { player } from "./player.js";
const player1 = player("player1");
const player2 = player("player2");
player2.setScreenName("Computer");
const UI = UIFactory();
UI.setRightsideName(player2.getScreenName());
player1.makeNewGameboard(10, 10);
player2.makeNewGameboard(10, 10);
UI.renderBoardAsOpponent(player2);
UI.renderBoardAsAlly(player1);
setCurrentPlayer(player1);
function currentPlayer(player) {
  //changes the view to match current player - opponent's board is clickable while
  //ally board shows current ship locations
  if (player.getName() == "player1") {
    UI.renderBoardAsAlly(player1);
    UI.renderBoardAsOpponent(player2);
  } else {
    UI.renderBoardAsAlly(player2);
    UI.renderBoardAsOpponent(player1);
  }
}
function setCurrentPlayer(player) {
  const opponent = player === player1 ? player2 : player1;
  const hover = document.querySelectorAll(
    `.gridBox[data-player="${opponent.getName()}"]`,
  );
  hover.forEach((box) => {
    box.addEventListener("mouseenter", (e) => {
      e.target.dataset.originalColor = window.getComputedStyle(
        e.target,
      ).backgroundColor;
      e.target.style.backgroundColor = "red";
    });
    box.addEventListener("click", (e) => {
      let column = Number(e.target.dataset.column);
      let row = Number(e.target.dataset.row);
      let playerTile = e.target.dataset.player;
      if (opponent.getGameboard().receiveAttack(row, column)) {
        UI.makeAnnouncement("Ship has been sunk!");
      } else {
        UI.makeAnnouncement(
          `${player.getName()} targeted cordinates (${column}, ${row})!`,
        );
      }
      UI.renderBoardAsOpponent(opponent);
      //ideally, we want to pass the turn
      setCurrentPlayer(player);
    });
    box.addEventListener("mouseleave", (e) => {
      e.target.style.backgroundColor = e.target.dataset.originalColor;
    });
  });
}
function makeComputerMove(){
    //while(doesnotThrow)
    //keep making receiveAttack calls then break out of loop
    //swap turns
}
console.log("main script has been ran");
