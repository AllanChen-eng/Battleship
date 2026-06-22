export function UIFactory() {
  function renderBoardAsOpponent(player) {
    let location;
    let newGrid = player.getGameboard().getBoard();
    if (player.getName().includes("player1")) {
      //This is the board the player attacks, therefore it should be on the "opponent's" side
      location = "player1-container";
    } else if (player.getName().includes("player2")) {
      location = "player2-container";
    } else {
      throw new Error("Unknown grid user. Please use player1 or player2");
    }
    const container = document.querySelector(`#${location}`);
    container.innerHTML = "";

    for (let row = 0; row < newGrid.length; row++) {
      for (let column = 0; column < newGrid[0].length; column++) {
        const newDiv = document.createElement("div");
        newDiv.style.backgroundColor = "white";
        newDiv.setAttribute("class", "gridBox");
        newDiv.dataset.column = column;
        newDiv.dataset.row = row;
        newDiv.dataset.player = player.getName();
        let flexBasis = 100 / newGrid.length;
        newDiv.style.flexBasis = `${flexBasis}%`;
        let attackPositionsArray = player.getGameboard().getAttackPositions();
        if (attackPositionsArray[row][column] == "miss") {
          newDiv.style.backgroundColor = "lightcoral";
        } else if (attackPositionsArray[row][column] == "hit") {
          newDiv.textContent = "X";
          newDiv.style.backgroundColor = "crimson";
        }
        container.appendChild(newDiv);
      }
    }
    //setClickFor(player);
  }
  function renderBoardAsAlly(player,location = "player1") {
    //No event listeners here, just locations of hits and misses
    let newGrid = player.getGameboard().getBoard();
    if (player.getName().includes("player1")) {
      location = "player1-container";
    } else if (player.getName().includes("player2")) {
      location = "player2-container";
    } else {
      throw new Error("Unknown grid user. Please use player1 or player2");
    }
    const container = document.querySelector(`#${location}`);
    container.innerHTML = "";
    for (let row = 0; row < newGrid.length; row++) {
      for (let column = 0; column < newGrid[0].length; column++) {
        const newDiv = document.createElement("div");
        newDiv.style.backgroundColor = "white";
        newDiv.setAttribute("class", "gridBox");
        newDiv.dataset.column = column;
        newDiv.dataset.row = row;
        newDiv.dataset.player = player.getName();
        let flexBasis = 100 / newGrid.length;
        newDiv.style.flexBasis = `${flexBasis}%`;
        let shipPositionsArray = player.getGameboard().getShipPositions();
        if (shipPositionsArray[row][column] != null) {
          newDiv.style.backgroundColor = "blue";
        }
        let attackTargettedPositionsArray = player.getGameboard().getAttackPositions();
        if(attackTargettedPositionsArray[row][column] == "miss"){
          newDiv.style.backgroundColor = "lightcoral";
        }else if(attackTargettedPositionsArray[row][column] == "hit"){
          newDiv.style.backgroundColor = "black";
        }
        container.appendChild(newDiv);
      }
    }
  }


  function makeAnnouncement(msg) {
    let container = document.querySelector("#announcer");
    container.innerHTML = "";
    container.textContent = `${msg}`;
  }
  function setRightsideName(name) {
    const heading = document.querySelector("#player2-card h3");
    heading.innerHTML = "";
    heading.textContent = `${name}`;
  }

  function renderShipDeploymentPage(availableShips, player,rotation) {
    let left = document.querySelector("#player1-container");
    let right = document.querySelector("#player2-container");
    left.innerHTML = "";
    right.innerHTML = "";
    // grid of avaiable ships
        for (let row = 0; row < newGrid.length; row++) {
      for (let column = 0; column < newGrid[0].length; column++) {
        const newDiv = document.createElement("div");
        newDiv.style.backgroundColor = "white";
        newDiv.setAttribute("class", "borderlessBox");
        newDiv.dataset.column = column;
        newDiv.dataset.row = row;
        newDiv.dataset.player = player.getName();
        let flexBasis = 100 / newGrid.length;
        newDiv.style.flexBasis = `${flexBasis}%`;
        document.querySelector("#player1-container").appendChild(newDiv);
      }
    }
    //grid of current ships in the player's board
    renderBoardAsAlly(player, "player2");
  }
  return {
    renderBoardAsOpponent,
    renderBoardAsAlly,
    makeAnnouncement,
    setRightsideName,
  };
}
