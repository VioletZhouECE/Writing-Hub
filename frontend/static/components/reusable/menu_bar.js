import React from "react";
import { useHistory } from "react-router-dom";

const MenuBar = (props)=>{
    const history = useHistory();

    const handleClickButton = ()=>{
        history.push("/write");
    }

    return(
        <div className="menubar-background">
            <nav className="navbar navbar-expand-lg navbar-light main-container menubar-background">
                <a className="navbar-brand" href="javascript:;">Writing Hub</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;">Entries</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;" onClick = {props.handleLogout}>Logout</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0 float-right">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <i className="fas fa-user-circle fa-2x mr-2"></i>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={handleClickButton}>Start Writing!</button>
                </form>
                </div>
            </nav>
        </div>
    )
}

export default MenuBar;