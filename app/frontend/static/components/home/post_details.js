import React from "react";
import {withRouter} from 'react-router-dom';
import { displayErrorMessage } from "../../scripts/display_messages";
import PostComment from "./post_comment";
import datetimeConversion from "../../scripts/date_conversion";

class PostDetails extends React.Component {
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
                <div className = "post-details-user-profile float-left">
                    <i className="fas fa-user-circle fa-3x"></i>
                </div>
                <div className="float-left pl-4">
                    <div className = "post-details-username float-left">
                        {this.state.postData.username}
                    </div>
                    <div className="post-details-language float-left pl-2"> 
                        <span>&#183;</span> Learning {this.state.postData.learnLanguage}
                    </div>
                    <div className= "clear-float"></div>
                    <div className="post-details-time">
                        Written on {this.state.postData.createdAt? datetimeConversion(this.state.postData.createdAt) : null}
                    </div>
                </div>
                <div className="clear-float"></div>
            <br></br>
            <div className="font-weight-bold">
                {this.state.postData.title}
            </div>
            <br></br>
            <div className = "post-details-body" dangerouslySetInnerHTML={{ __html: this.state.postData.body}}>
            </div>
            <br></br>
            <div className = "post-details-comment" dangerouslySetInnerHTML={{ __html: this.state.postData.comment}}>
            </div>
            <br></br>
            <PostComment postData = {this.state.postData} userInfo = {this.props.userInfo}></PostComment>
        </div>
        )
    }
}

export default withRouter(PostDetails);