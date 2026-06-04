const { error } = require("carthage/core/required/api");
const ship = require("./ship");
function gameboard() {
  let shipPositions = 0;
  let attackPositions = 0;
  let missedShots = [];

  let getBoard = () => {
    return shipPositions;
  };

  let createBoard = (sizeX, sizeY) => {
    const grid = Array(sizeY)
      .fill(null)
      .map(() => Array(sizeX).fill(null));
   shipPositions = grid;
       const grid2 = Array(sizeY)
      .fill(null)
      .map(() => Array(sizeX).fill(null));
   attackPositions = grid2;
  };
  let placeShip = (length, startPositionX, startPositionY, direction) => {
    let newShip = ship(length);
    if ((direction == "horizontal")) {
      if (
        startPositionY < 0 ||
        startPositionX < 0 ||
        startPositionX + length > shipPositions.length
      ) {
        throw new Error("Invalid placement");
      }
      for (let x = startPositionX; x < startPositionX + length; x++) {
                if (shipPositions[x][startPositionY]!=null) throw new Error("Another ship in the way");
       shipPositions[x][startPositionY] = newShip;
      }
    } else {//default vertical
        //check for invalid placement
      if (
        startPositionY < 0 ||
        startPositionX < 0 ||
        startPositionY + length > shipPositions[0].length
      ) {
        throw new Error("Invalid placement");
      }
      for (let y = startPositionY; y < startPositionY + length; y++) {
        if (shipPositions[startPositionX][y]!=null) throw new Error("Another ship in the way");
       shipPositions[startPositionX][y] = newShip;
      }
    }
  };
  let receiveAttack = (x, y) => {
    //determines whether or not the attack hits a ship
    //and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
    //reject if the hit is a repeat
    let tile = shipPositions[x][y];
    if(attackPositions[x][y] != null){
      throw new Error("Position has already been attacked on ");
    }
    if(tile == null){
      //shot missed
      missedShots.push({x,y});
     attackPositions[x][y] = "missed";
    }else{
      tile.isHit();
     attackPositions[x][y]= "hit";
    }
  };
  let getMissedShots = () =>{
    return missedShots;
  };
  let hasLost = ()=>{
// return true if all ships have been sunk, false otherwise
  };
  return { getBoard, createBoard, placeShip, receiveAttack, getMissedShots, hasLost };
}
module.exports = gameboard;
