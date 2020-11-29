import React from "react";
import Avatar from 'react-avatar';
import AvatarEdit from "./avatar_edit";
import {displaySuccessMessage, displayErrorMessage} from "../../scripts/display_messages";

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.UserInfo = UserInfo;
        const src = '/static/image/carousel-sunshine.jpg';
        this.state = {
            editAvatar : false,
            avatar: src
        }
    }

    handleClickProfile(){
        this.setState({editAvatar: true});
    }

    onAcceptAvatar(img){
        //create formData
        const formData = new FormData();
        formData.append("image", img);

        //send the new avatar to the backend
        fetch(`/profile/avatar/${UserInfo.userId}`, {
            method: 'POST',
            headers: {'Authorization' : 'Bearer ' + this.props.token},
            body: formData
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
            this.setState({editAvatar: false, avatar: img});
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