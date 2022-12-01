import React from "react";
import "../styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
	const { width, selectedColor, line } = props;

	let pixels = [];

	for (let i = 0; i < width; i++) {
		pixels.push(<Pixel key={i} line={line} col={i} selectedColor={selectedColor} />);
	}

	return (
		<div className="row" id={line}>
			{pixels}
		</div>
	);
}
