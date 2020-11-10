import React from "react";
import ReactDOM from "react-dom";
import NewComment from "./new_comment";
import Comment from "./comment";
import moment from "moment";
import uniqid from "uniqid";
import {displaySuccessMessage, displayErrorMessage} from "../../scripts/display_messages";

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

            //wrap document in one node: <div>...</div> 
            const documentNode = this.stringToDomNode(`<div> ${this.props.editedPost.body}</div>`);
            const annotationNodes = documentNode.querySelectorAll(`span[class=mce-annotation]`);
            
            const annotations = [];
            for (const node of annotationNodes){
                const annotation = this.extractComments(node);
                annotations.push(annotation);
            }

            this.setState({comments : annotations});
        }
    }

    //helper function to convert a string to a dom node
    //if there are multiple nodes, only return the first one
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
            content_style: '.mce-annotation { background-color: #ffe0b3} ' + 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
                
                editor.on('click', function(e) {
                    if(e.target.id == "marker"  || e.target.className=="mce-annotation"){
                        return;
                    } else {
                        self.removeNewComment();
                        self.setState({hasNewComment : false});
                    }
                })


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
        const commentYPos = document.getElementById( `${uid}`).getBoundingClientRect().top-40;
        const commentboxYPos = document.getElementById("editbox_comment_container").getBoundingClientRect().top;
        const relativecommentPos = commentYPos - commentboxYPos; 
        const difference = relativecommentPos - mouseYPos;
        $("#editbox_comment").animate({
            bottom: difference>=0?`+=${Math.abs(difference)}px` : `-=${Math.abs(difference)}px`
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
        
        const selectionNode = this.stringToDomNode("<mark id=\"marker\" style=\"background-color:#ffa64d\">" + tinymce.activeEditor.selection.getContent() + "</mark>")
        tinymce.activeEditor.selection.setNode(selectionNode);
        const domSelectionNode = tinymce.activeEditor.dom.select("#marker")[0];
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
            }, ()=>{
                this.moveToSelectedComment("newComment");
            })
        } else {
            this.setState(prevState=>{
                return {comments: [{isNewComment: true}, ...prevState.comments]};
            }, ()=>{
                this.moveToSelectedComment("newComment");
            })
        }
    }

    removeNewComment(){
        if(this.state.hasNewComment){
            this.setState(prevState=>{
                return {comments: prevState.comments.filter((comment)=>comment.isNewComment==false)}
            });
            tinymce.activeEditor.dom.setOuterHTML('marker', tinymce.activeEditor.dom.select("#marker")[0].innerHTML);
        }
    }

    //to-do: error handling when SaveComment failed
    handleSaveComment(comment){
        //create tinymce selection
        tinymce.activeEditor.selection.select(tinymce.activeEditor.dom.select("#marker")[0]);

        const annotationFields = {
            uid:  uniqid(),
            comment: comment,
            author: UserInfo.username,
            time: moment().format('MMM Do YYYY, h:mm:ss a')
        };

        //apply annotation
        tinymce.activeEditor.annotator.annotate('alpha', annotationFields);

        //remove marker wrapper
        tinymce.activeEditor.dom.setOuterHTML('marker', tinymce.activeEditor.dom.select("#marker")[0].innerHTML);

        //update comment list
        this.setState(prevState=>{
            return {
                hasNewComment : false,
                comments: prevState.comments.map(comment=>{
                    if (comment.isNewComment){
                        return {
                            uid: annotationFields.uid,
                            author: annotationFields.author,
                            time: annotationFields.time,
                            content: annotationFields.comment,
                            isNewComment: false
                        }
                    } else {
                        return comment;
                    }
                })
            }
        });

        //save the edited-journal to the backend
        this.handleSubmit();
    }

    handleEditComment(comment, commentId){
        const commentNode = tinymce.activeEditor.dom.select(`span[data-mce-annotation-uid=${commentId}]`)[0];
        commentNode.setAttribute("data-mce-comment", comment);
        this.handleSubmit();
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
                                    return <Comment commentId={comment.uid} key={comment.uid} commentInfo = {comment} handleEditComment = {this.handleEditComment.bind(this)}></Comment>;
                                } else {
                                    //new comment
                                    return (<NewComment handleSave={this.handleSaveComment.bind(this)} editor={this.state.editor}></NewComment>)
                                }
                            })}
                        </div>
                    </div>
                    <div className = "clear-float"></div>
                </div>
            </>
        )
    }
}

export default PostComment;