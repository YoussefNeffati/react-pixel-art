import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import App from "./components/App";
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById("root");

function callServer() {
  axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/get`, {
    params: {
      table: 'account',
    },
  }).then((response) => {
    console.log(response.data);
  });
}

ReactDOM.render((
    <BrowserRouter>
        <App /> {/* The various pages will be displayed by the `Main` component. */}
    </BrowserRouter>),
  rootElement
);
