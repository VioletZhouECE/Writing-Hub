import React from "react";
import Avatar from 'react-avatar';
import {UserContext} from "../context/user_context";
import AvatarEdit from "./avatar_edit";
import {displaySuccessMessage, displayErrorMessage} from "../../scripts/display_messages";

class Profile extends React.Component {
    static contextType = UserContext;

    constructor(props){
        super(props);
        this.UserInfo = UserInfo;
        this.state = {
            editAvatar : false
        }
    }

    handleClickProfile(){
        this.setState({editAvatar: true});
    }

    onAcceptAvatar(img){
        //img is base64 string
        //send the new avatar to the backend
        fetch(`/profile/avatar`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            },
            body: JSON.stringify({image: img})
        })
        .then((res)=>{
            if (res.status === 200){
                return res.json();
            } else {
                throw new Error("Upload image failed, please try again");
            }
        })
        .then((resData) =>{
            //update frontend image
            this.setState({editAvatar: false});
            //update avatarUrl in userContext and localStorage
            this.context.setUserContext({avatarUrl: resData.url});
            localStorage.setItem('avatarUrl', resData.url);
            displaySuccessMessage(resData.msg);
        })
        .catch(err=>{
            displayErrorMessage(err.message)
        })
    }

    onCancelAvatar(){
        this.setState({editAvatar: false});
    }

    render(){
        return (
            <div>
                <div className="avatar-container" role="button">
                    <Avatar className= "profile-avatar" src={this.context.userContext.avatarUrl} name={this.UserInfo.username} round={true} onClick={this.handleClickProfile.bind(this)}></Avatar>
                    <i className="fas fa-edit profile-edit"></i>
                </div>
                {this.state.editAvatar?<AvatarEdit userAvatar={this.context.userContext.avatarUrl} onAcceptAvatar={this.onAcceptAvatar.bind(this)} onCancelAvatar={this.onCancelAvatar.bind(this)}></AvatarEdit>:<div></div>}
            </div>
        )
    }
}

export default Profile;