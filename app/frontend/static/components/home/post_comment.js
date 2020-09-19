import React from "react";
import NewComment from "./new_comment";

class PostComment extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isNewComment: false,
            selectedText: ""
        }
    }

    componentDidMount(){
        this.initAnotation();
    }

    initAnotation(){ 
        //annotation settings        
        const postSettings = {
            selector: '#editbox_post',
            toolbar: ['annotate-alpha'],
            menubar: false,
            height: '300px',
            content_style: '.mce-annotation { background-color: darkgreen; color: white; } ' + 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        
            setup: function (editor) {
            editor.ui.registry.addButton('annotate-alpha', {
                text: 'Comment',
                onAction: function() {
                editor.annotator.annotate('alpha', {
                    uid: 'custom-generated-id',
                    comment: comment
                });
                editor.focus();
                },
                onSetup: function (btnApi) {
                editor.annotator.annotationChanged('alpha', function (state, name, obj) {
                    console.log('Current selection has an annotation: ', state);
                    btnApi.setDisabled(state);
                });
                }
            });
        
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
            });
            }
        };

        //init annotations
        tinymce.init(postSettings);
}

    render(){
        return(
            <>
                <div className="pb-2">Edit the journal:</div>
                <div id = "editbox_post_container">
                    <div id="editbox_post" dangerouslySetInnerHTML={{ __html: this.props.postData.body}}></div>
                </div>
                <div id = "editbox_comment_container">
                    <div id="editbox_comment">
                        <NewComment></NewComment>
                    </div>
                </div>
                <div className = "clear-float"></div>
            </>
        )
    }
}

export default PostComment;