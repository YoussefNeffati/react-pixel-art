import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/login.scss";


function callServer() {
    var Database = [];
    //ne pas oublier de changer l'url
    const promise = axios.get(`http://localhost:8000/get`, {
        params: {
            table: 'account',
        },
    })

    promise.then((response) => Database.push(response.data))

    return Database;
}

function postServer(name, password) {

    const res = axios.post('http://localhost:8000/inscription', {
        params: {
            table: 'account',
        },
        user: {
            name: name.value.toString(),
            
            password: password.value.toString()
            
        }
    }).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

export default function Inscription() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const errors = {
        uname: "Ce nom a déjà été pris"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        var database = [];

        database = callServer();

        console.log(database);

        const userData = database.find((user) => user.username === uname.value);

        console.log("userData : " + userData);

        if (userData) {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }

        // Post user info
        postServer(uname, pass);
        setIsSubmitted(true);
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
            <div style={{ marginTop: '20px' }}>
            </div>
        </div>
    );

    return (
        <div className="applogin" id="backgroundDarkLight">
            <div className="login-form">
                <div className="title">S'inscrire</div>
                {isSubmitted ? <div>Vous êtes inscrit</div> : renderForm}
            </div>
        </div>
    );
}