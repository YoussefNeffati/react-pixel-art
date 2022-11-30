import React, { useRef, useState } from "react";
import "../styles/drawingPanel.scss";
import Row from "./Row";
import Countdown from 'react-countdown';
//import { exportComponentAsPNG } from "react-component-export-image";

export default function DrawingPanel(props) {
  const { width, height, selectedColor } = props;

  const panelRef = useRef();

  const [hideCompteur, setHideCompteur] = useState(false);
  const [disable, setDisable] = useState(false);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setHideCompteur(false);
      setDisable(false);
      return <DrawingPanel/>
    } else {
      // Render a countdown
      setDisable(true)
      return <span>Tu peux rejouer dans {minutes}:{seconds}</span>;
    }
  };

  let rows = [];

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor}/>);
  }


  function handleClick() {
    setHideCompteur(true);
  }

  return (
    <div id="drawingPanel">
      <div id="pixels" ref={panelRef} onClick={handleClick} disabled={disable}>
        {rows}
      </div>
      {hideCompteur && (
        <Countdown
          date={Date.now() + 300000}
          renderer={renderer} />
      )}
      {/* <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
        Export as PNG
      </button> */}
    </div>
  );
}
