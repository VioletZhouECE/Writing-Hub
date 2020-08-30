import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter,Route, Switch} from "react-router-dom";
import MainPage from "../react_components/main_page"

ReactDOM.render(
    <BrowserRouter>
        <Route path='/' component={MainPage}></Route>
    </BrowserRouter>,
document.getElementById("root"))
