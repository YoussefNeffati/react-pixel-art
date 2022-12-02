import React, { Component, useRef, useState } from "react";
import "../styles/boardInformations.scss";
import Countdown from "react-countdown";

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardData: []
		};
	}

	componentDidMount() {
		fetch("/boards")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ boardData: data });
				console.log(data);
			});
	}

	render() {
		const { boardData } = this.state;
		const tab = [];

		for (let i = 0; i < boardData.length; i++) {
			tab.push(
				<tr key={i}>
					<td>{boardData[i].title}</td>
					<td>{boardData[i].nColumns}</td>
					<td>{boardData[i].nLines}</td>
					<td>{new Date(boardData[i].createdAt).toLocaleString()}</td>
					<td>{new Date(boardData[i].finishedAt).toLocaleString()}</td>
				</tr>
			);
		}
		return (
			<div>
				<h1>Ici la liste des boards créés</h1>
				<table id="boards">
					<tbody>
						<tr>
							<th>Titre</th>
							<th>Nombre colonnes</th>
							<th>Nombre lignes</th>
							<th>Date début</th>
							<th>Date fin</th>
						</tr>
						{tab}
					</tbody>
				</table>
			</div>
		);
	}
}
