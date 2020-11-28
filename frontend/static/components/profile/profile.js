import React from "react";
import Avatar from 'react-avatar';
import AvatarEdit from "./avatar_edit";

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
        //save imageCroped in the frontend
        this.setState({editAvatar: false, avatar: img});
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