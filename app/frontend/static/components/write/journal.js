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
            <div>
                <div className = "d-flex justify-content-between form-spacing">
                    <div className = "p-0 col-sm-6 col-sm-6 col-sm-6">I am writing a journal in</div>
                    <div className = "p-0 col-sm-6 col-sm-6 col-sm-6"><LanguageSelect value = {this.state.langaugeFlag} handleChange = {this.handleLanguageChange}></LanguageSelect></div>
                </div>
                <div class="form-group form-spacing">
                    <label for="titleInput">Title</label>
                    <input type="text" className = "form-control" id="titleInput"></input>
                </div>
            </div>
        )
    }
}

export default Journal;
