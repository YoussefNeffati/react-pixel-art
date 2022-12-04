import React, { useEffect, useState } from "react";
import "../styles/boardinprogressprev.scss";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import DrawingPanel from "./DrawingPanel";

export default function BoardInProgressPrev() {
	const [boardInProgress, setBoardInProgress] = useState([]);

	useEffect(() => {
		getLatestBoard();
	}, []);

	function getLatestBoard() {
		fetch("/sixLastBoardsFinished")
			.then((res) => res.json())
			.then((data) => {
				setBoardInProgress(data);
			});
	}

	return (
		<div className="containerBoard">
			<h1>
				Les six derniers tableaux terminés{" "}
				<Link to="/allBoard/finished" style={{ textDecoration: "none", color: "white" }}>
					<button className="button"> Voir tous les Pixelboards terminés</button>
				</Link>
			</h1>

			{<DrawingPanel width={boardInProgress.nrows} height={boardInProgress.ncols} prevProgress={true} prevPixels={boardInProgress.pixels} />}
		</div>
	);
}
