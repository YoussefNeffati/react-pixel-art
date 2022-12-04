import React from "react";
import DrawingPanel from "./DrawingPanel";
import BoardInformations from "./BoardInformations";
import "../styles/boardInformations.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function withParams(Component) {
	return (props) => <Component {...props} params={useParams()} />;
}

class BoardPixelAndDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: {},
			author: "",
			boardId: this.props.params.boardId,
			selectedColor: "#f44336",
			delaiSecondes: 10,
			delaiMinutes: 0
		};
	}

	componentDidMount() {
		this.getBoardData();
	}

	getBoardData() {
		fetch(`http://localhost:8000/board/${this.state.boardId}`)
			.then((res) => res.json())
			.then((data) => {
				localStorage.setItem("currentboad", this.state.boardId);
				if (!data.author) {
					this.setState({ board: data, author: "Admin" });
				} else {
					this.setState({ board: data, author: data.author.name });
				}
			});
	}

	render() {
		return (
			<div id="detailsBoard">
				<h1>Board {this.state.board.title}</h1>
				<span>
					<Link to="/allBoard/all" style={{ textDecoration: "none", color: "white" }}>
						<button className="button"> Voir tous les Pixelboards</button>
					</Link>
				</span>
				<div className="row">
					<div className="col-6">
						<BoardInformations
							author={this.state.author}
							title={this.state.board.title}
							startDate={this.state.board.createdAt}
							endDate={this.state.board.finishedAt}
							delaiSecondes={this.state.board.delai}
							width={this.state.board.nLines}
							height={this.state.board.nColumns}
							statut={this.state.board.statut}
						/>
					</div>
					<div className="col-6">
						<DrawingPanel
							width={this.state.board.nLines}
							height={this.state.board.nColumns}
							delaiMin={this.state.delaiMinutes}
							delaiSec={this.state.delaiSecondes}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default withParams(BoardPixelAndDetails);
