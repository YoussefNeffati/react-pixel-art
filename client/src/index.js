import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Editor";
import Login from "./components/Login";
import DrawingPanel from "./components/DrawingPanel";
import "./styles/App.scss";
import Inscription from "./components/Inscription";
import Board from "./components/Board";
import BoardPixelAndDetails from "./components/BoardPixelAndDetails";
import AdminParameters from "./components/AdminParameters";
import Users from "./components/Users";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LayoutsWithNavbar />}>
					<Route path="/" element={<Home />} />
					<Route path="pixelArt" element={<DrawingPanel />} />
					<Route path="login" element={<Login />} />
					<Route path="inscription" element={<Inscription />} />
					<Route path="allBoard" element={<Board />} />
					<Route path="boardPixelAndDetails/:boardId" element={<BoardPixelAndDetails />} />
					<Route path="admin" element={<AdminParameters />} />
					<Route path="users" element={<Users />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

function LayoutsWithNavbar() {
	return (
		<>
			{<Navbar />}

			{<Outlet />}
		</>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	rootElement
);
