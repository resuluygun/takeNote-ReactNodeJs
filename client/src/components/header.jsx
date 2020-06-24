import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.css"
import Button from '@material-ui/core/Button';
import store from "../redux/store";
import axios from "axios"



function Header() {

    let history = useHistory();

    function handleLogout() {

        axios.get("/user/logout").then(data => {
            store.dispatch({ type: "NULL" })
            history.replace("login");

        })
    }

    return (
        // < !--As a link-- >
        <nav className="navbar navbar-expand-lg  justify-content-between">
            <Link className="navbar-brand" to="/home">Keeper</Link>

            <button className="logoutHeader btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )

}

export default Header;