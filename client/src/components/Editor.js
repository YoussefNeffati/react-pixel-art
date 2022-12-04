import React, { useEffect, useState } from "react";
import "../styles/editor.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import BoardInProgressPrev from "./BoardInProgressPrev";
import BoardFinishedPrev from "./BoardFinishedPrev";
import SuperPixelBoard from "./SuperPixelBoard";
import Heatmaps from "./Heat";

export default function Editor() {
	const [panelWidth, setPanelWidth] = useState(16);
	const [nbUsersInscrit, setNbUsersInscrit] = useState(0);
	const [nbPixelboard, setNbPixelboard] = useState(0);
	const [isLogged, setIsLogged] = useState(false);
	const [noBoardInProgress, setNoBoardInProgress] = useState(true);
	const [isNotLogged, setIsNotLogged] = useState(false);
	const [createBoard, setCreateBoard] = useState(false);
	const [colorTitleboardInProgress, setcolorTitleBoardInProgress] = useState("#f05454");
	const [colorTitleboardFinished, setcolorTitleBoardFinished] = useState("rgb(232 232 232 / 18%)");
	const [colorTitleSuperPixelboard, setcolorTitleSuperPixelboard] = useState("rgb(232 232 232 / 18%)");
	const [heatmap, setHeatmap] = useState(false);
	const [colorTitleHeatmap, setcolorTitleHeatmap] = useState("rgb(232 232 232 / 18%)");
	const [boardInProgress, setBoardInProgress] = useState(true);
	const [boardFinished, setBoardFinished] = useState(false);
	const [superPixelboards, setSuperPixelboards] = useState(false);

	// date + 1 day
	var today = new Date();
	const [endDate, setEndDate] = useState(today.setDate(today.getDate() + 1));
	const [startDate, setStartDate] = useState(new Date());

	useEffect(() => {
		// get nb users inscrit
		fetch("http://localhost:8000/users")
			.then((res) => res.json())
			.then((data) => {
				setNbUsersInscrit(data.length);
			});
		// get nb pixelboard created
		fetch("http://localhost:8000/boards")
			.then((res) => res.json())
			.then((data) => {
				setNbPixelboard(data.length);
			});

		// verify if we have a current board
		fetch("http://localhost:8000/currentboad")
			.then((res) => res.json())
			.then((data) => {
				setNoBoardInProgress(false);
			});

		// verif if is logged
		if (localStorage.getItem("username")) {
			setIsLogged(true);
		} else {
			setIsNotLogged(true);
		}
	}, []);

	function showFormCreateBoard() {
		setCreateBoard(true);
		setIsLogged(false);
	}

	function showBoardInProgress() {
		setBoardInProgress(true);
		setBoardFinished(false);
		setSuperPixelboards(false);
		setHeatmap(false);
		setcolorTitleBoardInProgress("#f05454");
		setcolorTitleBoardFinished("rgb(232 232 232 / 18%)");
		setcolorTitleHeatmap("rgb(232 232 232 / 18%)");
		setcolorTitleSuperPixelboard("rgb(232 232 232 / 18%)");
	}

	function showBoardFinished() {
		setBoardInProgress(false);
		setBoardFinished(true);
		setSuperPixelboards(false);
		setHeatmap(false);
		setcolorTitleBoardInProgress("rgb(232 232 232 / 18%)");
		setcolorTitleBoardFinished("#f05454");
		setcolorTitleHeatmap("rgb(232 232 232 / 18%)");
		setcolorTitleSuperPixelboard("rgb(232 232 232 / 18%)");
	}

	function showSuperPixelBoard() {
		setBoardInProgress(false);
		setBoardFinished(false);
		setSuperPixelboards(true);
		setHeatmap(false);
		setcolorTitleBoardInProgress("rgb(232 232 232 / 18%)");
		setcolorTitleBoardFinished("rgb(232 232 232 / 18%)");
		setcolorTitleHeatmap("rgb(232 232 232 / 18%)");
		setcolorTitleSuperPixelboard("#f05454");
	}

	function showHeatmap() {
		setBoardInProgress(false);
		setBoardFinished(false);
		setSuperPixelboards(false);
		setHeatmap(true);
		setcolorTitleBoardInProgress("rgb(232 232 232 / 18%)");
		setcolorTitleBoardFinished("rgb(232 232 232 / 18%)");
		setcolorTitleSuperPixelboard("rgb(232 232 232 / 18%)");
		setcolorTitleHeatmap("#f05454");
	}

	return (
		<div id="editor">
			<h1>Pixel Editor</h1>
			<div className="row justify-content-center">
				<div id="options">
					<div className="option">
						<div className="card border-left-info shadow h-100 py-2 panelInputText">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-info text-uppercase mb-1">Nombre de joueurs</div>

										<div className="h5 mb-0 font-weight-bold text-gray-800">
											<b>{nbUsersInscrit}</b>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="option">
						<div className="card border-left-info shadow h-100 py-2 panelInputText">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-info text-uppercase mb-1">Nombre de Pixelboards</div>

										<div className="h5 mb-0 font-weight-bold text-gray-800">
											<b>{nbPixelboard}</b>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isLogged && noBoardInProgress && <h2>Aucun Pixelboard est en cours veuillez créer un nouveau</h2>}
			{isLogged && (
				<button onClick={showFormCreateBoard} className="button">
					Créer un nouveau Pixelboard
				</button>
			)}
			{isNotLogged && noBoardInProgress && (
				<h2>Aucun Pixelboard est en cours veuillez d'abord vous connecter pour pouvoir créer un nouveau </h2>
			)}
			{isNotLogged && (
				<Link className="navbar__item" to="/login">
					<button className="button">Se connecter</button>
				</Link>
			)}

			{createBoard && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						fetch("http://localhost:8000/saveboard", {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								title: e.target.title.value,
								nLines: e.target.width.value,
								nColumns: e.target.height.value,
								delaimin: e.target.delaimn.value,
								delaisec: e.target.delaisec.value,
								author: localStorage.getItem("username"),
								finishedAt: e.target.dateFin.value
							})
						})
							.then((res) => res.json())
							.then(() => {
								setCreateBoard(false);
								alert("Pixel board créé avec succès!");
								window.location.reload();
							});
					}}
				>
					<h2>Création d'un nouveau Pixelboard</h2>
					<div id="options">
						<div className="option">
							<h3>Nom du Pixelboard</h3>
							<input className="panelInputText" type="text" name="title" id="title" />
						</div>
					</div>
					<h3>Entrez les dimensions du Pixelboard</h3>
					<div id="options">
						<div className="option">
							<input
								className="panelInput"
								type="number"
								name="width"
								id="width"
								defaultValue={panelWidth}
								onChange={(e) => {
									setPanelWidth(e.target.value);
								}}
							/>
							<span>Largeur</span>
						</div>
						<div className="option">
							<input className="panelInput" type="number" name="height" id="height" defaultValue={panelWidth} />
							<span>Hauteur</span>
						</div>
					</div>
					<h3>Delai de collaboration</h3>
					<div id="options">
						<div className="option">
							<input className="panelInput" type="number" name="delaimn" id="delaimn" max="59" min="0" defaultValue="0" />
							<span>Minute(s)</span>
						</div>
						<div className="option">
							<input className="panelInput" type="number" name="delaisec" id="delaisec" max="59" min="10" defaultValue="10" />
							<span>Seconde(s)</span>
						</div>
					</div>
					<h3>Date d'expiration du PixelBoard</h3>
					<div id="options">
						<div className="option">
							<DatePicker
								id="dateFin"
								name="dateFin"
								className="panelInputText"
								selected={endDate}
								onChange={(date) => setEndDate(date)}
								dateFormat="yyyy-MM-dd"
								minDate={endDate}
							/>
						</div>
					</div>
					<button className="button" type="submit">
						Créer un pixelboard
					</button>
				</form>
			)}

			<div className="row board">
				<div className="col-3 boardStatus" onClick={showBoardInProgress} style={{ backgroundColor: colorTitleboardInProgress }}>
					Pixelboards en cours
				</div>
				<div className="col-3 boardStatus" onClick={showBoardFinished} style={{ backgroundColor: colorTitleboardFinished }}>
					Pixelboards terminés
				</div>
				<div className="col-3 boardStatus" onClick={showSuperPixelBoard} style={{ backgroundColor: colorTitleSuperPixelboard }}>
					SuperPixelboards
				</div>
				<div className="col-3 boardStatus" onClick={showHeatmap} style={{ backgroundColor: colorTitleHeatmap }}>
					Heatmap
				</div>
			</div>
			{boardInProgress && <BoardInProgressPrev />}
			{boardFinished && <BoardFinishedPrev />}
			{superPixelboards && <SuperPixelBoard />}
			{heatmap && <Heatmaps />}
		</div>
	);
}
