import React from "react";
import NewComment from "./new_comment";
import SelectedComment from "./selected_comment";

class PostComment extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isNewComment: true,
            selectedComment: {
                comment: null,
                author: null
            },
            //editor instance
            editor: null,
            id: 1
        }
    }

    componentDidMount(){
        this.initAnotation();
    }

    initAnotation(){ 
        let self = this;
        //annotation settings        
        const postSettings = {
            selector: '#editbox_post',
            toolbar: ['annotate-alpha'],
            menubar: false,
            height: '300px',
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
                            'data-mce-author': data.author ? data.author : 'anonymous'
                            }
                        };
                    }
                    });

                    editor.annotator.annotationChanged('alpha', function (state, name, obj) {
                        if (state){
                            const annotationData = obj.nodes[0].dataset;
                            let selectedComment = {
                                comment: annotationData.mceComment,
                                author: annotationData.mceAuthor
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
            author: this.props.userInfo.username
        }); 

        this.setState((prevState)=> {
            return {
                id: prevState.id + 1,
                isNewComment: false
            }
        });
    }

    render(){
        return(
            <>
                <div className="pb-2">Edit the journal:</div>
                <div id = "editbox_container">
                    <div id = "editbox_post_container">
                        <div id="editbox_post" dangerouslySetInnerHTML={{ __html: this.props.postData.body}}></div>
                    </div>
                    <div id = "editbox_comment_container">
                        <div id="editbox_comment">
                            {!this.state.isNewComment && <SelectedComment selectedComment = {this.state.selectedComment}></SelectedComment>}
                            <NewComment handleSave = {this.handleSaveComment.bind(this)} editor = {this.state.editor? this.state.editor: null}></NewComment>
                        </div>
                    </div>
                    <div className = "clear-float"></div>
                </div>
            </>
        )
    }
}

export default PostComment;