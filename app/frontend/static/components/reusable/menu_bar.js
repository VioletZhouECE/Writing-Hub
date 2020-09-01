import React from "react";
import {Link} from "react-router-dom";

class MenuBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div style = {{backgroundColor: "rgb(52, 225, 235)"}}>
            <div className = "d-flex flex-row justify-content-center">
                <div className = "col-sm-2 col-md-2 col-lg-2"><Link to = "/">Home</Link></div>
                <div className = "col-sm-2 col-md-2 col-lg-2"><Link >Entries</Link></div>
                <div className = "col-sm-2 col-md-2 col-lg-2"><Link>Profile</Link></div>
                <div className = "col-sm-2 col-md-2 col-lg-2" onClick = {this.props.handleLogout}><Link>Logout</Link></div>
                <div className = "col-sm-2 col-md-2 col-lg-2"><Link to = "/write">Write</Link></div>
            </div>
        </div>
        )
    }
}

export default MenuBar;