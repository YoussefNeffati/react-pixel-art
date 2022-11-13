import React, { useState } from "react";
import axios from 'axios';
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
        </div>
    );

    return (
        <div className="applogin">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}