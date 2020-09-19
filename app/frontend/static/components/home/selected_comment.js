import React from "react";

class SelectedComment extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div class="form-group round-box">
                <div>{this.props.selectedComment.author}</div>
                <hr></hr>
                <textarea class="form-control mb-2" rows="3" value={this.props.selectedComment.comment}></textarea>
            </div>
        )
    }
}

export default SelectedComment;