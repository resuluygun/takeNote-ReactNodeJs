import React, {useContext} from "react";
import {Link} from "react-router-dom";

function Header() {

    return (
        // < !--As a link-- >
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">Keeper</Link>
            {/* <a className="navbar-brand" href="/">Keeper</a>  */}
        </nav>
    )

}

export default Header;