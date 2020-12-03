import React, {useContext} from "react";
import Avatar from 'react-avatar';
import { useHistory } from "react-router-dom";
import {UserContext} from "../context/user_context";

const MenuBar = (props)=>{
    const history = useHistory();
    const {userContext} = useContext(UserContext);

    const useUserInfo = ()=>{
        return UserInfo;
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
                        <a className="nav-link" href="javascript:;" onClick={()=>{history.push('/profile')}}>Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;" onClick = {props.handleLogout}>Logout</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0 float-right">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <Avatar className="mr-2" size="48" src={userContext.avatarUrl} name={useUserInfo().username} round={true}></Avatar>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={()=>{history.push('/write')}}>Start Writing!</button>
                </form>
                </div>
            </nav>
        </div>
    )
}

export default MenuBar;