import React, { Component } from "react";
import "../styles/boardInformations.scss";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import DatePicker from "react-datepicker";

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardData: [],
			modalIsOpen: false,
			boardToEdit: {}
		};
	}

	componentDidMount() {
		fetch("http://localhost:8000/boards")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ boardData: data });
			});
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	deleteBoard = (id) => {
		// Confirm before delete
		if (window.confirm("Voulez-vous vraiment supprimer ce pixelboard ?")) {
			fetch(`http://localhost:8000/deleteboard/${id}`, {
				method: "DELETE"
			}).then((data) => {
				alert("Pixelboard deleted successfully");
				window.location.reload();
			});
		}
	};

	render() {
		const { boardData, boardToEdit, modalIsOpen } = this.state;
		const tab = [];

		for (let i = 0; i < boardData.length; i++) {
			tab.push(
				<tr key={i}>
					<td>{boardData[i].title}</td>
					<td>{boardData[i].nColumns}</td>
					<td>{boardData[i].nLines}</td>
					<td>{new Date(boardData[i].createdAt).toLocaleString()}</td>
					<td>{new Date(boardData[i].finishedAt).toLocaleString()}</td>
					<td>
						<span>
							<Link to={`/boardPixelAndDetails/${boardData[i]._id}`} style={{ textDecoration: "none", color: "white" }}>
								<button className="buttonBoard">Voir le board</button>
							</Link>
							{localStorage.getItem("role") === "admin" && (
								<>
									<span>
										<button
											className="buttonBoard"
											onClick={() => {
												this.setState({
													modalIsOpen: true,
													boardToEdit: boardData[i]
												});
											}}
										>
											Modifier
										</button>
										<button className="buttonBoard" onClick={() => this.deleteBoard(boardData[i]._id)}>
											Supprimer
										</button>
									</span>
								</>
							)}
						</span>
					</td>
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
							<th>Actions</th>
						</tr>
						{tab}
					</tbody>
				</table>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
					overlayClassName="Overlay"
					className={"Modal"}
				>
					<h1>Modification du pixelboard{boardToEdit.title}</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							fetch("http://localhost:8000/updateinfosboard/" + boardToEdit._id, {
								method: "PUT",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									title: e.target.title.value,
									statut: e.target.statut.value,
									nColumns: e.target.height.value,
									nLines: e.target.width.value,
									finishedAt: e.target.dateFin.value,
									delai: e.target.delaimn.value * 60 + e.target.delaisec.value
								})
							}).then((data) => {
								alert("Pixelboard updated successfully");
								window.location.reload();
							});
						}}
					>
						<div id="options">
							<div className="option">
								<h3>Nom du Pixelboard</h3>
								<input className="panelInputText" type="text" name="title" id="title" defaultValue={boardToEdit.title} />
							</div>
						</div>
						<div id="options">
							<div className="option">
								<h3>Statut</h3>
								<select className="panelInputText" name="statut" id="statut" defaultValue={boardToEdit.statut}>
									<option value="false">En cours</option>
									<option value="true">Terminé</option>
								</select>
							</div>
						</div>
						<h3>Dimensions du Pixelboard</h3>
						<div id="options">
							<div className="option">
								<input className="panelInput" type="number" name="width" id="width" defaultValue={boardToEdit.nLines} />
								<span>Largeur</span>
							</div>
							<div className="option">
								<input className="panelInput" type="number" name="height" id="height" defaultValue={boardToEdit.nColumns} />
								<span>Hauteur</span>
							</div>
						</div>
						<h3>Delai de collaboration</h3>
						<div id="options">
							<div className="option">
								<input
									className="panelInput"
									type="number"
									name="delaimn"
									id="delaimn"
									max="59"
									min="0"
									defaultValue={Math.floor(boardToEdit.delai / 60)}
								/>
								<span>Minute(s)</span>
							</div>
							<div className="option">
								<input
									className="panelInput"
									type="number"
									name="delaisec"
									id="delaisec"
									max="59"
									min="10"
									defaultValue={boardToEdit.delai % 60}
								/>
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
									selected={new Date(boardToEdit.finishedAt)}
									dateFormat="yyyy-MM-dd"
								/>
							</div>
						</div>

						<button className="buttonBoard" type="submit">
							Modifier
						</button>
						<button className="buttonBoard" onClick={this.closeModal}>
							Annuler
						</button>
					</form>
				</Modal>
			</div>
		);
	}
}
