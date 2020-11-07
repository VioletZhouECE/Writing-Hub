import React from 'react'

class CommentEdit extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            comment: this.props.comment
        }
    }

    handleCommentChange(e){
        this.setState({comment: e.target.value});
    }

    render(){
        return (
            <>
                <textarea className="form-control mb-2" rows="2" value={this.state.comment} 
                onChange = {this.handleCommentChange.bind(this)}></textarea>
                <div className = "mt-2">
                    <button type="button" className="btn btn-sm btn-primary mb-1 float-right" role="button" onClick={() => this.props.handleSaveComment(this.state.comment)}>Save</button>
                    <button type="button" className="btn btn-sm btn-secondary mb-1 float-right mr-2" role="button" onClick={this.props.handleSaveCancel}>Cancel</button>
                </div>
            </>
        )
    }
}

export default CommentEdit
