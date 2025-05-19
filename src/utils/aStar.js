export function aStar(start, goal) {
  const openSet = [start];
  const cameFrom = new Map();

  const gScore = new Map();
  gScore.set(start.toString(), 0);

  const fScore = new Map();
  fScore.set(start.toString(), heuristic(start, goal));

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore.get(a.toString()) - fScore.get(b.toString()));
    const current = openSet.shift();

    if (current[0] === goal[0] && current[1] === goal[1]) {
      return reconstructPath(cameFrom, current);
    }

    for (const neighbor of getNeighbors(current)) {
      const tentativeG = gScore.get(current.toString()) + 1;
      const neighborKey = neighbor.toString();

      if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeG);
        fScore.set(neighborKey, tentativeG + heuristic(neighbor, goal));
        if (!openSet.some(n => n.toString() === neighborKey)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return [];
}

function heuristic([x1, y1], [x2, y2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function reconstructPath(cameFrom, current) {
  const totalPath = [current];
  while (cameFrom.has(current.toString())) {
    current = cameFrom.get(current.toString());
    totalPath.unshift(current);
  }
  return totalPath;
}

function getNeighbors([x, y]) {
  return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
}
