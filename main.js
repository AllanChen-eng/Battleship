import { UIFactory } from "./UIHandler.js";
import { player } from "./player.js";
import { DeployementPage } from "./DeployementPage.js";
const player1 = player("player1");
const player2 = player("player2");
let fleet = [5,4,3,2];
player2.setScreenName("Computer");
let currentTurn = player1;
const UI = UIFactory();

function startGame() {
  currentTurn = player1;
  UI.setRightsideName(player2.getScreenName());
  player1.makeNewGameboard(10, 10);
  player2.makeNewGameboard(10, 10);
  swapTurn();
}
function swapTurn() {
  //changes the view to match current player - opponent's board is clickable while
  //ally board shows current ship locations
  if (currentTurn.getName() == "player1") {
    currentTurn = player2;
    UI.renderBoardAsAlly(player1);
    UI.renderBoardAsOpponent(player2);
    setCurrentPlayer(player1);
  } else {
    // for now, just play ai(player2) move
    currentTurn = player1;
    getComputerMove();
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
      if (opponent.getGameboard().hasLost()) {
        renderScoreScreen(player);
      } else {
        swapTurn();
      }
    });
    box.addEventListener("mouseleave", (e) => {
      e.target.style.backgroundColor = e.target.dataset.originalColor;
    });
  });
}
function getComputerMove() {
  const board = player2.getGameboard();
  const rows = board.getShipPositions().length;
  const cols = board.getShipPositions()[0].length;

  while (true) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    try {
      player1.getGameboard().receiveAttack(row, col);
      UI.makeAnnouncement(`The Computer has targetted ${col},${row}!`);
      break;
    } catch {}
  }
  swapTurn();
}
function renderScoreScreen(winner) {
  UI.makeAnnouncement(`${winner.getScreenName()} has won!`);
  UI.renderBoardAsAlly(player1);
  UI.renderBoardAsAlly(player2);
}
const deployment = document.querySelector("#deployment-btn");
deployment.addEventListener("click",()=>{
console.log("deployment button hit");
const deploymentPage = DeployementPage(fleet,player1,"vertical");
deploymentPage.renderShipDeploymentPage();
deployment.remove();
});
startGame();
console.log("main script has been ran");
