import React from "react";
import ReactDOM from "react-dom";
import NewComment from "./new_comment";
import Comment from "./comment";
import moment from "moment";
import uniqid from "uniqid";
import {displaySuccessMessage, displayErrorMessage} from "../../scripts/display_messages";
import {UserContext} from "../context/user_context";

class PostComment extends React.Component{
    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {
            comments : [],
            hasNewComment: false,
            selectedComment: null,
            //editor instance
            editor: null
        }
    }

    componentDidMount(){
        this.initAnotation();
    }

    componentDidUpdate(prevProps, prevState){
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
            avatarUrl: node.getAttribute('data-mce-avatarUrl')? node.getAttribute('data-mce-avatarUrl'): '',
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
                        if(!tinymce.activeEditor.selection.getContent()){
                            displayErrorMessage("Please select text before applying annotation");
                            return;
                        }
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
                            'data-mce-avatarUrl': data.avatarUrl ? data.avatarUrl : '',
                            'data-mce-time': data.time ? data.time  : ''
                            }
                        };
                    }
                    });
                
                editor.on('click', function(e) {
                    //remove selected comment
                    if (e.target.id != self.state.selectedComment && e.target.className !="mce-annotation"){
                        self.removeSelectedComment();
                    } 

                    //remove new comment
                    if(e.target.id !="marker" && e.target.className !="mce-annotation"){
                        self.removeNewComment();
                    }
                })


                editor.annotator.annotationChanged('alpha', function (state, name, obj) {
                    if (state){
                        self.removeNewComment();
                        const annotationData = obj.nodes[0].dataset;
                        self.removeSelectedComment();
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

    removeSelectedComment(){
        if (this.state.selectedComment){
            $(`#commentbox-${this.state.selectedComment}`).animate({
                right: "-=15px"
            }, 300, () => {
                // Animation complete 
            });
        }
        this.setState({selectedComment: null});
    }

    moveToSelectedComment(uid){
        const mouseYPos = tinymce.activeEditor.selection.getNode().getBoundingClientRect().top;
        const commentYPos = document.getElementById( `${uid}`).getBoundingClientRect().top-40;
        const commentboxYPos = document.getElementById("editbox_comment_container").getBoundingClientRect().top;
        const relativecommentPos = commentYPos - commentboxYPos; 
        const difference = relativecommentPos - mouseYPos;

        document.getElementById("editbox_comment_container").scrollBy({
            top: difference,
            behavior: 'smooth'
          });

        $(`#commentbox-${uid}`).animate({
            right: "+=15px"
        }, 300, () => {
            // Animation complete 
        });

        this.setState({selectedComment: uid});
    }

    appendNewComment(){
        //assuming that getContent is not empty
        //assuming that users don't add annotation to existing annotations

        if(this.state.hasNewComment){
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
            this.setState({hasNewComment : false});
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
            avatarUrl: this.context.userContext.avatarUrl,
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
                            avatarUrl: annotationFields.avatarUrl,
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
        fetch(`/api/editedJournals/${this.props.postId}`, {
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
                    <div id="editbox_comment_container">
                        <div id="editbox_comment" className="position-relative">
                            {this.state.comments.map(comment=>{
                                if(!comment.isNewComment){
                                    return <Comment commentId={comment.uid} key={comment.uid} commentInfo = {comment} commentAvatarUrl = {comment.avatarUrl} commentAuthor = {comment.author} handleEditComment = {this.handleEditComment.bind(this)}></Comment>;
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