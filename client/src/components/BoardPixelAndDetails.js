import React, { Component } from "react";
import DrawingPanel from "./DrawingPanel";
import BoardInformations from "./BoardInformations";
import "../styles/boardInformations.scss";
import {useParams} from 'react-router-dom';



function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class FinishBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pixels: [],
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
		fetch(`/boardAndPixels/${this.state.boardId}`)
			.then((res) => res.json())
			.then((data) => {
				this.setState({ pixels: data.pixels, board: data.board, author: data.author.name });
				console.log("data", data);
			});
	}

	render() {
		return (
			<div id="detailsBoard">
				<h1>Board</h1>
				<div className="row">
					<div className="">
						<BoardInformations
							author={this.state.author}
							title={this.state.board.title}
							startDate={this.state.board.createdAt}
							endDate={this.state.board.finishedAt}
							delaiSecondes={this.state.board.delai}
							width={this.state.board.nLines}
							height={this.state.board.nColumns}
						/>
					</div>
					<div className="">
						<DrawingPanel
							width={this.state.board.nLines}
							height={this.state.board.nColumns}
							selectedColor={this.state.selectedColor}
							delaiMin={this.state.delaiMinutes}
							delaiSec={this.state.delaiSecondes}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default withParams(FinishBoard);