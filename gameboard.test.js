import { gameboard } from "./gameboard";
test("Get the current Board", () => {
  let board = gameboard();
  expect(board.getBoard()).toEqual(0);
});

test("Check to see if a grid is properly created", () => {
  let board = gameboard();
  let expected = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  board.createBoard(4, 6);
  expect(board.getBoard()).toEqual(expected);
});

test("Ship properly placed on gameboard", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.placeShip(5, 2, 1, "horizontal");
  for (let col = 1; col < 5 + 1; col++) {
    expect(board.getBoard()[2][col].getLength()).toBe(5);
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
    board.placeShip(5, 8, 7, "horizontal");
  }).toThrow();
});

test("Reject placement if there is another ship in the way", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.placeShip(5, 5, 5, "vertical");
  expect(() => {
    board.placeShip(5, 5, 2, "horizontal");
  }).toThrow();
  expect(() => {
    board.placeShip(5, 2, 5, "vertical");
  }).toThrow();
});
test("Receive Attack method should cause ships to call isHit() for ship in tile", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.placeShip(5, 5, 5, "vertical");
  board.receiveAttack(6, 5);
  expect(board.getBoard()[6][5].getHits()).toBe(1);
});
test("Receive attack should not accept attack if already hit at that spot", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.placeShip(5, 5, 5, "vertical");
  board.receiveAttack(5, 6);
  expect(() => {
    board.receiveAttack(5, 6);
  }).toThrow();
});
test("Gameboard should be able to retrieve a list of all missed shots", () => {
  let board = gameboard();
  board.createBoard(10, 10);
  board.receiveAttack(0, 0);
  board.receiveAttack(5, 5);
  board.receiveAttack(7, 4);
  board.receiveAttack(9, 9);
  expect(board.getMissedShots()).toEqual([
    { row: 0, column: 0 },
    { row: 5, column: 5 },
    { row: 7, column: 4 },
    { row: 9, column: 9 },
  ]);
});

test("Gameboard should be able to report if all ships sunk", () => {
  let board = gameboard();
  board.createBoard(1, 5);
  board.placeShip(5, 0, 0, "horizontal");
  for (let col = 0; col < 5; col++) {
    board.receiveAttack(0, col);
  }
  expect(board.hasLost()).toBe(true);
});
test("Gameboard should retrieve a 2D array of hits and misses", () => {
  let board = gameboard();
  board.createBoard(6, 4);
  board.receiveAttack(0, 0);
  board.receiveAttack(2, 3);
  board.receiveAttack(5, 1);
  board.receiveAttack(0, 2);
  let expected = [
    ["miss", null, "miss", null],
    [null, null, null, null],
    [null, null, null, "miss"],
    [null, null, null, null],
    [null, null, null, null],
    [null, "miss", null, null],
  ];
  expect(board.getAttackPositions()).toEqual(expected);
});
