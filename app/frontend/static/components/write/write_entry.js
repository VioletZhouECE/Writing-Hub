import React from "react";
import {Route, Switch, Link} from "react-router-dom";
import Journal from "./journal";
import Question from "./question";

class WriteEntry extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmitJournal = this.handleSubmitJournal.bind(this);
    }

    handleSubmitJournal(data){
        fetch('write/journal', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                language: data.languageFlag,
                title: data.title,
                body: data.body,
                comment: data.comment
            })
        })
    }

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
                <Route path="/write" render={(props)=><Journal handleSubmitJournal={this.handleSubmitJournal}></Journal>}></Route>
            </Switch>
        </div>
        )
    }
}

export default WriteEntry;