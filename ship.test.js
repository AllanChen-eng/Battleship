const ship = require('./ship');

test("Get ship's legnth", () => {
  expect(ship(5).getLength()).toBe(5);
});