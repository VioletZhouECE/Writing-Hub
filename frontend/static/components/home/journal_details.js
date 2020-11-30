import React from "react";
import Avatar from 'react-avatar';
import {withRouter} from 'react-router-dom';
import { displayErrorMessage } from "../../scripts/display_messages";
import PostComment from "./post_comment";
import datetimeConversion from "../../scripts/date_conversion";

class JournalDetails extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editedPost : null,
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

        //fetch editedJournal
        fetch(`/editedJournals/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            }
        })
        .then(res => {
            if (res.status === 200){
                return res.json();
            } else if (res.status == 204){
                return;
            } else {
                return res.json().then((err) => {
                    throw new Error(err.message);
                })}
        })
        .then(resData =>{
            if(resData){
                this.setState({editedPost:resData.editedJournal});
            } else {
                //do nothing
            }
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
            <br></br>
            <div className = "post-details-comment" dangerouslySetInnerHTML={{ __html: this.state.postData.comment}}>
            </div>
            <br></br>
            <PostComment editedPost={this.state.editedPost?this.state.editedPost:this.state.postData} token={this.props.token} postId={this.props.location.pathname.split('/')[2]}></PostComment>
        </div>
        )
    }
}

export default withRouter(JournalDetails);