import React, { Component } from "react";
import "../styles/account.scss";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export default class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false,
			userData: [],
			theme: "dark",
			nbrePixels: 0,
			nbreBoard: 0,
			boardsDrawed: []
		};
	}
	componentDidMount() {
		// get user data
		fetch("http://localhost:8000/users/" + localStorage.getItem("iduser"))
			.then((res) => res.json())
			.then((data) => {
				this.setState({ userData: data });
			});

		// get number of pixels
		fetch("http://localhost:8000/pixelsuser/" + localStorage.getItem("iduser"))
			.then((res) => res.json())
			.then((data) => {
				// filter boards
				let boards = [];
				data.forEach((pixel) => {
					let exist = false;
					boards.forEach((board) => {
						if (board._id === pixel.board._id) {
							exist = true;
						}
					});
					if (!exist) {
						boards.push(pixel.board);
					}
				});
				this.setState({ nbrePixels: data.length, boardsDrawed: boards, nbreBoard: boards.length });
			});
	}
	toggleTheme = () => {
		if (this.state.theme === "dark") {
			document.body.style.background = "#e8e8e8";
			document.body.style.color = "#222831";
			try {
				document.getElementById("backgroundDarkLight").style.color = "#222831";
			} catch (error) {}
			this.setState({ theme: "light" });
			localStorage.setItem("theme", this.state.theme);
		} else {
			document.body.style.background = "#222831";
			document.body.style.color = "#e8e8e8";
			try {
				document.getElementById("backgroundDarkLight").style.color = "#e8e8e8";
			} catch (error) {}
			this.setState({ theme: "dark" });
			localStorage.setItem("theme", this.state.theme);
		}
	};
	closeModal = () => {
		this.toggleTheme();
		this.setState({ modalIsOpen: false });
	};

	render() {
		const { userData, modalIsOpen, nbrePixels, nbreBoard, boardsDrawed } = this.state;
		const boards = [];
		for (let i = 0; i < boardsDrawed.length; i++) {
			boards.push(
				<div key={i}>
					<p>
						{boardsDrawed[i].title}{" "}
						<Link to={`/boardPixelAndDetails/${boardsDrawed[i]._id}`} style={{ textDecoration: "none", color: "white" }}>
							<button className="buttonBoard">Voir le board</button>
						</Link>
					</p>
				</div>
			);
		}
		return (
			<div id="">
				<h1>Mon compte</h1>
				<div className="row justify-content-center">
					<div className="col-3" id="userInformations">
						<h3>Mes informations</h3>
						<div className="optionName">
							Nom: <b>{userData.name}</b>
						</div>
						<div className="optionName">
							Date d'adh??sion: <b>{new Date(userData.createdAt).toLocaleString()}</b>
						</div>
						<div className="optionName">
							Th??me de l'application choisie: <b>{localStorage.getItem("theme")}</b>
						</div>
						<button
							className="buttonAc"
							onClick={() => {
								this.setState({ modalIsOpen: true });
							}}
						>
							Modifier mes informations
						</button>
					</div>
					<div className="col-6" id="userInformations">
						<h3>Statistiques contribution</h3>
						<div id="userContrib">
							<div className="card border-left-info shadow py-2 panelInput">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">Nombre pixel(s) dessin??(s)</div>

											<div className="h5 mb-0 font-weight-bold text-gray-800">
												<b>{nbrePixels}</b>
											</div>
										</div>
									</div>
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">Nombre board(s) contribu??(s)</div>

											<div className="h5 mb-0 font-weight-bold text-gray-800">
												<b>{nbreBoard}</b>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card border-left-info shadow py-2 panelInput">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">
												Liste pixelBoard(s) Contribu??(s)
											</div>

											<div className="h5 mb-0 font-weight-bold text-gray-800">
												<b>{boards}</b>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
					overlayClassName="Overlay"
					className={"Modal"}
				>
					<h1>Modification de mes informations</h1>
					<div>
						<div id="options">
							<div className="option">
								<h4>Changer le th??me de l'application</h4>
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										role="switch"
										id="flexSwitchCheckDefault"
										onClick={this.toggleTheme}
									></input>
									<label className="form-check-label" htmlFor="flexSwitchCheckDefault">
										<span className="material-symbols-outlined">dark_mode</span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (e.target.password.value === e.target.password2.value) {
								fetch("http://localhost:8000/user/" + userData._id, {
									method: "PUT",
									headers: {
										Accept: "application/json",
										"Content-Type": "application/json"
									},
									body: JSON.stringify({
										name: e.target.name.value,
										password: e.target.password.value
									})
								}).then((data) => {
									alert("User modifi?? avec succ??s");
									window.location.reload();
								});
							} else {
								alert("Les mots de passe ne correspondent pas");
							}
						}}
					>
						<div id="options">
							<div className="option">
								<h3>Nom</h3>
								<input className="panelInputText" type="text" name="name" id="name" defaultValue={userData.name} readOnly />
							</div>
						</div>
						<div id="options">
							<div className="option">
								<h3>Nouveau mot de passe</h3>
								<input className="panelInputText" type="text" name="password" id="password" defaultValue={userData.password} />
							</div>
						</div>
						<div id="options">
							<div className="option">
								<h3>R??p??tez le mot de passe</h3>
								<input className="panelInputText" type="text" name="password2" id="password2" defaultValue={userData.password} />
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
