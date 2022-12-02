import React, { useRef, useState } from "react";
import "../styles/boardInformations.scss";
import Countdown from "react-countdown";

export default function boardInformations(props) {
	const { width, height, title, startDate, author, endDate, delaiSecondes } = props;
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			window.location.reload(false);
		} else {
			// Render a countdown
			return (
				<span>
					{days} jours {hours} heures {minutes} minutes et {seconds} secondes
				</span>
			);
		}
	};

	return (
		<div id="boardInformations">
			<h3>Informations de ce pixelboard</h3>
			<span className="optionName">
				Titre: <b>{title}</b>
			</span>
			<span className="optionName">
				Auteur: <b>{author}</b>
			</span>
			<span className="optionName">
				Fin du pixel board dans:
				<b>
					{new Date(endDate).toLocaleString()}
				</b>
			</span>
			<span className="optionName">
				Date de création: <b>{new Date(startDate).toLocaleString()}</b>
			</span>
			<span className="optionName">
				Délai de collaboration: <b>{Math.floor(delaiSecondes / 60)}</b> minute(s) et <b>{delaiSecondes % 60}</b> seconde(s)
			</span>
			<h3>Dimensions </h3>
			<div id="options">
					<span>Largeur : <b>{width}</b> pixels</span> <br></br>
					<span>Hauteur : <b>{height}</b> pixels</span>
			</div>
		</div>
	);
}
