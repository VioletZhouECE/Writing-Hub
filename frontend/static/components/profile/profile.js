import React from "react";
import Avatar from 'react-avatar';
import AvatarEdit from "./avatar_edit";
import {displaySuccessMessage, displayErrorMessage} from "../../scripts/display_messages";

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.UserInfo = UserInfo;
        this.state = {
            editAvatar : false,
            avatar: UserInfo.avatarUrl
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
            this.setState({editAvatar: false, avatar: resData.url});
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
                <Avatar src={this.state.avatar} name={this.UserInfo.username} round={true} onClick={this.handleClickProfile.bind(this)}></Avatar>
                {this.state.editAvatar?<AvatarEdit userAvatar={this.state.avatar} onAcceptAvatar={this.onAcceptAvatar.bind(this)} onCancelAvatar={this.onCancelAvatar.bind(this)}></AvatarEdit>:<div></div>}
            </div>
        )
    }
}

export default Profile;