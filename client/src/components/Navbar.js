import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

let theme = "dark";

const toggleTheme = () => {
	console.log("theme", theme);

	if (theme === "dark") {
		document.body.style.background = "#e8e8e8";
		document.body.style.color = "#222831";
		try {
			document.getElementById("backgroundDarkLight").style.color = "#222831";
		} catch (error) {}
		theme = "light";
	} else {
		document.body.style.background = "#222831";
		document.body.style.color = "#e8e8e8";
		try {
			document.getElementById("backgroundDarkLight").style.color = "#e8e8e8";
		} catch (error) {}
		theme = "dark";
	}
};

export default function Navbar() {
	const logout = () => {
		localStorage.removeItem("username");
		window.location.reload();
	};

	let button;

	if (localStorage.getItem("username") === null) {
		button = (
			<Link className="navbar__item" to="/login">
				Se connecter
			</Link>
		);
	} else {
		button = (
			<div className="navbar__item">
				Bonjour {localStorage.getItem("username")}
				<button className="navbar__item" onClick={logout}>
					Se Déconnecter
				</button>
			</div>
		);
	}

	return (
		<header className="navbar">
			<Link className="navbar__title navbar__item" to="/">
				PixelArt
			</Link>
			<div className="form-check form-switch">
				<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleTheme}></input>
				<label className="form-check-label" htmlFor="flexSwitchCheckDefault">
					<span className="material-symbols-outlined">dark_mode</span>
				</label>
			</div>
			<Link className="navbar__item" to="/">
				Accueil
			</Link>

			{button}
		</header>
	);
}
