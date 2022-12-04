import React, { useEffect, useState } from "react";
import "../styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
	const { width, selectedColor, line, prevProgress, prevPixels } = props;

	let pixels = [];

	// function with promise to get the color of the pixel
	function getPixel(col) {
		let pixel = prevPixels.find((pixel) => pixel.y === col);
		if (pixel) {
			return pixel;
		} else {
			return "";
		}
	}

	for (let i = 0; i < width; i++) {
		let pixel;
		if (prevProgress && prevPixels.length > 0) {
			pixel = getPixel(i);
		}
		pixels.push(<Pixel key={i} line={line} col={i} selectedColor={selectedColor} prevProgress={prevProgress} prevPixels={pixel} />);
	}
	return (
		<div className="row" id={line}>
			{pixels}
		</div>
	);
}
