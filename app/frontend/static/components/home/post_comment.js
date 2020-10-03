import React from "react";
import NewComment from "./new_comment";
import SelectedComment from "./selected_comment";
import moment from "moment";

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
        this.setEditorHtml(this.props.body);
    }

    componentDidUpdate(prevProps, prevState){
        //if body has been loaded 
        if (this.props.body !== prevProps.body) {
            this.setEditorHtml(this.props.body)
          }
    }

    setEditorHtml(html){
        var $ = tinymce.dom.DomQuery;
        $('#editbox_post').attr('attr', 'value').html(html);
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
        //store comment to the db
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