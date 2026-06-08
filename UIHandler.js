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
          newDiv.style.backgroundColor = "crimson";
        } else if (attackPositionsArray[row][column] == "hit") {
          newDiv.textContent = "x";
        }
        container.appendChild(newDiv);
      }
    }
    setClickFor(player);
  }
  function renderBoardAsAlly(player) {
    //No event listeners here, just locations of hits and misses
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
        let shipPositionsArray = player.getGameboard().getShipPositions();
        if (shipPositionsArray[row][column] != null) {
          newDiv.style.backgroundColor = "blue";
        }
        container.appendChild(newDiv);
      }
    }
  }

  function setClickFor(player) {
    const hover = document.querySelectorAll(
      `.gridBox[data-player="${player.getName()}"]`,
    );
    hover.forEach((box) => {
      box.addEventListener("mouseenter", (e) => {
        e.target.dataset.originalColor = window.getComputedStyle(
          e.target,
        ).backgroundColor;
        e.target.style.backgroundColor = "crimson";
      });
      box.addEventListener("click", (e) => {
        let column = Number(e.target.dataset.column);
        let row = Number(e.target.dataset.row);
        let playerTile = e.target.dataset.player;
        if (player.getGameboard().receiveAttack(row, column)) {
          makeAnnouncement("Ship has been sunk!");
        } else {
          makeAnnouncement(
            `${player.getName()} targeted cordinates (${column}, ${row})!`,
          );
        }
        renderBoardAsOpponent(player);
      });
      box.addEventListener("mouseleave", (e) => {
        e.target.style.backgroundColor = e.target.dataset.originalColor;
      });
    });
  }
  function makeAnnouncement(msg) {
    let container = document.querySelector("#announcer");
    container.innerHTML = "";
    container.textContent = `${msg}`;
  }
  return { renderBoardAsOpponent, renderBoardAsAlly, makeAnnouncement };
}
