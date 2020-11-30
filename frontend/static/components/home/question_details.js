import React from "react";
import Avatar from 'react-avatar';
import {withRouter} from 'react-router-dom';
import { displayErrorMessage } from "../../scripts/display_messages";
import datetimeConversion from "../../scripts/date_conversion";

class QuestionDetails extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            postData : {}
        }
    }
    
    componentDidMount(){
        const postId = this.props.location.pathname.split('/')[2];
        //fetch post details
        fetch(`/questions/${postId}`, {
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
    }

    render(){
        return(
        <div className="center-container">
                <div className = "float-left">
                    <Avatar size="60" src={this.state.postData.avatarUrl} name={this.state.postData.username} round={true}></Avatar>
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
            <div className="font-weight-bold pb-2">
                {this.state.postData.title}
            </div>
            <div className = "post-details-body" dangerouslySetInnerHTML={{ __html: this.state.postData.body}}>
            </div>
        </div>
        )
    }
}

export default withRouter(QuestionDetails);