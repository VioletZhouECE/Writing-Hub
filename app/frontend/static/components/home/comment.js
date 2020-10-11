import React from "react";

class Comment extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <div className="form-control displayed-comment-box">
                    <span className="float-left mr-2"><i className="fas fa-user-circle fa-2x"></i></span>
                    <div className="float-left mb-2">
                        <div className="comment-username">{this.props.commentInfo.author}</div>
                        <div className="comment-time">{this.props.commentInfo.time}</div>
                    </div>
                    <div className="clear-float"></div>
                    <div>{this.props.commentInfo.content}</div>
                </div>
            </div>
        )
    }
}

export default Comment;