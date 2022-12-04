import React, { useEffect, useState } from "react";
import "../styles/boardinprogressprev.scss";
import { Link } from "react-router-dom";
import DrawingPanel from "./DrawingPanel";

export default function BoardInProgressPrev() {
	const [boardsInProgress, setBoardInProgress] = useState([]);

	useEffect(() => {
		getLatestBoard();
	}, []);

	function getLatestBoard() {
		fetch("/sixLastBoardsInProgress")
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				setBoardInProgress(data);
			});
	}
	let boards = [];

	for (let i = 0; i < boardsInProgress.length; i++) {
		const boardInProgress = boardsInProgress[i];
		//localStorage.setItem("currentboad", boardInProgress._id);

		boards.push(
			<div className="col-3 board" key={i}>
				<DrawingPanel
					width={boardInProgress.board.nLines}
					height={boardInProgress.board.nColumns}
					prevProgress={true}
					prevPixels={boardInProgress.pixels}
				/>
				<Link to={`/draw/${boardInProgress._id}`} style={{ textDecoration: "none", color: "white" }}>
					<button className="buttonBoard">Dessiner sur ce pixelboard</button>
				</Link>
			</div>
		);
	}

	return (
		<div className="containerBoard">
			<h1>
				Les six derniers tableaux en cours{" "}
				<Link to="/allBoard/progress" style={{ textDecoration: "none", color: "white" }}>
					<button className="button"> Choisir un pixelboard à dessiner</button>
				</Link>
			</h1>

			<div className="sixboards">{boards}</div>
		</div>
	);
}
