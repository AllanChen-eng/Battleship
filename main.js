import {UIFactory} from "./UIHandler.js";
import {player} from "./player.js";
const player1 = player("player1");
const player2 = player("player2");
const UI = UIFactory();
player1.makeNewGameboard(10,10);
player2.makeNewGameboard(10,10);
UI.renderBoardAsOpponent(player2);
UI.renderBoardAsAlly(player1);
function currentPlayer(player){
    //changes the view to match current player - opponent's board is clickable while
    //ally board shows current ship locations
    if(player.getName()=="player1"){
        UI.renderBoardAsAlly(player1);
        UI.renderBoardAsOpponent(player2);
    }else{
        UI.renderBoardAsAlly(player2);
        UI.renderBoardAsOpponent(player1);
    }
}
console.log("main script has been ran");