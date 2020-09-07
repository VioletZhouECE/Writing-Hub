import React from "react";
import {Route, Switch} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import LanguageForm from "./language_form";
import SignupForm from "./signup_form";

class Signup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userData: {},
            languageData: {}
        }

        this.handleSubmitLanguage = this.handleSubmitLanguage.bind(this);
        this.handleSubmitUserData = this.handleSubmitUserData.bind(this);
    }

    handleSubmitLanguage(data){
        this.setState({lanuguageData: data}, ()=>{
            this.submitSignup();
        });
    }

    handleSubmitUserData(data){
        this.setState({userData: data}, ()=>{
            this.props.verifyUsername(data.username)
            .then(()=>{
            //display the language form
              this.props.history.push('/signup/language');
            }).catch(
                //do nothing when the promise rejects
            )
        });
    }

    //combine data from the two forms and submit
    submitSignup(){
        const combinedData = {...this.state.userData, ...this.state.languageData};
        this.props.handleSubmitForm(combinedData);
    }

    render(){
        return (
            <Switch>
                <Route path = "/signup/language" render = {(props) => <LanguageForm handleSubmitForm = {this.handleSubmitLanguage}></LanguageForm>}></Route>
                <Route path = "/signup" render = {(props) => <SignupForm handleSubmitForm = {this.handleSubmitUserData}></SignupForm>}></Route>
            </Switch>
        )
    }
}

export default withRouter(Signup);