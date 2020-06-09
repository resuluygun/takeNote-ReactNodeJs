import React,  {useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login";
import Header from "./components/header"
import Footer from "./components/footer"


import 'bootstrap/dist/css/bootstrap.min.css';
// import "/css/style.css";

import './App.css';
import qs from "qs";
import axios from "axios";


function App() {


  // axios({
  //   method: "post",
  //   url: "/user/login",
  //   data: qs.stringify({
  //     email: "fb@gmail.com",
  //     password: "test123"
  //   }),
  //   headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
  // })
  //   .then(result => {
  //     console.log(result);
  //     axios.get("/note/getall")
  //       .then(notes => console.log(notes));
  //   }
  //   );



  return (
    <Router>
      <Header />

      {/* <Link to="/sign">Sign</Link>
      <Link to="/home">Home</Link> */}

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>

      <Footer />
    </Router>

  );
}

export default App;
