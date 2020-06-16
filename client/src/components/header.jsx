import React, { useContext } from "react";
import { Link } from "react-router-dom";

import store from "../redux/store";


function Header(props) {

    return (
        // < !--As a link-- >
        <nav className="navbar navbar-expand-lg  justify-content-between">
            <Link className="navbar-brand" to="/">Keeper</Link>
            {/* <a className="navbar-brand" href="/">Keeper</a>  */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0">
                {props.user && <button className="btn btn-success " id="header-logout"  type="submit">Search</button>}
            </form>
            </div>
        </nav>
    )

}

export default Header;