import React from "react";
import "../styles/boardInformations.scss";
import Countdown from "react-countdown";

export default function boardInformations(props) {
	const { width, height, title, startDate, author, endDate, delaiSecondes, statut } = props;
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			finishPixelBoard();
			window.location.reload();
		} else {
			// Render a countdown
			return (
				<span>
					{days} jours {hours} heures {minutes} minutes et {seconds} secondes
				</span>
			);
		}
	};

	function finishPixelBoard() {
		fetch("http://localhost:8000/updateboard/" + localStorage.getItem("currentboad"), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				window.location.reload(false);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div id="boardInformations">
			<h3>Informations de ce pixelboard</h3>
			<span className="optionName">
				Titre: <b>{title}</b>
			</span>
			<span className="optionName">
				Auteur: <b>{author}</b>
			</span>
			{new Date(endDate) > new Date() && (
				<span className="optionName">
					Fin du pixel board dans:
					<b>
						<Countdown date={endDate} renderer={renderer} />
					</b>
				</span>
			)}
			<span className="optionName">
				Date de création: <b>{new Date(startDate).toLocaleString()}</b>
			</span>
			<span className="optionName">
				Date de fin: <b>{new Date(endDate).toLocaleString()}</b>
			</span>
			<span className="optionName">
				Délai de collaboration: <b>{Math.floor(delaiSecondes / 60)}</b> minute(s) et <b>{delaiSecondes % 60}</b> seconde(s)
			</span>
			<h3>Dimensions </h3>
			<span>
				Largeur : <b>{width}</b> pixels
			</span>{" "}
			<br></br>
			<span>
				Hauteur : <b>{height}</b> pixels
			</span>
			<br></br>
			{localStorage.getItem("username") === author ||
				(localStorage.getItem("role") === "admin" && !statut && (
					<span>
						<button className="button" onClick={finishPixelBoard}>
							Terminer ce pixelboard
						</button>
					</span>
				))}
		</div>
	);
}
