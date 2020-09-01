import React from "react";
import LanguageSelect from "../reusable/language_select";
import { Editor } from '@tinymce/tinymce-react';
import {tiny_editor} from "../../../config/api_keys";

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
                <div className = "form-group form-spacing">
                    <label className = "m-0" for = "titleInput">Title</label>
                    <small id = "titleHelp" class = "form-text text-muted">Briefly describe what your journal is about</small>
                    <input type = "text" className = "form-control" id = "titleInput"></input>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0">Body</label>
                    <small id ="journalHelp" class = "form-text text-muted">Now start your journal!</small>
                    <Editor
                        id = "journal-editor"
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
                <div className = "form-group form-spacing">
                    <label className = "m-0">Additional Note</label>
                    <small id = "additionalNoteHelp" class="form-text text-muted">
                        Is there anything in particular you want others to pay attention to? i.e. a sentence/word choice you are unsure about
                    </small>
                    <Editor
                        id = "additional-note-editor"
                        apiKey = {tiny_editor}
                        init = {{
                        height: 200,
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

export default Journal;
