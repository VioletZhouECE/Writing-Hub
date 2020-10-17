import React from "react";
import ReactDOM from "react-dom";
import NewComment from "./new_comment";
import Comment from "./comment";
import moment from "moment";
import uniqid from "uniqid";
import {displaySuccessMessage, displayErrorMessage} from "../../scripts/display_messages";

// {!this.state.isNewComment && <SelectedComment selectedComment = {this.state.selectedComment}></SelectedComment>}
//                             <NewComment handleSave = {this.handleSaveComment.bind(this)} editor = {this.state.editor? this.state.editor: null}></NewComment>
// {this.state.comments.map(comment=><Comment commentInfo = {comment}></Comment>)}
const comments = [
    "<span class=\"mce-annotation\" data-mce-annotation-uid=\"mce-annotation_36583796121602364743988\" data-mce-annotation=\"alpha\" data-mce-comment=\"development\" data-mce-author=\"Violet18\" data-mce-time=\"Oct 11th 2020, 5:19:03 am\">developing</span>",
    "<span class=\"mce-annotation\" data-mce-annotation-uid=\"kg46lhdv\" data-mce-annotation=\"alpha\" data-mce-comment=\"another one?\" data-mce-author=\"Violet18\" data-mce-time=\"Oct 11th 2020, 5:19:11 am\">journal</span>",
    "<span class=\"mce-annotation\" data-mce-annotation-uid=\"kg46lnbl\" data-mce-annotation=\"alpha\" data-mce-comment=\"Here we go again!\" data-mce-author=\"Violet18\" data-mce-time=\"Oct 11th 2020, 5:19:22 am\">Go</span>"
]

class PostComment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments : [],
            //editor instance
            editor: null
        }
    }

    componentDidMount(){
        this.initAnotation();
    }

    componentDidUpdate(prevProps, prevState){
        //issue: cannot access any attribute of tinymce.activeEditor after page refresh even though attributes are all present
        if (this.props.editedPost.body !== prevProps.editedPost.body && this.props.editedPost.body) {
            //set content when the page is loaded the first time
            tinymce.activeEditor.setContent(this.props.editedPost.body);
            //set content upon page refresh
            if (!tinymce.get("editbox_post").getContent({ format: 'raw' })){
                $("#editbox_post").html(this.props.editedPost.body);
            }

        //     //init this.state.comments 
        //     if (tinymce.activeEditor.annotator){
        //         const annotationNodes = tinymce.activeEditor.annotator.getAll("alpha");
                
        //         //take the outerHTML
        //         const annotations = [];
        //         for (const node in annotationNodes){
        //             annotation = this.extractComments(annotationNodes[node][0].outerHTML);
        //             console.log(annotation);
        //             annotations.push(annotation);
        //         }

        //         this.setState({comments : annotations});
        //     } else {
        //         //doesn't work after refreshing the page
        //     }
        //   }

        const annotations = [];
        for (const comment of comments){
            const annotation = this.extractComments(this.stringToDomNode(comment));
            annotations.push(annotation);
        }

        this.setState({comments : annotations});
        }
    }

    //helper function to convert a string to a dom node
    stringToDomNode(string){
        let wrapper= document.createElement('div');
        wrapper.innerHTML= string;
        return wrapper.firstChild;    
    }

    //return an object that contains comment components
    extractComments(node){
        return {
            uid : node.getAttribute("data-mce-annotation-uid"),
            author: node.getAttribute("data-mce-author"),
            time: node.getAttribute("data-mce-time"),
            content: node.getAttribute("data-mce-comment"),
            isNewComment: false
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

                editor.ui.registry.addButton('annotate-alpha', {
                    text: 'Annotate',
                    onAction: () => {
                      self.appendNewComment();
                      self.setState({hasNewComment: true});
                    }
                  });

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
                            self.removeNewComment();
                            self.setState({hasNewComment : false});
                            const annotationData = obj.nodes[0].dataset;
                            self.moveToSelectedComment(annotationData.mceAnnotationUid);
                        } else {
                        }
                    });
                });
            }
        };

        //init annotations
        tinymce.init(postSettings);
    }

    moveToSelectedComment(uid){
        const mouseYPos = tinymce.activeEditor.selection.getNode().getBoundingClientRect().top;
        const commentYPos = document.getElementById( `${uid}`).getBoundingClientRect().top;
        const commentboxYPos = document.getElementById("editbox_comment_container").getBoundingClientRect().top;
        const relativecommentPos = commentYPos - commentboxYPos; 
        const difference = relativecommentPos - mouseYPos;
        $("#editbox_comment").animate({
            bottom: difference>=0?`+=${Math.abs(difference)-2}px` : `-=${Math.abs(difference)+2}px`
          }, 300, () => {
            // Animation complete
          });
    }

    appendNewComment(){
        //assuming that getContent is not empty
        //assuming that users don't add annotation to existing annotations

        if(this.state.hasNewComment){
            return;
        }

        if(!this.state.editor.selection.getContent()){
            console.log("No selected text");
            return;
        }
        
        const selectionNode = this.stringToDomNode("<mark class=\"marker\">" + tinymce.activeEditor.selection.getContent() + "</mark>")
        tinymce.activeEditor.selection.setNode(selectionNode);
        const domSelectionNode = tinymce.activeEditor.dom.select(".marker")[0];
        let curr = domSelectionNode;
        let prevUid;

        while (curr.previousSibling) {
            if (!curr.previousSibling.outerHTML) {
                curr = curr.previousSibling;
                continue;
            }
            const nodeOuterHTML = curr.previousSibling.outerHTML;
            const node = this.stringToDomNode(nodeOuterHTML);
            let uid = node.getAttribute("data-mce-annotation-uid");
            if (uid){
                prevUid = uid;
                break;
            }
            curr = curr.previousSibling;
        }

        console.log(prevUid);

        if (prevUid){
            this.setState(prevState=>{
                let newComments = [];
                prevState.comments.forEach(comment=>{
                    newComments.push(comment);
                    if (comment.uid == prevUid){
                        newComments.push({isNewComment: true});
                    }
                });
                return {comments: newComments}; 
            })
        } else {
            this.setState(prevState=>{
                return {comments: [{isNewComment: true}, ...prevState.comments]};
            })
        }

        tinymce.activeEditor.selection.setNode(selectionNode);
    }

    getClosestAnnotationId(){
        
    }

    removeNewComment(){
        if(this.state.hasNewComment){
            this.setState(prevState=>{
                return {comments: prevState.comments.filter((comment)=>comment.isNewComment==false)}
            })
        }
    }

    handleSaveComment(comment){
        //apply annotation
        this.state.editor.annotator.annotate('alpha', {
            uid:  uniqid(),
            comment: comment,
            author: this.props.userInfo.username,
            time: moment().format('MMM Do YYYY, h:mm:ss a')
        });
    }

    handleSubmit(){
        //store editedJournal to the db
        fetch(`/editedJournals/${this.props.postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                journalId: this.props.postId,
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
                    <div className = "position-relative" id="editbox_comment_container">
                        <div id="editbox_comment" className="position-relative">
                            {this.state.comments.map(comment=>{
                                if(!comment.isNewComment){
                                    return <Comment commentId={comment.uid} key={comment.uid} commentInfo = {comment}></Comment>;
                                } else {
                                    //new comment
                                    return (<NewComment handleSave={this.handleSaveComment.bind(this)} editor={this.state.editor}></NewComment>)
                                }
                            })}
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