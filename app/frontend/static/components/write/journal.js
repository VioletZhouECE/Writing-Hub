import React from "react";
import LanguageSelect from "../reusable/language_select";

class Journal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            languageFlag : "English"
        }

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    handleLanguageChange(e){
        this.setState({langaugeFlag : e.target.value});
    }
    render(){
        return(
            <div className = "d-flex justify-content-between">
                <div className = "col-sm-6 col-sm-6 col-sm-6">I am writing a journal in</div>
                <LanguageSelect value = {this.state.langaugeFlag} handleChange = {this.handleLanguageChange}></LanguageSelect>
            </div>
        )
    }
}

export default Journal;