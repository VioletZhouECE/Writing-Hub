import React from "react";
import {withRouter} from 'react-router-dom';

class PostDetails extends React.Component{
    constructor(props){
        super(props);
    }

    
    componentDidMount(){
        const postId = this.props.location.pathname.split('/')[2];
        fetch(`/journals/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            }
        })
        .then(res => res.json())
        .then(resData =>{
            console.log("resData is: " + resData.body);
        })
        .catch(err=>{
            console.log(err.message);
        })
    }

    render(){
        return(
        <div>Post details</div>
        )
    }
}

export default withRouter(PostDetails);