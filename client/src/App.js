import React, { useEffect, useState } from 'react';

//router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

//forRedux
import store from "./redux/store";

//components
import Home from "./components/home";
import Login from "./components/login";
import Header from "./components/header"
import Footer from "./components/footer"
import Register from "./components/register";


//css 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//requests
import qs from "qs";
import axios from "axios";


function App() {
  const [isLoading, setLoading] = useState(true);
  store.subscribe(() => console.log(""));

  useEffect(() => {
    axios.get(
      "/user/islogged").then(data => {

        if (data.data) store.dispatch({ type: "EXIST" })
        else store.dispatch({ type: "NULL" })

        setLoading(false);
      });
  }, []);

  return (
    <Router>
      {!isLoading && !store.getState() && <Redirect to="/login" />}
      {!isLoading && store.getState() && <Redirect to="/home" />}

      {/* <Header /> */}
      {/* <Switch> */}

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      {/* </Switch> */}
      {/* <Footer /> */}
    </Router>

  );
}
export default App;
