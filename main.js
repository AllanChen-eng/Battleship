import {UIFactory} from "./UIHandler.js";
import {player} from "./player.js";
const player1 = player("player1");
const player2 = player("player2");
const UI = UIFactory();
player1.makeNewGameboard(15,15);
UI.renderBoard(player1);
console.log("main script has been ran");