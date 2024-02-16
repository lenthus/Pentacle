import React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { useModal } from "../../context/Modal";


const ColorChooser =({bColor,setBColor})=> {
  const [color, setColor] = useColor("hex", "#00FF00");
  const {closeModal} = useModal()
  const handleBColor = (e) =>{setBColor(color)
  closeModal()}



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
      <button
      className="backgroundButton"
      onClick={handleBColor}
      >Set Color</button>
    </div>
  );
}

export default ColorChooser
