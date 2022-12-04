import React, { useEffect, useState } from "react";
import "../styles/boardinprogressprev.scss";
import Spinner from "react-bootstrap/Spinner";
import HeatMap from "react-heatmap-grid";

export default function Heat() {
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
				let abscisse = [];
				let ordonnee = [];
				for (let i = 0; i < data.length; i++) {
					// verify if x exist in xLabels
					if (!abscisse.includes(data[i].x)) {
						// push x in xLabels to string
						abscisse.push(data[i].x);
					}
					// verify if y exist in yLabels
					if (!ordonnee.includes(data[i].y)) {
						ordonnee.push(data[i].y);
					}
				}
				let datas = [];
				for (let i = 0; i < abscisse.length; i++) {
					let newArray = [];
					for (let j = 0; j < ordonnee.length; j++) {
						for (let k = 0; k < data.length; k++) {
							if (abscisse[i] === data[k].x && ordonnee[j] === data[k].y) {
								newArray.push(data[k].count);
							}
						}
					}
					if (newArray.length > 0) {
						datas.push(newArray);
					}
				}
				setData(datas);
				setXLabels(abscisse.fill(0).map((_, i) => `${i}`));
				setYLabels(ordonnee.fill(0).map((_, i) => `${i}`));
				setSpinner(false);
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
