import React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const ColorChooser =()=> {
  const [color, setColor] = useColor("hex", "#00FF00");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Color picker</h1>
      <ColorPicker
        width={600}
        height={400}
        color={color}
        onChange={setColor}
        hideHSV
        dark
      />
    </div>
  );
}

export default ColorChooser
