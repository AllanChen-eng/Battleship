export function DeployementPage(
  availableShips,
  player,
  rotation = "horizontal",
) {
  function setRightsideName(name) {
    const heading = document.querySelector("#player2-card h3");
    heading.innerHTML = "";
    heading.textContent = `${name}`;
  }
  function setLeftSideName(name) {
    const heading = document.querySelector("#player1-card h3");
    heading.innerHTML = "";
    heading.textContent = `${name}`;
  }

  function renderShipDeploymentPage() {
    let left = document.querySelector("#player1-grid-container");
    let right = document.querySelector("#player2-grid-container");
    left.innerHTML = "";
    right.innerHTML = "";
    // grid of avaiable ships
    setLeftSideName("Ships to Deploy");
    setRightsideName("Deployed Ships");
    const gridContainer = document.createElement("div");
    gridContainer.id = "deployment-grid-container";
    if (rotation == "vertical") {
      gridContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
    } else if (rotation == "horizontal") {
      gridContainer.style.gridTemplateRows = "repeat(5, 1fr)";
    }
    availableShips.forEach((shipLength) => {
      const newShip = document.createElement("div");
      newShip.dataset.shipLength = shipLength;
      newShip.dataset.rotation = rotation;
      newShip.style.backgroundColor = "blue";
      if (rotation == "horizontal") {
        newShip.style.height = "100%";
        newShip.style.width = `${10 * shipLength}%`;
      } else if (rotation == "vertical") {
        newShip.style.width = "100%";
        newShip.style.height = `${10 * shipLength}%`;
      }
      gridContainer.appendChild(newShip);
      makeElementDraggable(newShip);
      makeElementDroppable(newShip);
    });
    renderDeployedShips(right);
    left.appendChild(gridContainer);
  }
  function makeRotateShipDeploymentButton() {
    const container = document.querySelector("#deployment");
    const button = document.createElement("button");
    button.id = "rotation-btn";
    button.textContent = "Rotate";
    button.addEventListener("click", () => {
      renderShipDeploymentPage(availableShips, player);
      rotation = rotation === "vertical" ? "horizontal" : "vertical";
    });
    container.appendChild(button);
  }
  function renderDeployedShips(location) {
    location.innerHTML = "";
    let newGrid = player.getGameboard().getBoard();
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
        location.appendChild(newDiv);
        makeElementDroppable(newDiv);
      }
    }
  }
  function makeElementDraggable(newDiv) {
    newDiv.draggable = true;
    newDiv.addEventListener("dragstart", (e) => {
      const shipData = {
        rotation: newDiv.dataset.rotation,
        length: newDiv.dataset.shipLength,
      };
      e.dataTransfer.setData("text/plain", JSON.stringify(shipData));
    });
  }
  function makeElementDroppable(newDiv) {
    newDiv.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    newDiv.addEventListener("drop", (e) => {
      e.preventDefault();
      const shipData = JSON.parse(e.dataTransfer.getData("text/plain"));
      const length = Number(shipData.length);
      const rotation = shipData.rotation;
      const row = Number(e.currentTarget.dataset.row);
      const col = Number(e.currentTarget.dataset.column);
      availableShips = availableShips.filter((shipLength) => shipLength != length )
      console.log(availableShips);
      player.getGameboard().placeShip(length,row,col,rotation)
      renderShipDeploymentPage();
    });
  }
  makeRotateShipDeploymentButton();
  return { renderShipDeploymentPage };
}
