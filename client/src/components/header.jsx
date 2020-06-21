import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.css"
import Button from '@material-ui/core/Button';
import store from "../redux/store";
import axios from "axios"



function Header() {

    let history = useHistory();

    function handleLogout(){

        axios.get("/user/logout").then(data=>{
            store.dispatch({ type: "NULL" })
            history.replace("login");
            
        })
    }

    return (
        // < !--As a link-- >
        <nav className="navbar navbar-expand-lg  justify-content-between">
            <Link className="navbar-brand" to="/">Keeper</Link>
            {/* <a className="navbar-brand" href="/">Keeper</a>  */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-0">
                    {/* <button className="btn btn-success " id="header-logout" type="submit">Logout</button> */}
                    <Button className="logoutHeader" onClick={handleLogout} variant="contained" color="secondary">
                        Logout
                    </Button>
                
                </form>

            </div>
        </nav>
    )

}

export default Header;