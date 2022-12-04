import React, { Component } from "react";
import "../styles/editor.scss";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

export default class AdminParameters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nbUsersInscrit: 0,
			nbPixelboard: 0,
			createBoard: false,
			today: new Date(),
			endDate: new Date().setDate(new Date().getDate() + 1)
		};
	}
	showFormCreateBoard = () => {
		this.setState({ createBoard: true });
	};

	componentDidMount() {
		// get nb users inscrit
		fetch("http://localhost:8000/users")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ nbUsersInscrit: data.length });
			});
		// get nb pixelboard created
		fetch("http://localhost:8000/boards")
			.then((res) => res.json())
			.then((data) => {
				this.setState({ nbPixelboard: data.length });
			});
	}
	render() {
		const { nbUsersInscrit, nbPixelboard, createBoard, endDate } = this.state;
		return (
			<div id="editor">
				<h1>Espace Administrateur</h1>
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
				<span>
					<Link to="/allBoard/all" style={{ textDecoration: "none", color: "white" }}>
						<button className="button"> Voir tous les Pixelboards</button>
					</Link>
				</span>
				<span>
					<Link to="/users" style={{ textDecoration: "none", color: "white" }}>
						<button className="button"> Voir tous les utilisateurs</button>
					</Link>
				</span>
				{!createBoard && (
					<button onClick={this.showFormCreateBoard} className="button">
						Créer un nouveau Pixelboard
					</button>
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
								.then((data) => {
									alert("Pixel board créé avec succès!");
									this.setState({ createBoard: false });
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
								<input className="panelInput" type="number" name="width" id="width" defaultValue="16" />
								<span>Largeur</span>
							</div>
							<div className="option">
								<input className="panelInput" type="number" name="height" id="height" defaultValue="16" />
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
			</div>
		);
	}
}
