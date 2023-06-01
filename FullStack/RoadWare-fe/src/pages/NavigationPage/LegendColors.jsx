import React from "react";

const dangerCode = { 0: "Low", 1: "Medium", 2: "High" };
const LegendColors = ({ color, code }) => {
  return (
    <div id="legend" style={{ backgroundcolor: color }}>
      Danger Level {dangerCode[code]}
    </div>
  );
};
export default LegendColors;
