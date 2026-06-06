
export function UIFactory(){

function createGrid(location = "player1-container",gridSize = 15) {
  const container = document.querySelector(`#${location}`);
  for (let x = 0; x < gridSize; x++) {
    for (let n = 0; n < gridSize; n++) {
      const newDiv = document.createElement("div");
      newDiv.setAttribute("class", "gridBox");
      newDiv.dataset.column = x;
      newDiv.dataset.row = n;
      let flexBasis = 100 / gridSize;
      newDiv.style.flexBasis = `${flexBasis}%`;
      container.appendChild(newDiv);
    }
  }
  setClick();
}
function setClick(playerGameBoard) {
  const hover = document.querySelectorAll(".gridBox");
  hover.forEach((box) => {
    box.addEventListener("mouseenter", (e) => {
      e.target.style.backgroundColor = "crimson";
    });
    box.addEventListener("click",(e)=>{
      //playerGameBoard.receiveAttack();
      console.log("Printing dataset column:" + Number(e.target.dataset.column) + "row" + e.target.dataset.row);
    })
    box.addEventListener("mouseleave", (e) => {
      e.target.style.backgroundColor = "white";
    });
    box.style.backgroundColor = "white";
  });
}
return {createGrid}
};
