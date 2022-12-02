import React, { Component } from "react";
export default class FinishBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardData: [],
			boardId: "63873e985a8d4bfa62e262d2"
		};
	}
	componentDidMount() {}
	render() {
		return (
			<div>
				<h1>Board {this.state.boardId}</h1>
			</div>
		);
	}
}
