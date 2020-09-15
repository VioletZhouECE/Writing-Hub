import React from "react";
import {withRouter} from 'react-router-dom';
import { displayErrorMessage } from "../../scripts/display_messages";
import {tiny_editor} from "../../../config/api_keys";

class PostDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            postData : {}
        }

        this.initAnotation = this.initAnotation.bind(this);
    }

    
    componentDidMount(){
        const postId = this.props.location.pathname.split('/')[2];
        //fetch post details
        fetch(`/journals/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            }
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
            this.setState({postData:resData});
        })
        .catch(err=>{
            displayErrorMessage(err.message)
        })

        //update ViewCount
        fetch(`/journals/${postId}/updateViewsCount`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            }
        })

        this.initAnotation();
    }

    initAnotation(){ 
        //annotation settings        
        const settings = {
            apiKey : {tiny_editor},
            selector: 'textarea#annotations',
            toolbar: ['annotate-alpha'],
            menubar: false,
            height: '750px',
            content_style: '.mce-annotation { background-color: darkgreen; color: white; } ' + 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        
            setup: function (editor) {
            editor.ui.registry.addButton('annotate-alpha', {
                text: 'Annotate',
                onAction: function() {
                var comment = prompt('Comment with?');
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
        tinymce.init(settings);
}


    render(){
        return(
        <div className="center-container">
            <div className = "d-flex flex-row">
                <div className = "p-0 col-sm-3 col-md-3 col-lg-2">
                    Profile
                </div>
                <div className="pl-2 col-sm-9 col-md-9 col-lg-10">
                    <div>
                        {this.state.postData.username}. Learning {this.state.postData.learnLanguage}
                    </div>
                    <div>
                        Written on {this.state.postData.createdAt}
                    </div>
                </div>
            </div>
            <br></br>
            <div className="font-weight-bold">
                {this.state.postData.title}
            </div>
            <br></br>
            <div className = "post-details-body" dangerouslySetInnerHTML={{ __html: this.state.postData.body}}>
            </div>
            <br></br>
            <div className = "post-details-comment" dangerouslySetInnerHTML={{ __html: this.state.postData.comment}}>
            </div>
            <br></br>
            <textarea id="annotations"></textarea>
        </div>
        )
    }
}

export default withRouter(PostDetails);