import React from "react";
import PostSummary from "./post_summary";
import {displayErrorMessage} from "../../scripts/display_messages";

const languages = ["Simplified Chinese", "English", "Japanese"];

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
           posts: []
        }

        this.loadFeed = this.loadFeed.bind(this);
        this.loadPost = this.loadPost.bind(this);
    }

    componentDidMount(){
        //load feed
    }

    loadFeed(){}

    loadPost(language){
        fetch(`/journals/all/language/${language}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            }
        })
        .then(res=>{
            if (res.status === 204){
                //to-do: render no post page
                return Promise.resolve();
            } else if (res.status === 200) {
                return res.json();
            } else {
                return res.json().then((err) => {
                    throw new Error("Server error: " + err.message);
                });
            }
        })
        .then(resData=>{
            this.setState({posts: resData.posts});
        })
        .catch(err=>{
            displayErrorMessage(err.message);
        })
    }

    render(){
        return(
            <div>
                <div className="tab-bar">
                    <div className = "tab-float-left"><a href="#" onClick = {(e) => this.loadFeed(e.target.value)}>Feed</a></div>
                    {languages.map(language=>(<div className = "tab-float-left" key={language}><a href="javascript:;" onClick = {(e) => this.loadPost(language)}>{language}</a></div>))}
                    <div className = "tab-float-left"><a href="#">...</a></div>
                    <div className="clear-float"></div>
                </div>
                <br></br>
                <div className = "center-container">
                    {this.state.posts.map(post => (<PostSummary id={post.id} key={post.id} username={post.username} title={post.title} body={post.body} viewsCount={post.viewsCount}></PostSummary>))}
                </div>
            </div>
        )
    }
}

export default HomePage;