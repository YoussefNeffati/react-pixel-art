import React, { Component } from "react";
import "../styles/boardInformations.scss";
import Modal from "react-modal";

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: [],
			modalIsOpen: false,
			userToEdit: {}
		};
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	componentDidMount() {
		fetch("http://localhost:8000/users")
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				this.setState({ userData: data });
			});
	}

	deleteUser = (id) => {
		// Confirm before delete
		if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
			fetch(`http://localhost:8000/user/${id}`, {
				method: "DELETE"
			}).then((data) => {
				alert("User deleted successfully");
				window.location.reload();
			});
		}
	};

	render() {
		const { userData, modalIsOpen, userToEdit } = this.state;
		const tab = [];

		for (let i = 0; i < userData.length; i++) {
			tab.push(
				<tr key={i}>
					<td>{userData[i].name}</td>
					<td>{userData[i].role}</td>
					<td>{new Date(userData[i].createdAt).toLocaleString()}</td>
					<td>
						<span>
							<button
								className="buttonBoard"
								onClick={() => {
									this.setState({ modalIsOpen: true, userToEdit: userData[i] });
								}}
							>
								Modifier
							</button>
							<button className="buttonBoard" onClick={() => this.deleteUser(userData[i]._id)}>
								Supprimer
							</button>
						</span>
					</td>
				</tr>
			);
		}
		return (
			<div>
				<h1>Ici la liste des utilisateurs</h1>
				<div className="search">
					<input
						className="panelInputText"
						type="text"
						name="name"
						id="name"
						placeholder="Rechercher un utilisateur"
						onKeyDown={(e) => {
							if (e.target.value.length > 0) {
								fetch(`http://localhost:8000/searchuser/${e.target.value}`)
									.then((res) => res.json())
									.then((data) => {
										this.setState({ userData: data });
									});
							} else {
								// componentDidMount
								this.componentDidMount();
							}
						}}
					/>
				</div>
				<table id="boards">
					<tbody>
						<tr>
							<th>Nom</th>
							<th>Role</th>
							<th>Date d'adhésion</th>
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
					<h1>Modification de l'utilisateur {userToEdit.name}</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							fetch("http://localhost:8000/user/" + userToEdit._id, {
								method: "PUT",
								headers: {
									Accept: "application/json",
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									name: e.target.name.value,
									role: e.target.role.value
								})
							}).then((data) => {
								alert("User modifié avec succès");
								window.location.reload();
							});
						}}
					>
						<div id="options">
							<div className="option">
								<h3>Nom</h3>
								<input className="panelInputText" type="text" name="name" id="name" defaultValue={userToEdit.name} />
							</div>
						</div>
						<div id="options">
							<div className="option">
								<h3>Rôle</h3>
								<select className="panelInputText" name="role" id="role" defaultValue={userToEdit.role}>
									<option value="admin">Admin</option>
									<option value="user">User</option>
								</select>
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
