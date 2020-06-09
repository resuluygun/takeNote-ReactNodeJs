import React, { useState, useEffect } from "react";

import "./login.css";

function Sign() {

  return (
    <div className="container col-xl-4 col-lg-5 col-md-6 col-sm-6 col-10">
      <form className="loginForm">
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"></input>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );

}

export default Sign;