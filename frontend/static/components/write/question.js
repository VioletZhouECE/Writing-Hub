import React from "react";
import LanguageSelect from "../reusable/language_select";
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets'

//hard-coded tags
const tags = ["grammar", "word choice", "general opinion", "writing tips", "translation"]

class Question extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            languageFlag : "English",
            title: "",
            invalidTitle: false,
            body: "",
            invalidBody: false
        }

        this.baseState = this.state;

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLanguageChange(e){
        this.setState({languageFlag : e.target.value});
    }

    handleTitleChange(e){
        this.setState({title : e.target.value});
    }

    handleBodyChange(content){
        this.setState({body : content});
    }

    handleSubmit(){
        if(this.validate()){
            this.props.handleSubmitQuestion(this.state);
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

    render(){
        return(
            <div>
                <div className = "d-flex justify-content-between form-spacing">
                    <div className = "p-0 col-sm-6 col-sm-6 col-sm-6">I am asking a question about</div>
                    <div className = "p-0 col-sm-6 col-sm-6 col-sm-6"><LanguageSelect value = {this.state.langaugeFlag} handleChange = {this.handleLanguageChange}></LanguageSelect></div>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0" for = "question_title_input">Title</label>
                    <div style = {{display : this.state.invalidTitle? "inline" : "none"}}>
                        <p className = "alert alert-danger">Title cannot be empty</p>
                    </div>
                    <small id = "question_title_help" class = "form-text text-muted">Briefly describe what your question is about</small>
                    <input type = "text" className = "form-control" id = "question_title_input" value={this.state.title} onChange={this.handleTitleChange}></input>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0">Body</label>
                    <div style = {{display : this.state.invalidBody? "inline" : "none"}}>
                        <p className = "alert alert-danger">Body cannot be empty</p>
                    </div>
                    <small id ="question_help" class = "form-text text-muted">Describe your question</small>
                    <textarea className="form-control mb-2" rows="10" value={this.state.body} onChange={(e)=>this.handleBodyChange(e.target.value)}></textarea>
                </div>
                <div className = "form-group form-spacing">
                    <label className = "m-0" for = "question_title_input">Title</label>
                    <small id = "question_tags_help" class = "form-text text-muted">Select tags to categorize your questions</small>
                    <Multiselect
                        data={tags}
                        textField='tags'
                        caseSensitive={false}
                        filter='contains'
                    />
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

export default Question;