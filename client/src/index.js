import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Editor";
import Login from "./components/Login";
import DrawingPanel from "./components/DrawingPanel";
import "./styles/App.scss";
import Inscription from './components/Inscription';




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutsWithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="pixelArt" element={<DrawingPanel />} />
          <Route path="login" element={<Login />} />
          <Route path="inscription" element={<Inscription />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 

function LayoutsWithNavbar() {
  return (
    <>
      {/* Your navbar component */}
      <Navbar />

      {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
      <Outlet />

      {/* You can add a footer to get fancy in here :) */}
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
