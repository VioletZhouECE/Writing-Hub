import React from "react";
import LanguageSelect from "../reusable/language_select";
import { Editor } from '@tinymce/tinymce-react';
import {tiny_editor} from "../../../config/api_keys";

class Journal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            languageFlag : "English",
            title: "",
            invalidTitle: false,
            invalidBody: false,
            body: "",
            comment: ""
        }

        this.baseState = this.state;

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLanguageChange(e){
        this.setState({langaugeFlag : e.target.value});
    }

    handleTitleChange(e){
        this.setState({title : e.target.value});
    }

    handleBodyChange(content, editor){
        this.setState({body : content});
    }

    handleCommentChange(content, editor){
        this.setState({comment : content});
    }

    handleSubmit(){
        if(this.validate()){
            this.resetform();
            this.displaySuccessMessage();
            //submit data
        }
    }

    validate(){
        var isValid = true;

        if(this.state.title.length == 0){
            this.setState({invalidTitle : true});
            isValid = false;
        } else {
            this.setState({invalidTitle : false}); 
        }
        
        if (this.state.body.length == 0){
            this.setState({invalidBody : true});
            isValid = false;
        } else {
            this.setState({invalidBody : false}); 
        }

        return isValid;
    }

    resetform(){
        this.setState(this.baseState);
    }

    displaySuccessMessage(){
        $("#success_message").css("display", "inline");
        window.setTimeout(() => {
            $("#success_message").css("display", "none");
        }, 3000)
    }


    render(){
        return(
            <div>
                <div className = "d-flex justify-content-between form-spacing">
                    <div className = "p-0 col-sm-6 col-sm-6 col-sm-6">I am writing a journal in</div>
                    <div className = "p-0 col-sm-6 col-sm-6 col-sm-6"><LanguageSelect value = {this.state.langaugeFlag} handleChange = {this.handleLanguageChange}></LanguageSelect></div>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0" for = "journal_title_input">Title</label>
                    <div style = {{display : this.state.invalidTitle? "inline" : "none"}}>
                        <p className = "alert alert-danger">Title cannot be empty</p>
                    </div>
                    <small id = "journal_title_help" class = "form-text text-muted">Briefly describe what your journal is about</small>
                    <input type = "text" className = "form-control" id = "journal_title_input" value={this.state.title} onChange={this.handleTitleChange}></input>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0">Body</label>
                    <div style = {{display : this.state.invalidBody? "inline" : "none"}}>
                        <p className = "alert alert-danger">Body cannot be empty</p>
                    </div>
                    <small id ="journal_help" class = "form-text text-muted">Now start your journal!</small>
                    <Editor
                        id = "journal_editor"
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
                            }}
                        value = {this.state.body}
                        onEditorChange={this.handleBodyChange}></Editor>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0">Additional Note</label>
                    <small id = "additional_note_help" class="form-text text-muted">
                        Is there anything in particular you want others to pay attention to? i.e. a sentence/word choice you are unsure about
                    </small>
                    <Editor
                        id = "additional_note_editor"
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
                            }}
                        value = {this.state.comment}
                        onEditorChange={this.handleCommentChange}></Editor>
                </div>
                <div className = "form-spacing">
                    <div style = {{width :"250px", margin : "auto"}}>
                        <button type= "button" className="btn-primary" style = {{width : "100%"}} onClick = {this.handleSubmit}>Publish!</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Journal;
