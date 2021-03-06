import React from "react";
import CommentEdit from "./comment_edit";
import Avatar from 'react-avatar';

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.currentCommentBox = React.createRef();
        this.UserInfo = UserInfo;

        this.state = {
            isEditing: false,
            comment: this.props.commentInfo.content
        }
    }

    handleClickEdit(){
        this.setState({isEditing:true});
        this.currentCommentBox.current.style.height = "165px";
    }

    handleSaveCancel(){
        this.setState({
            isEditing: false
        });
        this.currentCommentBox.current.style.height = "86px";
    }

    handleSaveComment(newComment){
        this.setState({
            isEditing: false,
            comment: newComment
        });

        //actually save the comment 
        this.props.handleEditComment(newComment, this.props.commentId);

        this.currentCommentBox.current.style.height = "86px";
    }

    handleCommentChange(e){
        this.setState({comment: e.target.value});
    }

    render(){
        return (
            <div className="form-group position-relative">
                <div id={`commentbox-${this.props.commentId}`}className="form-control displayed-comment-box position-relative" ref={this.currentCommentBox}>
                    <span className="float-left mr-2">
                        <Avatar size="40" src={this.props.commentAvatarUrl} name={this.props.commentAuthor} round={true}></Avatar>
                    </span>
                    <div className ="float-left mb-1">
                        <div className="float-left comment-username">
                            {this.props.commentInfo.author}
                        </div>
                        {this.UserInfo.username == this.props.commentInfo.author && 
                            <div className = "editmenu">
                                <div className="float-right">
                                    <i className="fas fa-ellipsis-h" href="#" role="button" data-toggle="dropdown"></i>
                                        <div className="dropdown-menu dropdown-menu-left">
                                            <a href="#" className="dropdown-item" onClick={this.handleClickEdit.bind(this)}>Edit</a>
                                            <a href="#" className="dropdown-item">Delete</a>
                                        </div> 
                                </div>
                            </div>}
                        <div className="clear-float"></div>
                        <div id={this.props.commentId} className="comment-time">{this.props.commentInfo.time}</div>
                    </div>
                    <div className="clear-float"></div>
                        {this.state.isEditing? <CommentEdit comment = {this.state.comment} handleSaveComment={this.handleSaveComment.bind(this)} handleSaveCancel={this.handleSaveCancel.bind(this)}></CommentEdit> : <div className="comment-text">{this.state.comment}</div>}
                    <div className="clear-float"></div>
                </div>
            </div>
        )
    }
}

export default Comment;