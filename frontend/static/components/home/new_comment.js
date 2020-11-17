import React from "react";
import {displayErrorMessage} from "../../scripts/display_messages";

class NewComment extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            comment: ""
        }
    }

    handleClickSave(){
        //verify the comment is not empty
        if (!this.state.comment){
            displayErrorMessage("comment cannot be empty");
            return;
        }

        this.props.handleSave(this.state.comment);
        this.setState({comment: ""});
    }

    handleClickClear(){
        this.setState({comment: ""});
    }

    handleCommentChange(e){
        this.setState({comment: e.target.value});
    }

    render(){
        return(
            <div id = "newComment" className="form-group round-box" style={{width:"220px"}}>
                <textarea className="form-control mb-2" rows="3" value={this.state.comment} onChange = {this.handleCommentChange.bind(this)}></textarea>
                <button type="button" className="btn btn-sm btn-primary mb-2 float-right" role="button" onClick = {this.handleClickSave.bind(this)}>Save</button>
                <button type="button" className="btn btn-sm btn-secondary mb-2 float-right mr-2" role="button" onClick = {this.handleClickClear.bind(this)}>Clear</button>
                <div className="clear-float"></div>
            </div>
        )
    }
}

export default NewComment;