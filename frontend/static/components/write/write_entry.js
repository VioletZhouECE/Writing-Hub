import React from "react";
import {Route, Switch, Link} from "react-router-dom";
import Journal from "./journal";
import Question from "./question";
import {displaySuccessMessage, displayErrorMessage} from "../../scripts/display_messages";

class WriteEntry extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmitJournal = this.handleSubmitJournal.bind(this);
        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    }

    handleSubmitJournal(data){
        fetch('/journals', {
            method: 'POST',
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
        .then(res => {
            if (res.status === 200){
                return res.json();
            } else {
                return res.json().then((err) => {
                    throw new Error(err.message);
                })}
        })
        .then(resData =>{
            displaySuccessMessage(resData.msg);
        })
        .catch(err=>{
            displayErrorMessage(err.message)
        })
    }

    handleSubmitQuestion(data){
        fetch('/questions', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                language: data.languageFlag,
                title: data.title,
                body: data.body
            })
        })
        .then(res => {
            if (res.status === 200){
                return res.json();
            } else {
                return res.json().then((err) => {
                    throw new Error(err.message);
                })}
        })
        .then(resData =>{
            displaySuccessMessage(resData.msg);
        })
        .catch(err=>{
            displayErrorMessage(err.message)
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
                <Route path="/write/question" render={(props)=><Question handleSubmitQuestion={this.handleSubmitQuestion}></Question>}></Route>
                <Route path="/write" render={(props)=><Journal handleSubmitJournal={this.handleSubmitJournal}></Journal>}></Route>
            </Switch>
        </div>
        )
    }
}

export default WriteEntry;
