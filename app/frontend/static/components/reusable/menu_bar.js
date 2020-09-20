import React from "react";
import {Link} from "react-router-dom";

const MenuBar = (props)=>{
    return(
        <div className="bg-dark">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark main-container">
                <a className="navbar-brand" href="#">Writing Hub</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="javascript:;"><Link to = "/">Home</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;"><Link >Entries</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;"><Link>Profile</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;"><Link>Logout</Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;"><Link to = "/write">Write</Link></a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0 float-right">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit">Start Writing!</button>
                </form>
                </div>
            </nav>
        </div>
    )
}

export default MenuBar;