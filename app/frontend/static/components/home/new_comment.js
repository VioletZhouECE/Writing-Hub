import React from "react";

class NewComment extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div class="form-group round-box">
                <textarea class="form-control mb-2" rows="3"></textarea>
                <button type="button" class="btn btn-primary mb-2 float-right" role="button">Save</button>
                <button type="button" class="btn btn-secondary mb-2 mr-2 float-right" role="button">Clear</button>
            </div>
        )
    }
}

export default NewComment;