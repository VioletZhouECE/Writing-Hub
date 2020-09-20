import React from "react";

class SelectedComment extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="form-group">
                <div className="form-control displayed-comment-box">
                    <span className="float-left mr-2"><i className="fas fa-user-circle fa-2x"></i></span>
                    <div className="float-left mb-2">
                        <div className="comment-username">{this.props.selectedComment.author}</div>
                        <div className="comment-time">{this.props.selectedComment.time}</div>
                    </div>
                    <div className="clear-float"></div>
                    <div>{this.props.selectedComment.comment}</div>
                </div>
            </div>
        )
    }
}

export default SelectedComment;