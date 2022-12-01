import React, { useState } from "react";
import "../styles/pixel.scss";

export default function Pixel(props) {
	const { col, line, selectedColor } = props;

	const [pixelColor, setPixelColor] = useState("#fff");
	const [oldColor, setOldColor] = useState(pixelColor);
	const [canChangeColor, setCanChangeColor] = useState(true);

	function applyColor() {
		console.log("line,col", line, col);
		setPixelColor(selectedColor);
		setCanChangeColor(false);

		// call API to save pixel
	}

	function changeColorOnHover() {
		setOldColor(pixelColor);
		setPixelColor(selectedColor);
	}

	function resetColor() {
		if (canChangeColor) {
			setPixelColor(oldColor);
		}

		setCanChangeColor(true);
	}

	return (
		<div
			className="pixel"
			id={line + "-" + col}
			onClick={applyColor}
			onMouseEnter={changeColorOnHover}
			onMouseLeave={resetColor}
			style={{ backgroundColor: pixelColor, border: "1px solid black" }}
		></div>
	);
}
