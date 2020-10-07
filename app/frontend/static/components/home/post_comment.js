import React from "react";
import NewComment from "./new_comment";
import SelectedComment from "./selected_comment";
import moment from "moment";
import {displaySuccessMessage, displayErrorMessage} from "../../scripts/display_messages";

class PostComment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isNewComment: true,
            selectedComment: {
                comment: null,
                author: null,
                time: null
            },
            //editor instance
            editor: null,
            id: 1
        }
    }

    componentDidMount(){
        this.initAnotation();
    }

    componentDidUpdate(prevProps, prevState){
        //to-do: look for a more elegant solution
        if (this.props.postData.body !== prevProps.postData.body && this.props.postData.body) {
            //set content when the page is loaded the first time
            tinymce.activeEditor.setContent(this.props.postData.body);
            //set content upon page refresh
            if (!tinymce.get("editbox_post").getContent({ format: 'raw' })){
                $("#editbox_post").html(this.props.postData.body);
            }
          }
    }

    componentWillUnmount(){
        tinymce.remove();
    }

    initAnotation(){ 
        let self = this;
        //annotation settings        
        const postSettings = {
            selector: "#editbox_post",
            toolbar: ['annotate-alpha'],
            menubar: false,
            height: 300,
            content_style: '.mce-annotation { background-color: darkgreen; color: white; } ' + 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            setup: function (editor) {
                self.setState({editor: editor});
                editor.on('init', function () {
                    editor.annotator.register('alpha', {
                    persistent: true,
                    decorate: function (uid, data) {
                        return {
                        attributes: {
                            'data-mce-comment': data.comment ? data.comment : '',
                            'data-mce-author': data.author ? data.author : 'anonymous',
                            'data-mce-time': data.time ? data.time  : ''
                            }
                        };
                    }
                    });

                    editor.annotator.annotationChanged('alpha', function (state, name, obj) {
                        if (state){
                            const annotationData = obj.nodes[0].dataset;
                            let selectedComment = {
                                comment: annotationData.mceComment,
                                author: annotationData.mceAuthor,
                                time: annotationData.mceTime
                            }
                            self.setState({
                                isNewComment: false,
                                selectedComment: selectedComment});
                        } else {
                            self.setState({isNewComment: true});
                        }
                    });
                });
            }
        };

        //init annotations
        tinymce.init(postSettings);
    }

    handleSaveComment(comment){
        //apply annotation
        this.state.editor.annotator.annotate('alpha', {
            uid: this.state.id,
            comment: comment,
            author: this.props.userInfo.username,
            time: moment().format('MMM Do YYYY, h:mm:ss a')
        }); 

        this.setState((prevState)=> {
            return {
                id: prevState.id + 1,
                isNewComment: false
            }
        });
    }

    handleSubmit(){
        //store editedJournal to the db
        fetch('/editedJournals', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                journalId: this.props.postData.id,
                body: tinymce.get("editbox_post").getContent({ format: 'raw' })
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
            <>
                <div className="pb-2 post-edit-header">Edit this journal:</div>
                <div id = "editbox_container">
                    <div className = "editbox_post_container">
                        <textarea id="editbox_post" className = "mceEditor">
                        </textarea>
                    </div>
                    <div className = "editbox_comment_container">
                        <div id="editbox_comment">
                            {!this.state.isNewComment && <SelectedComment selectedComment = {this.state.selectedComment}></SelectedComment>}
                            <NewComment handleSave = {this.handleSaveComment.bind(this)} editor = {this.state.editor? this.state.editor: null}></NewComment>
                        </div>
                    </div>
                    <div className = "clear-float"></div>
                </div>
                <div className = "pt-3">
                    <button type= "button" className="btn-primary" onClick = {this.handleSubmit.bind(this)}>Post Your Comment</button>
                </div>
            </>
        )
    }
}

export default PostComment;