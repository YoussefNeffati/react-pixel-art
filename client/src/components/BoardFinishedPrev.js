import React, { useEffect, useState } from "react";
import "../styles/boardinprogressprev.scss";
import { Link } from "react-router-dom";
import DrawingPanel from "./DrawingPanel";

export default function BoardInProgressPrev() {
	const [boardsFinished, setboardsFinished] = useState([]);

	useEffect(() => {
		getLatestBoard();
	}, []);

	function getLatestBoard() {
		fetch("/sixLastBoardsFinished")
			.then((res) => res.json())
			.then((data) => {
				setboardsFinished(data);
			});
	}
	let boards = [];

	for (let i = 0; i < boardsFinished.length; i++) {
		const boardFinished = boardsFinished[i];

		boards.push(
			<div className="board" key={i}>
				<DrawingPanel
					width={boardFinished.board.nLines}
					height={boardFinished.board.nColumns}
					prevProgress={true}
					prevPixels={boardFinished.pixels}
				/>
			</div>
		);
	}

	return (
		<div className="containerBoard">
			<h1>
				Les six derniers tableaux terminés{" "}
				<Link to="/allBoard/finished" style={{ textDecoration: "none", color: "white" }}>
					<button className="button"> Voir tous les Pixelboards terminés</button>
				</Link>
			</h1>

			<div className="sixboards">{boards}</div>
		</div>
	);
}
