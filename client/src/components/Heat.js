import React, { useEffect, useState } from "react";
import "../styles/boardinprogressprev.scss";
import Spinner from "react-bootstrap/Spinner";
import HeatMap from "react-heatmap-grid";

export default function Heat() {
	// const [data, setData] = useState([]);
	const [spinner, setSpinner] = useState(true);
	const [xLabels, setXLabels] = useState([]);
	const [yLabels, setYLabels] = useState([]);
	const [data, setData] = useState([]);
	useEffect(() => {
		getnumbersoftimes();
	});

	async function getnumbersoftimes() {
		await fetch("http://localhost:8000/getnumbersoftimes")
			.then((res) => res.json())
			.then((data) => {
				setSpinner(false);
				for (let i = 0; i < data.length; i++) {
					// verify if x exist in xLabels
					if (!xLabels.includes(data[i].x)) {
						xLabels.push(data[i].x);
					}
					// verify if y exist in yLabels
					if (!yLabels.includes(data[i].y)) {
						yLabels.push(data[i].y);
					}
				}
				let datas = [];
				for (let i = 0; i < xLabels.length; i++) {
					let newArray = [];
					for (let j = 0; j < yLabels.length; j++) {
						for (let k = 0; k < data.length; k++) {
							if (xLabels[i] === data[k].x && yLabels[j] === data[k].y) {
								newArray.push(data[k].count);
							}
						}
					}
					if (newArray.length > 0) {
						datas.push(newArray);
					}
				}
				setData(datas);
				// delete , in xLabels
				console.log('xLabels.join("")', xLabels.join(""));
				setXLabels(
					xLabels.map((x) => {
						x.replace(",", "");
					})
				);
				setYLabels(yLabels.map((y) => y.replace(",", "")));
			});
	}

	return (
		<div className="containerBoard">
			<h1>Heatmap {}</h1>

			<HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
			<div style={{ padding: "5%" }}>{spinner && <Spinner animation="border" variant="danger" size="lg" />}</div>
		</div>
	);
}
