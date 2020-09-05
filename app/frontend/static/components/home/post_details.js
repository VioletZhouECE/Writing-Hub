import React from "react";
import {withRouter} from 'react-router-dom';
import { displayErrorMessage } from "../../scripts/display_messages";

class PostDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            postData : {}
        }
    }

    
    componentDidMount(){
        const postId = this.props.location.pathname.split('/')[2];
        //fetch post details
        fetch(`/journals/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            }
        })
        .then(res => {
            if (res.status === 200){
                return res.json();
            } else {
                return res.json().then((err) => {
                    throw new Error(err.message);
                })}
        })
        .then(resData =>{
            this.setState({postData:resData});
        })
        .catch(err=>{
            displayErrorMessage(err.message)
        })

        //update ViewCount
        fetch(`/journals/${postId}/updateViewsCount`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            }
        })
    }

    render(){
        return(
        <div className="center-container">
            <div className = "d-flex flex-row">
                <div className = "p-0 col-sm-3 col-md-3 col-lg-2">
                    Profile
                </div>
                <div className="pl-2 col-sm-9 col-md-9 col-lg-10">
                    <div>
                        {this.state.postData.username}. Learning {this.state.postData.language}
                    </div>
                    <div>
                        Written on {this.state.postData.createdAt}
                    </div>
                </div>
            </div>
            <div className="pt-3 font-weight-bold">
                {this.state.postData.title}
            </div>
            <div className = "pt-2 post-details-body" dangerouslySetInnerHTML={{ __html: this.state.postData.body}}>
            </div>
            <div className = "pt-3 post-details-comment" dangerouslySetInnerHTML={{ __html: this.state.postData.comment}}>
            </div>
        </div>
        )
    }
}

export default withRouter(PostDetails);