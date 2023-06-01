import React from "react";

const dangerCode = { 0: "Low", 1: "Medium", 2: "High" };

const LegendColors = ({ color, code }) => {
  const divStyle = {
    backgroundColor: color,
    position: 'relative',
    zIndex: 10,
    width: '10.3rem',
    padding: '0.5rem',
    top: '4rem',
    marginLeft: '0.9rem',
    color: 'white',
    borderRadius: '2px',
    opacity: 0.9,
    textAlign: 'center',
  };

  return (
    <div id="legend" style={divStyle}>
      Danger Level <br/> {dangerCode[code]}
    </div>
  );
};

export default LegendColors;
