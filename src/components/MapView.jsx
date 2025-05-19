import React from "react";
import { aStar } from "../utils/aStar";

const roomCoordinates = {
  S401: [0, 4], S402: [0, 3], S403: [0, 2], S404: [0, 1],
  R401: [-1, 0], R402: [-2, 0], R403: [-3, 0], R404: [-4, 0],
};

const coordinateToRoom = Object.fromEntries(
  Object.entries(roomCoordinates).map(([room, coord]) => [coord.toString(), room])
);

const getArrowSymbol = (from, to) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  if (dx === 1 && dy === 0) return "→";
  if (dx === -1 && dy === 0) return "←";
  if (dx === 0 && dy === 1) return "↓";
  if (dx === 0 && dy === -1) return "↑";
  return "";
};

const MapView = ({ from, to }) => {
  const start = roomCoordinates[from];
  const end = roomCoordinates[to];
  const path = aStar(start, end);

  const pathSet = new Set(path.map(coord => coord.toString()));

  const isInPath = (coord) => pathSet.has(coord.toString());

  const renderNode = (coord) => {
    const key = coord.toString();
    const room = coordinateToRoom[key];
    const isStart = key === start.toString();
    const isEnd = key === end.toString();
    const inPath = isInPath(coord);

    if (!room && !inPath) {
      return <div key={key} style={{ width: 60, height: 60, margin: 2 }} />;
    }

    return (
      <div
        key={key}
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          backgroundColor: isStart
            ? "#55efc4"
            : isEnd
            ? "#fd79a8"
            : inPath
            ? "#ffeaa7"
            : "#dfe6e9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          border: room ? "2px solid #636e72" : "none",
          margin: 2,
          position: "relative",
        }}
      >
        {room || ""}
        {inPath && (
          <div
            style={{
              position: "absolute",
              top: -20,
              animation: "bounce 1s infinite",
            }}
          >
            {getArrowSymbol(path[path.indexOf(coord) - 1] || coord, coord)}
          </div>
        )}
      </div>
    );
  };

  const generateGrid = () => {
    const grid = [];

    // Render grid based on coordinates
    for (let y = -4; y <= 0; y++) {
      const row = [];
      for (let x = 0; x <= 4; x++) {
        row.push(renderNode([y, x]));
      }
      grid.push(
        <div key={`row-${y}`} style={{ display: "flex" }}>
          {row}
        </div>
      );
    }
    return grid;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Navigation Path from {from} to {to}</h2>
      <div
        style={{
          border: "2px solid #2d3436",
          padding: 10,
          display: "inline-block",
          background: "#ffffff",
        }}
      >
        {generateGrid()}
      </div>
      <style>
        {`
        @keyframes bounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
};

export default MapView;
