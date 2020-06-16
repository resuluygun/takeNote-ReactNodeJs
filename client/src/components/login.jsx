import React, { useState, useEffect } from "react";
import qs from "qs";
import axios from "axios";
import "./login.css";
import { useHistory, Link } from "react-router-dom";

function Login() {

  var email, pw, btn;
  let history = useHistory();

  function handleSubmit(event) {

    email = document.getElementById("emailElement");
    pw = document.getElementById("pwElement");
    btn = document.getElementsByClassName("btn-warning")[0];

    if (checkForm()) getRequest();

    event.preventDefault();

  }

  function getRequest() {
    deleteValid(email);
    deleteValid(pw);


    axios({
      method: "post",
      url: "/user/login",
      data: qs.stringify({
        email: email.value,
        password: pw.value
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
    })
      .then(result => {
        console.log(result);
        if (result.data) history.push("home")
        else btn.style.display = "contents"
      });
  }

  function checkForm() {
    const elements = [];
    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mailFound = mailRegex.test(email.value);
    elements.push({ element: email, status: mailFound });

    const pwFound = pw.value === "" ? false : true;
    elements.push({ element: pw, status: pwFound });

    btn.style.display = "none"

    changeElementStyle(elements);

    // (mailFound && pwFound) ? return true : return false
    return ((mailFound && pwFound) ? true : false);


  }

  function addValid(element) {
    element.classList.remove("is-invalid")
    //element.classList.add("is-valid")
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
          <div className="invalid-feedback">
            Please enter valid e-mail.
          </div>
        </div>
        <div className="form-group">
          <label for="pwElement">Password</label>
          <input type="password" className="form-control" id="pwElement"></input>
          <div className="valid-feedback">
          </div>
          <div className="invalid-feedback">
            Password doesn't be empty.
          </div>
        </div>

        <div className="btn-warning">
          <p>Email or password isn't correct.</p>
        </div>
        <button type="submit" className="btn btn-primary btn-submit-register">Submit</button>
      </form>

      <div className="registerBottom">
        Don't have an accout? <Link to="/register">Register</Link>

      </div>
    </div>
  );

}

export default Login;