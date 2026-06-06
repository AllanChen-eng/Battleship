import {UIFactory} from "./UIHandler.js";
import {player} from "./player.js";
const player1 = player();
const UI = UIFactory();
UI.createGrid();
console.log("main script has been ran");