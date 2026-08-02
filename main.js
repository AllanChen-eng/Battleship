import { UIFactory } from "./UIHandler.js";
import { player } from "./player.js";
import { DeploymentPage } from "./DeploymentPage.js";
let fleet = [5, 4, 3,3, 2];
let currentTurn;
const UI = UIFactory();

function initializeGame() {
  currentTurn = player2;
  UI.setRightsideName(player2.getScreenName());
  player1.makeNewGameboard(10, 10);
  player2.makeNewGameboard(10, 10);
  player2.setAsComputer();
  const deploymentPage = DeploymentPage(
    fleet,
    player1,
    player2,
    "vertical",
    startGame,
  );
  deploymentPage.renderShipDeploymentPage();
  //swapTurn();
}
function startGame() {
  UI.setRightsideName(player2.getScreenName());
  UI.setLeftSideName(player1.getScreenName());
  UI.renderBoardAsAlly(player1);
  UI.renderBoardAsOpponent(player2);
  setCurrentPlayer(player1);
  const button = document.querySelector("#rotation-btn");
  button.remove();
  const replacementBtn = document.createElement("button");
  replacementBtn.id = "rotation-btn";
  replacementBtn.textContent = "New Game";
  replacementBtn.addEventListener("click", () => {
    initializeGame();
    replacementBtn.remove();
  });
  document.querySelector("#deployment").append(replacementBtn);
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
          `${player.getScreenName()} targeted cordinates (${column}, ${row})!`,
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
      UI.makeAnnouncement(`The Computer has targeted (${col},${row})!`);
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
const player1 = player("player1",fleet);
const player2 = player("player2",fleet);
initializeGame();
console.log("main script has been ran");
