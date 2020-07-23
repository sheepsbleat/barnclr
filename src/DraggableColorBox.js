import React from "react";

function DraggableColorBox({ color }) {
  return <div style={{ backgroundColor: color }}>{color}</div>;
}
export default DraggableColorBox;
