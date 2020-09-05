import React from "react";
import PostSummary from "./post_summary";

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
        //load posts
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
        .then(res=>res.json())
        .then(resData=>{
            this.setState({posts: resData.posts});
        })
        .catch(err=>{
            console.log(err.message);
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
                    {this.state.posts.map(post => (<PostSummary key={post.id} username={post.username} title={post.title} body={post.body} viewsCount={post.viewsCount}></PostSummary>))}
                </div>
            </div>
        )
    }
}

export default HomePage;