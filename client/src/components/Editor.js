import React, { useEffect, useState } from "react";
import "../styles/editor.scss";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
import DatePicker from "react-datepicker";
import BoardInformations from "./BoardInformations";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";

export default function Editor() {
	const [panelWidth, setPanelWidth] = useState(16);
	const [panelHeight, setPanelHeight] = useState(16);
	const [hideOptions, setHideOptions] = useState(false);
	const [beginDrawing, setBeginDrawing] = useState(false);
	const [buttonText] = useState("Commencer à dessiner");
	const [selectedColor, setColor] = useState("#f44336");
	const [nbUsersInscrit, setNbUsersInscrit] = useState(0);
	const [nbPixelboard, setNbPixelboard] = useState(0);
	const [isLogged, setIsLogged] = useState(false);
	const [isNotLogged, setIsNotLogged] = useState(false);
	const [createBoard, setCreateBoard] = useState(false);
	const [delaiSecondes, setDelaiSecondes] = useState(10);
	const [delaiMinutes, setDelaiMinutes] = useState(0);
	const [author, setAuthor] = useState("");
	const [title, setTitle] = useState("");

	// date + 1 day
	var today = new Date();
	const [endDate, setEndDate] = useState(today.setDate(today.getDate() + 1));
	const [startDate, setStartDate] = useState(new Date());

	useEffect(() => {
		// get nb users inscrit
		fetch("/users")
			.then((res) => res.json())
			.then((data) => {
				setNbUsersInscrit(data.length);
			});
		// get nb pixelboard created
		fetch("/boards")
			.then((res) => res.json())
			.then((data) => {
				setNbPixelboard(data.length);
			});
		//get All pixelborad created
		fetch("/boards")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
		});
		// verify if we have a current board
		fetch("/currentboad")
			.then((res) => res.json())
			.then((data) => {
				if (data.length === 0) {
					// verif if is logged
					if (localStorage.getItem("username")) {
						setIsLogged(true);
					} else {
						setIsNotLogged(true);
					}
				} else {
					setInfosBoard(data);
					setBeginDrawing(true);
				}
			});
	}, []);

	function showFormCreateBoard() {
		setCreateBoard(true);
		setIsLogged(false);
	}

	function initializeDrawingPanel() {
		setHideOptions(!hideOptions);
		setBeginDrawing(false);
		//buttonText === "Commencer à dessiner" ? setButtonText("reset") : setButtonText("Commencer à dessiner");
	}

	function changeColor(color) {
		setColor(color.hex);
	}

	// aLL informatioN ABOUT THE BOARD
	function setInfosBoard(data) {
		setAuthor(data.author.name);
		setTitle(data.title);
		setStartDate(data.createdAt);
		setEndDate(data.finishedAt);
		setPanelWidth(data.nLines);
		setPanelHeight(data.nColumns);
		setDelaiSecondes(data.delai);
		localStorage.setItem("currentboad", data._id);
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
                  <div className="col-auto">
                    <i className="fa fa-user fa-2x"></i>
                  </div>
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Nombre de joueurs
                    </div>

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
                  <div className="col-auto">
                    <i className="fa fa-bullhorn fa-2x"></i>
                  </div>
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Nombre de Pixelboards
                    </div>

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
        <button className="button">
          <Link
            to="/allBoard"
            style={{ textDecoration: "none", color: "white" }}
          >
            Voir tous les Pixelboards
          </Link>
        </button>
      </span>
      {isLogged && (
        <h2>Aucun dessin est en cours veuillez créer un nouveau Pixelboard</h2>
      )}
      {isLogged && (
        <button onClick={showFormCreateBoard} className="button">
          Créer un nouveau Pixelboard
        </button>
      )}
      {isNotLogged && (
        <h2>
          Aucun dessin est en cours veuillez d'abord vous connecter pour pouvoir
          créer un nouveau Pixelboard{" "}
        </h2>
      )}
      {isNotLogged && <button className="button">Se connecter</button>}

      {createBoard && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch("/saveboard", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: e.target.title.value,
                nLines: e.target.width.value,
                nColumns: e.target.height.value,
                delaimin: e.target.delaimn.value,
                delaisec: e.target.delaisec.value,
                author: localStorage.getItem("username"),
                finishedAt: e.target.dateFin.value,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                setInfosBoard(data);
                setCreateBoard(false);
                alert("Pixel board créé avec succès!");
                setBeginDrawing(true);
              });
          }}
        >
          <h2>Création d'un nouveau Pixelboard</h2>
          <div id="options">
            <div className="option">
              <h3>Nom du Pixelboard</h3>
              <input
                className="panelInputText"
                type="text"
                name="title"
                id="title"
              />
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
              <input
                className="panelInput"
                type="number"
                name="height"
                id="height"
                defaultValue={panelWidth}
                onChange={(e) => {
                  setPanelHeight(e.target.value);
                }}
              />
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
                defaultValue={delaiMinutes}
                onChange={(e) => {
                  setDelaiMinutes(e.target.value);
                }}
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
                defaultValue={delaiSecondes}
                onChange={(e) => {
                  setDelaiSecondes(e.target.value);
                }}
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
      {beginDrawing && (
        <button onClick={initializeDrawingPanel} className="button">
          {buttonText}
        </button>
      )}

      {hideOptions && (
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      )}
      <div className="row">
        <div className="col-4">
          {hideOptions && (
            <BoardInformations
              author={author}
              title={title}
              startDate={startDate}
              endDate={endDate}
              delaiSecondes={delaiSecondes}
              width={panelWidth}
              height={panelHeight}
            />
          )}
        </div>
        <div className="col-8">
          {hideOptions && (
            <>
              <DrawingPanel
                width={panelWidth}
                height={panelHeight}
                selectedColor={selectedColor}
                delaiMin={delaiMinutes}
                delaiSec={delaiSecondes}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
