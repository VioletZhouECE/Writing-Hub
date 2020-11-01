import React from "react";

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.currentCommentBox = React.createRef();

        this.state = {
            isEditing: false,
            comment: this.props.commentInfo.content
        }
    }

    //enter editing mode
    handleClickEdit(){
        this.setState({isEditing:true});
        this.currentCommentBox.current.style.height = "165px";
    }

    //exit editing mode
    handleSaveCancel(){
        this.setState({
            isEditing: false,
            comment: this.props.commentInfo.content
        });
        this.currentCommentBox.current.style.height = "86px"
    }

    handleCommentChange(e){
        this.setState({comment: e.target.value});
    }

    render(){
        return (
            <div className="form-group position-relative">
                <div className="form-control displayed-comment-box" ref={this.currentCommentBox}>
                    <span className="float-left mr-2"><i className="fas fa-user-circle fa-2x"></i></span>
                    <div className="float-left mb-2">
                        <div className="comment-username float-left">{this.props.commentInfo.author}</div>
                        <div className="float-right">
                            <i className="fas fa-ellipsis-h" href="#" role="button" data-toggle="dropdown"></i>
                                <div className="dropdown-menu dropdown-menu-left">
                                    <a href="#" className="dropdown-item" onClick={this.handleClickEdit.bind(this)}>Edit</a>
                                    <a href="#" className="dropdown-item">Delete</a>
                                </div> 
                        </div>
                        <div className="clear-float"></div>
                        <div id={this.props.commentId} className="comment-time">{this.props.commentInfo.time}</div>
                    </div>
                    <div className="clear-float"></div>
                    {this.state.isEditing? <textarea className="form-control mb-2" rows="2" value={this.state.comment} onChange = {this.handleCommentChange.bind(this)}></textarea> : <div>{this.props.commentInfo.content}</div>}
                    <div style={{display: this.state.isEditing? "block": "none"}}>
                        <div className = "mt-2">
                            <button type="button" className="btn btn-sm btn-primary mb-1 float-right" role="button">Save</button>
                            <button type="button" className="btn btn-sm btn-secondary mb-1 float-right mr-2" role="button" onClick={this.handleSaveCancel.bind(this)}>Cancel</button>
                        </div>
                    </div>
                    <div className="clear-float"></div>
                </div>
            </div>
        )
    }
}

export default Comment;