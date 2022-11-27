import React, { useState } from "react";
import "../styles/editor.scss";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
import Countdown from 'react-countdown';
import Login from "./Login";

export default function Editor() {
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("Commencer à dessiner");
  const [selectedColor, setColor] = useState("#f44336");
  const [nbUsersInscrit, setNbUsersInscrit] = useState(0);
  const [nbPixelboard, setNbPixelboard] = useState(0);
  
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      window.location.reload(false);
    } else {
      // Render a countdown
      return <span>{minutes}:{seconds}</span>;
    }
  };

  function initializeDrawingPanel() {
    setHideOptions(!hideOptions);
    setHideDrawingPanel(!hideDrawingPanel);

    buttonText === "Commencer à dessiner"
      ? setButtonText("reset")
      : setButtonText("Commencer à dessiner");
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


      <button onClick={initializeDrawingPanel} className="button" id="backgroundDarkLight">
        {buttonText}
      </button>

      {hideOptions && (
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      )}

      {hideOptions && (
        <>Temps restant : <Countdown
          date={Date.now() + 1500000}
          renderer={renderer} />
          
          <DrawingPanel
            width={panelWidth}
            height={panelHeight}
            selectedColor={selectedColor} /></>
      )}
    </div>
  );
}
