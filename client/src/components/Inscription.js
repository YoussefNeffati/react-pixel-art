import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/login.css";


function callServer() {
    const Database = [];
    const promise = axios.get(`http://localhost:8000/get`, {
        params: {
            table: 'account',
        },
    })
    
    const DataPromise = promise.then((response) => Database.push(response.data))
    
    return Database;
}

function postServer(name, password) {
    axios.post('/inscription', {
        name: name,
        password: password
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}

export default function Inscription() {

    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        const database = [];
        
        database.push(callServer());

        console.log(database);

        const userData = null;

        for (let index = 0; index < database[0][0].length; index++) {
            if (database[0][0][index].username === uname.value) {
                userData=database[0][0][index];
                break;
            }
        }
        //const userData = database.find((user) => user.username === uname.value);

        console.log("userData : "+userData);

        // Post user info
        postServer(userData.name, userData.password);
        setIsSubmitted(true);
    };


    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
            <div style={{marginTop: '20px'}}>
            </div>
        </div>
    );

    return (
        <div className="applogin">
            <div className="login-form">
                <div className="title">S'inscrire</div>
                {isSubmitted ? <div>Vous êtes inscrit</div> : renderForm}
            </div>
        </div>
    );
}