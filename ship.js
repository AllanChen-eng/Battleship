export function ship(length) {
  var hits = 0;
  var sunk = false;
  let getLength = () => {
    return length;
  };
  let getHits = () => {
    return hits;
  };
  let isSunk = () => {
    return sunk;
  };
  let isHit = () => {
    hits++;
    if (hits >= length) sunk = true;
  };
  return { getLength, getHits, isHit, isSunk };
}
