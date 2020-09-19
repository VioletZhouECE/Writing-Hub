import React from "react";

class NewComment extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            comment: ""
        }
    }

    handleClickSave(){
        this.props.handleSave(this.state.comment);
    }

    handleClickClear(){
        this.setState({comment: ""});
    }

    handleCommentChange(e){
        this.setState({comment: e.target.value});
    }

    render(){
        return(
            <div class="form-group round-box">
                <textarea class="form-control mb-2" rows="3" value={this.state.comment} onChange = {this.handleCommentChange.bind(this)}></textarea>
                <button type="button" class="btn btn-primary mb-2 float-right" role="button" onClick = {this.handleClickSave.bind(this)}>Save</button>
                <button type="button" class="btn btn-secondary mb-2 mr-2 float-right" role="button" onClick = {this.handleClickClear.bind(this)}>Clear</button>
            </div>
        )
    }
}

export default NewComment;