import React from "react";
import {Link} from "react-router-dom";

class MenuBar extends React.Component{
    render(){
        return(
        <div style = {{backgroundColor: "rgb(52, 225, 235)"}}>
            <div className = "d-flex flex-row justify-content-center">
                <div className = "col-sm-3 col-md-3 col-lg-3"><Link>Home</Link></div>
                <div className = "col-sm-3 col-md-3 col-lg-3"><Link >Entries</Link></div>
                <div className = "col-sm-3 col-md-3 col-lg-3"><Link>Profile</Link></div>
                <div className = "col-sm-3 col-md-3 col-lg-3"><Link>Logout</Link></div>
            </div>
        </div>
        )
    }
}

export default MenuBar;