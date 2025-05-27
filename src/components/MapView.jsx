// src/components/MapView.jsx
import React from "react";
import { aStar } from "../utils/aStar";
import { roomCoordinates, allowedNodes } from "../config/MapConfig";

const coordinateToRoom = Object.fromEntries(
  Object.entries(roomCoordinates).map(([room, coord]) => [coord.toString(), room])
);

const getArrowSymbol = (from, to) => {
  if (!from || !to) return "";
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  if (dx === 1 && dy === 0) return "↓";
  if (dx === -1 && dy === 0) return "↑";
  if (dx === 0 && dy === 1) return "→";
  if (dx === 0 && dy === -1) return "←";
  return "";
};

const MapView = ({ from, to }) => {
  const start = roomCoordinates[from];
  const end = roomCoordinates[to];
  const path = aStar(start, end, allowedNodes);

  const pathSet = new Set(path.map(coord => coord.toString()));

  const isInPath = (coord) => pathSet.has(coord.toString());

  const renderNode = (coord, index) => {
    const key = coord.toString();
    const room = coordinateToRoom[key];
    const isStart = key === start.toString();
    const isEnd = key === end.toString();
    const inPath = isInPath(coord);

    return (
      <div
        key={key}
        style={{
          width: 60,
          height: 60,
          borderRadius: 6,
          margin: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          backgroundColor: isStart
            ? "#55efc4"
            : isEnd
            ? "#fd79a8"
            : room
            ? "#dfe6e9"
            : inPath
            ? "#ffeaa7"
            : "#ffffff",
          border: room ? "2px solid #636e72" : "1px dashed #ccc",
          position: "relative"
        }}
      >
        {room || ""}
        {inPath && !room && index > 0 && (
          <div style={{ position: "absolute", fontSize: 20 }}>
            {getArrowSymbol(path[index - 1], coord)}
          </div>
        )}
      </div>
    );
  };

  const generateGrid = () => {
    const grid = [];
    for (let row = 0; row <= 4; row++) {
      const currentRow = [];
      for (let col = 0; col <= 4; col++) {
        currentRow.push(renderNode([row, col], path.findIndex(p => p[0] === row && p[1] === col)));
      }
      grid.push(
        <div key={`row-${row}`} style={{ display: "flex" }}>
          {currentRow}
        </div>
      );
    }
    return grid;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Navigation from {from} to {to}</h2>
      <div
        style={{
          border: "2px solid #2d3436",
          padding: 10,
          display: "inline-block",
          background: "#fff"
        }}
      >
        {generateGrid()}
      </div>
    </div>
  );
};

export default MapView;
