import React from "react";
import LanguageSelect from "../reusable/language_select";
import { Editor } from '@tinymce/tinymce-react';
import {tiny_editor} from "../../../config/api_keys";

class Question extends React.Component{
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
                    <div className = "p-0 col-sm-6 col-sm-6 col-sm-6">I have a question about</div>
                    <div className = "p-0 col-sm-6 col-sm-6 col-sm-6"><LanguageSelect value = {this.state.langaugeFlag} handleChange = {this.handleLanguageChange}></LanguageSelect></div>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0" for = "questionTitleInput">Title</label>
                    <small id = "questionTitleHelp" class = "form-text text-muted">Give a summary of your question</small>
                    <input type = "text" className = "form-control" id = "questuinTitleInput"></input>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0">Body</label>
                    <small id ="questionBodyHelp" class = "form-text text-muted">Give more details about your question</small>
                    <Editor
                        id = "questionEditor"
                        apiKey = {tiny_editor}
                        init = {{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                            }}></Editor>
                </div>
            </div>
        )
    }
}

export default Question;