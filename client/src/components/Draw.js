import React, { useEffect, useState } from "react";
import DrawingPanel from "./DrawingPanel";
import BoardInformations from "./BoardInformations";
import { CirclePicker } from "react-color";
import { useParams } from "react-router-dom";

export default function Draw() {
	const [selectedColor, setColor] = useState("#f44336");
	const params = useParams();
	const [board, setBoard] = useState({});
	const [author, setAuthor] = useState("");

	useEffect(() => {
		getBoardData();
	}, []);

	function changeColor(color) {
		setColor(color.hex);
	}

	function getBoardData() {
		fetch(`http://localhost:8000/board/${params.idboard}`)
			.then((res) => res.json())
			.then((data) => {
				localStorage.setItem("currentboad", params.idboard);
				if (!data.author) {
					setAuthor("Anonyme");
				} else {
					setAuthor(data.author.name);
				}
				setBoard(data);
			});
	}

	return (
		<div id="editor">
			<h1>Pixel Editor</h1>
			<CirclePicker color={selectedColor} onChangeComplete={changeColor} />
			<div className="row">
				<div className="col-6">
					<BoardInformations
						author={author}
						title={board.title}
						startDate={board.createdAt}
						endDate={board.finishedAt}
						delaiSecondes={board.delai}
						width={board.nLines}
						height={board.nColumns}
						statut={board.statut}
					/>
				</div>
				<div className="col-6">
					<DrawingPanel
						width={board.nLines}
						height={board.nColumns}
						selectedColor={selectedColor}
						delaiMin={board.delai / 60}
						delaiSec={board.delai % 60}
					/>
				</div>
			</div>
		</div>
	);
}
