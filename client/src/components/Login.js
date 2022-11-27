import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/login.scss";


function callServer() {
    var Database = [];
    const promise = axios.get(`http://localhost:8000/get`, {
        params: {
            table: 'account',
        },
    })
    
    promise.then((response) => Database.push(response.data))
    
    return Database;
}

export default function Login() {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        var database = [];
        
        database= callServer();

        console.log(database);

        const userData = database.find((user) => user.username === uname.value);

        console.log(userData);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
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
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
            <div style={{marginTop: '20px'}}>
            <Link to="/inscription" style={{textDecoration: 'none', color: '#30475e'}}>Pas de compte ? S'inscrire</Link>
            </div>
        </div>
    );

    return (
        <div className="applogin" id='backgroundDarkLight'>
            <div className="login-form">
                <div className="title">Se connecter</div>
                {isSubmitted ? <div>Vous êtes connecté</div> : renderForm}
            </div>
        </div>
    );
}