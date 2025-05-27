// src/config/MapConfig.js
export const roomCoordinates = {
  S401: [0, 4],
  S402: [1, 4],
  S403: [2, 4],
  S404: [3, 4],
  R401: [4, 3],
  R402: [4, 2],
  R403: [4, 1],
  R404: [4, 0],
};

export const corridorNodes = [
  [0, 4], [1, 4], [2, 4], [3, 4], // vertical corridor beside S-Wing
  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4] // horizontal corridor beside R-Wing
];

export const allowedNodes = [...corridorNodes];
