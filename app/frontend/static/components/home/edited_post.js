import React from "react";

class EditedPost extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <>
            <div>{this.props.editedPost && this.props.editedPost.body}</div>
        </>
        )
    }
}

export default EditedPost;