import React, { useState } from "react";
import "../styles/editor.css";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
import { Link } from "react-router-dom";

export default function Editor() {
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("Commencer à dessiner");
  const [selectedColor, setColor] = useState("#f44336");
  const [nbUsersInscrit, setNbUsersInscrit] = useState(0);
  const [nbPixelboard, setNbPixelboard] = useState(0);
  

  function initializeDrawingPanel() {
    setHideOptions(!hideOptions);
    setHideDrawingPanel(!hideDrawingPanel);

    buttonText === "start drawing"
      ? setButtonText("reset")
      : setButtonText("start drawing");
  }

  function changeColor(color) {
    setColor(color.hex);
  }

  return (
    <div id="editor">
      <h1>Pixel Editor</h1>
      <span>Nombre de joueur : {nbUsersInscrit}</span>
      <span>Nombre de Pixelboard : {nbPixelboard}</span>
      {hideDrawingPanel && <h2>Entrez les dimensions du Pixelboard</h2>}
      {hideDrawingPanel && (
        <div id="options">
          <div className="option">
            <input
              type="number"
              className="panelInput"
              defaultValue={panelWidth}
              onChange={(e) => {
                setPanelWidth(e.target.value);
              }}
            />
            <span>Largeur</span>
          </div>
          <div className="option">
            <input
              type="number"
              className="panelInput"
              defaultValue={panelHeight}
              onChange={(e) => {
                setPanelHeight(e.target.value);
              }}
            />
            <span>Hauteur</span>
          </div>
        </div>
      )}

      
      <button onClick={initializeDrawingPanel} className="button">
        {buttonText}
      </button>
   
      {hideOptions && (
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      )}

      {hideOptions && (
        <DrawingPanel
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
        />
      )}
    </div>
  );
}
