import React, { useRef, useState } from "react";
import "../styles/drawingPanel.scss";
import Row from "./Row";
import Countdown from "react-countdown";
import { exportComponentAsPNG } from "react-component-export-image";

export default function DrawingPanel(props) {
	const { width, height, selectedColor, delaiMin, delaiSec, prevProgress, prevPixels } = props;

	console.log("width, height", width, height);
	const panelRef = useRef();

	const [hideCompteur, setHideCompteur] = useState(false);
	const [disable, setDisable] = useState(false);

	const delai = parseInt(delaiMin) * 60000 + parseInt(delaiSec) * 1000;

	const renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			setHideCompteur(false);
			setDisable(false);
			return <DrawingPanel />;
		} else {
			// Render a countdown
			setDisable(true);
			return (
				<span>
					Tu peux rejouer dans {minutes} minutes et {seconds} secondes
				</span>
			);
		}
	};

	let rows = [];

	// filter the pixels of the board in progress that are in the current line
	function getPixels(line) {
		let pixels = prevPixels.filter((pixel) => pixel.x === line);
		if (pixels) {
			return pixels;
		} else {
			return [];
		}
	}

	for (let i = 0; i < height; i++) {
		let pixels;
		if (prevProgress) {
			pixels = getPixels(i);
		}
		rows.push(<Row key={i} line={i} width={width} selectedColor={selectedColor} prevProgress={prevProgress} prevPixels={pixels} />);
	}

	function handleClick() {
		setHideCompteur(true);
	}

	return (
		<div id="drawingPanel">
			<div id="pixels" ref={panelRef} onClick={handleClick} disabled={disable}>
				{rows}
			</div>
			{hideCompteur && <Countdown date={Date.now() + delai} renderer={renderer} />}
			<button onClick={() => exportComponentAsPNG(panelRef)} className="containerButton">
				<span className="material-symbols-outlined">save</span>
				<span>TELECHARGER</span>
			</button>
		</div>
	);
}
