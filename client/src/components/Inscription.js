import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";


async function callServer() {
    let res = await axios.get('http://localhost:8000/users');

    let data = res.data;
    console.log(data);

    return data;
}

function postServer(name, password) {

    axios.post('http://localhost:8000/adduser', {

        name: name.value.toString(),
        password: password.value.toString()

    }).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

export default function Inscription() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate();
    
    const errors = {
        uname: "Ce nom a déjà été pris"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        callServer().then(value => {

            const userData = value.find((user) => user.name === uname.value);

            //console.log(userData);

            // Compare user info
            if (userData) {
                // Username existe deja
                setErrorMessages({ name: "uname", message: errors.uname });
            }
            else{
            // Post user info
            postServer(uname, pass);
            setIsSubmitted(true);
            localStorage.setItem('username', uname.value.toString());
            navigate('/');
            window.location.reload();
            }
            

        });


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
                    <label class="label">Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label class="label">Password </label>
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