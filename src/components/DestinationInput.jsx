import React, { useState } from "react";

const DestinationInput = ({ onSubmit }) => {
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination) onSubmit(destination);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "40px" }}>
      <label>Enter your destination room:</label><br />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="e.g., S401"
        style={{ padding: "10px", marginTop: "10px" }}
      />
      <br />
      <button type="submit" style={{ marginTop: "20px" }}>Navigate</button>
    </form>
  );
};

export default DestinationInput;
