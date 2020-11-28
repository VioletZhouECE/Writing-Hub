import React from "react";
import Avatar from 'react-avatar';
import AvatarEdit from "./avatar_edit";

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editAvatar : false
        }
    }

    handleClickProfile(){
        this.setState({editAvatar: true});
    }

    onAcceptAvatar(){
        this.setState({editAvatar: false});
    }

    onCancelAvatar(){
        this.setState({editAvatar: false});
    }

    render(){
        return (
            <div>
                <Avatar name="Violet Zhou" round={true} onClick={this.handleClickProfile.bind(this)}></Avatar>
                {this.state.editAvatar?<AvatarEdit onAcceptAvatar={this.onAcceptAvatar.bind(this)} onCancelAvatar={this.onCancelAvatar.bind(this)}></AvatarEdit>:<div></div>}
            </div>
        )
    }
}

export default Profile;