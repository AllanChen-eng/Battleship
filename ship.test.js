const ship = require("./ship");

test("Get ship's length", () => {
  expect(ship(5).getLength()).toBe(5);
});

test("When a ship is hit, the hit variable increments", () => {
  let battleship = ship(10);
  battleship.isHit();
  expect(battleship.getHits()).toBe(1);
});

test("Check if a ship is sunk or not", () => {
  expect(ship(5).isSunk()).toBe(false);
});

test("A ship gets sunk after hits >= length", () => {
  let cruiser = ship(5);
  for (let x = 0; x < 5; x++) {
    cruiser.isHit();
  }
  expect(cruiser.isSunk()).toBe(true);
});
