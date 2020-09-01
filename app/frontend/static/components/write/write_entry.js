import React from "react";
import {Route, Switch, Link} from "react-router-dom";
import Journal from "./journal";
import Question from "./question";

class WriteEntry extends React.Component{
    render(){
        return(
        <div className = "center-container">
            <div className = "d-flex justify-content-center">
                <div className = "p-0 col-sm-6 col-sm-6 col-sm-6"><Link to="/write">Write a journal</Link></div>
                <div className = "p-0 col-sm-6 col-sm-6 col-sm-6"><Link to="/write/question">Ask a question</Link></div>
            </div>
            <hr></hr>
            <Switch>
                <Route path="/write/question" component={Question}></Route>
                <Route path="/write" component={Journal}></Route>
            </Switch>
        </div>
        )
    }
}

export default WriteEntry;
