import React, { useState } from "react";
import "../styles/pixel.scss";
import Popover from "@mui/material/Button";

export default function Pixel(props) {
	const { col, line, selectedColor } = props;

	const [pixelColor, setPixelColor] = useState("#fff");
	const [oldColor, setOldColor] = useState(pixelColor);
	const [canChangeColor, setCanChangeColor] = useState(true);
	const [isMouseEnter, setIsMouseEnter] = useState(false);
	const [authorPixel, setAuthorPixel] = useState("Anonyme(non inscrit)");
	const [datePixel, setDatePixel] = useState("");

	function applyColor() {
		setPixelColor(selectedColor);
		setCanChangeColor(false);

		// call API to save pixel
		fetch("/savepixel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				x: line,
				y: col,
				color: selectedColor,
				board: localStorage.getItem("currentboad"),
				user: localStorage.getItem("iduser")
			})
		});
	}

	function changeColorOnHover() {
		setOldColor(pixelColor);
		setPixelColor(selectedColor);
		// display popover
		if (pixelColor !== "#fff") {
			informationsPixel();
			setIsMouseEnter(true);
		}
	}

	function resetColor() {
		if (canChangeColor) {
			setPixelColor(oldColor);
		}

		setCanChangeColor(true);
		// hide popover
		setIsMouseEnter(false);
	}

	async function informationsPixel() {
		await fetch("/getpixel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				x: line,
				y: col,
				board: localStorage.getItem("currentboad")
			})
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				if (data.user) {
					setAuthorPixel(data.user.name);
				}
				setDatePixel(new Date(data.createdAt).toString());
			});
	}

	return (
		<div
			className="pixel"
			id={line + "-" + col}
			onClick={applyColor}
			onMouseEnter={changeColorOnHover}
			onMouseLeave={resetColor}
			style={{ backgroundColor: pixelColor, border: "1px solid black" }}
		>
			{isMouseEnter && (
				<Popover
					id="popover"
					name="popover"
					open={isMouseEnter}
					anchorReference="anchorPosition"
					anchorPosition={{ top: 100, left: 100 }}
					anchorOrigin={{
						vertical: "top",
						horizontal: "left"
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "left"
					}}
				>
					<div className="popover">
						<div className="popover__header">
							<h3>Informations du pixel</h3>
						</div>
						<div className="popover__body">
							<p>Author: {authorPixel}</p>
							<p>Date de création: {datePixel}</p>
						</div>
					</div>
				</Popover>
			)}
		</div>
	);
}
