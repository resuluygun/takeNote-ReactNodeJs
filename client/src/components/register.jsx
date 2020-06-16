import React, { useState, useEffect } from "react";
import qs from "qs";
import axios from "axios";
import "./register.css";
import { useHistory, Link } from "react-router-dom";

function Register() {

    var email, pw, btn, pwConfirm, emailFeedBack, pwFeedBack, pwConfirmFeedBack;
    let history = useHistory();

    function handleSubmit(event) {

        email = document.getElementById("emailElement");
        pw = document.getElementById("pwElement");
        pwConfirm = document.getElementById("pwConfirmElement");

        emailFeedBack = document.getElementById("emailFeedBack");
        pwFeedBack = document.getElementById("pwFeedBack");
        pwConfirmFeedBack = document.getElementById("pwConfirmFeedBack");

        btn = document.getElementsByClassName("btn-warning")[0];

        if (checkForm()) getRequest();

        event.preventDefault();

    }

    function getRequest() {
        deleteValid(email);
        deleteValid(pw);
        deleteValid(pwConfirm)
        pwConfirmFeedBack.innerHTML = "Confirm password can't be empty.";
        pwFeedBack.innerHTML = "Password can't be empty.";
        emailFeedBack.innerHTML = "Please enter a valid e-mail.";

        axios({
            method: "post",
            url: "/user/register",
            data: qs.stringify({
                email: email.value,
                password: pw.value,
                passwordConfirm: pwConfirm.value
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
        })
            .then(result => {
                const errors = result.data.errors;
                console.log(result.data);
                if (errors.length >0 ) {

                    errors.map(error => {
                        console.log(error);

                        switch (error.msg) {
                            case "Passwords did not match":
                                pwConfirmFeedBack.innerHTML = "Passwords did not match";
                                addInvalid(pwConfirm);
                                break;
                            case "Password must be at least 6 characters":
                                pwFeedBack.innerHTML = "Password must be at least 6 characters";
                                addInvalid(pw);
                                deleteValid(pwConfirm);
                                break;
                            case "Email already exists":
                                emailFeedBack.innerHTML = "Email already exists";
                                addInvalid(email);
                                break;
                        }
                    })
                }
                else {
                    history.push("login");
                }
            });
    }

    function checkForm() {
        const elements = [];

        const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const mailFound = mailRegex.test(email.value);
        elements.push({ element: email, status: mailFound });

        const pwFound = pw.value === "" ? false : true;
        elements.push({ element: pw, status: pwFound });

        const pwConfirmFound = pwConfirm.value === "" ? false : true;
        elements.push({ element: pwConfirm, status: pwConfirmFound });

        btn.style.display = "none"

        changeElementStyle(elements);

        // (mailFound && pwFound) ? return true : return false
        return ((mailFound && pwFound && pwConfirmFound) ? true : false);
    }

    function addValid(element) {
        element.classList.remove("is-invalid")
        element.classList.add("is-valid")
    }

    function addInvalid(element) {
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
    }

    function deleteValid(element) {
        element.classList.remove("is-valid")
        element.classList.remove("is-invalid")
    }

    function changeElementStyle(elements) {
        elements.map(el => {
            switch (el.status) {
                case true:
                    addValid(el.element)
                    break;
                case false:
                    addInvalid(el.element)
                    break;
                default:
                    deleteValid(el.element)
                    break;
            }
        })
    }


    return (
        <div className="container col-xl-4 col-lg-5 col-md-6 col-sm-6 col-10">
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="emailElement">Email address</label>
                    <input type="email" className="form-control" id="emailElement" aria-describedby="emailHelp"></input>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    <div className="valid-feedback">
                    </div>
                    <div className="invalid-feedback" id="emailFeedBack">
                        Please enter a valid e-mail.
                    </div>
                </div>
                <div className="form-group">
                    <label for="pwElement">Password</label>
                    <input type="password" className="form-control" id="pwElement"></input>
                    <div className="valid-feedback">
                    </div>
                    <div className="invalid-feedback" id="pwFeedBack">
                        Password can't be empty.
                    </div>
                </div>

                <div className="form-group">
                    <label for="pwElement">Confirm Password</label>
                    <input type="password" className="form-control" id="pwConfirmElement"></input>
                    <div className="valid-feedback">
                    </div>
                    <div className="invalid-feedback" id="pwConfirmFeedBack">
                        Confirm password can't be empty.
                    </div>
                </div>

                <div className="btn-warning">
                    <p>This mail is already exist.</p>
                </div>
                <button type="submit" className="btn btn-primary btn-submit-register">Submit</button>
            </form>

            <div className="registerBottom">
                Have an account? <Link to="/login">Login</Link>

            </div>
        </div>
    );
}

export default Register;