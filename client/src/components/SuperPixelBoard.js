import React, { useEffect, useState } from "react";
import "../styles/boardinprogressprev.scss";
import DrawingPanel from "./DrawingPanel";

export default function BoardInProgressPrev() {
	const [boardInProgress, setBoardInProgress] = useState([]);

	useEffect(() => {
		getLatestBoard();
	}, []);

	function getLatestBoard() {
		fetch("/allBoardsAndPixels")
			.then((res) => res.json())
			.then((data) => {
				setBoardInProgress(data);
			});
	}

	return (
		<div className="superPixel">
			<h1>SuperPixelBoard</h1>

			{<DrawingPanel width={boardInProgress.ncols} height={boardInProgress.nrows} prevProgress={true} prevPixels={boardInProgress.pixels} />}
		</div>
	);
}
