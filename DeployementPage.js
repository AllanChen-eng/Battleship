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
    let left = document.querySelector("#player1-container");
    let right = document.querySelector("#player2-container");
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
        newShip.style.width = `${16.6 * shipLength}%`;
      } else if (rotation == "vertical") {
        newShip.style.width = "100%";
        newShip.style.height = `${16.6 * shipLength}%`;
      }
      gridContainer.appendChild(newShip);
      makeElementDraggable(newShip);
    });
    left.appendChild(gridContainer);
  }
  function makeRotateShipDeploymentButton() {
    const container = document.querySelector("#deployment");
    const button = document.createElement("button");
    button.id = "rotation-btn";
    button.textContent = "Rotate";
    console.log(availableShips + "" + player + "" + rotation);
    button.addEventListener("click", () => {
      renderShipDeploymentPage(availableShips, player);
      rotation = rotation === "vertical" ? "horizontal" : "vertical";
    });
    container.appendChild(button);
  }
  function makeElementDraggable(newDiv) {
    newDiv.draggable = true;
    newDiv.addEventListener("dragstart", (e) => {});
  }
  function makeElementDroppable(newDiv) {
    newDiv.addEventListener("dragover", (e) => e.preventDefault());
    newDiv.addEventListener("drop", (e) => {
      e.preventDefault();
      const row = e.target.dataset.row;
      const col = e.target.dataset.col;
      const rotation = e.target.dataset.rotation;
      const length = e.target.dataset.length;
      //check if everything works
    });
  }
  makeRotateShipDeploymentButton();
  return { renderShipDeploymentPage };
}
