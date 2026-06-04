const gameboard = require("./gameboard");

test("Get the current Board", () => {
  let board = gameboard();
  expect(board.getBoard()).toEqual(0);
});

test("Check to see if a grid is properly created", () => {
  let board = gameboard();
  let expected = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  board.createBoard(4, 6);
  expect(board.getBoard()).toEqual(expected);
});

test("Ship properly placed on gameboard", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.placeShip(5, 2, 1, "horizontal");
  for (let x = 2; x < 5 + 2; x++) {
    expect(board.getBoard()[x][1].getLength()).toBe(5);
  }
});

test("Reject placement if ship goes outside of board vertically", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  expect(() => {
    board.placeShip(5, 8, 6);
  }).toThrow();
});

test("Reject placement if ship goes outside of board horizontally", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  expect(() => {
    board.placeShip(5, 8, 3, "horizontal");
  }).toThrow();
});

test("Reject placement if there is another ship in the way", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.placeShip(5, 5, 5, "vertical");
  expect(() => {
    board.placeShip(5, 4, 5, "horizontal");
  }).toThrow();
  expect(() => {
    board.placeShip(5, 5, 4, "vertical");
  }).toThrow();
});
test("Receive Attack method should cause ships to call isHit() for ship in tile", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.placeShip(5, 5, 5, "vertical");
  board.receiveAttack(5, 6);
  expect(board.getBoard()[5][6].getHits()).toBe(1);
});
test("Receive attack should not accept attack if already hit at that spot", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.placeShip(5, 5, 5, "vertical");
  board.receiveAttack(5, 6);
  expect(()=>{board.receiveAttack(5,6)}).toThrow();
});
test("Gameboard should be able to retrieve a list of all missed shots", () => {
    let board = gameboard();
  board.createBoard(10, 10);
  board.receiveAttack(0, 0);
  board.receiveAttack(5, 5);
  board.receiveAttack(7, 4);
  board.receiveAttack(9, 9);
  expect(board.getMissedShots()).toEqual([{ x: 0, y: 0 },{x: 5,y: 5},{x: 7, y: 4},{x: 9, y: 9}]);
});
test("Gameboard should be able to report if all ships sunk", () => {});
