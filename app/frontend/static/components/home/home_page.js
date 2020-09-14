import React from "react";
import PostSummary from "./post_summary";
import {displayErrorMessage} from "../../scripts/display_messages";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
           posts: [],
           totalPosts: 0,
           page: 0
        }

        this.loadFeed = this.loadFeed.bind(this);
        this.loadPost = this.loadPost.bind(this);
    }

    componentDidMount(){
        //load feed
        //placeholder
        this.loadPost(this.props.learnLanguage);
        //for version I, this will load posts randomly in both languages
    }

    loadFeed(){}

    loadPost(language){
        console.log(this.state.page);
        fetch(`/journals/all/language?languageName=${language}&page=${this.state.page + 1}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + this.props.token
            }
        })
        .then(res=> res.json())
        .then(resData=>{
            this.setState( prevState => {
                return {
                posts: [...prevState.posts, ...resData.posts], 
                totalPosts: resData.totalPosts,
                page: prevState.page + 1
            }});
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
                    <div className = "tab-float-left" key={this.props.learnLanguage}><a href="javascript:;" onClick = {(e) => this.loadPost(this.props.learnLanguage)}>{this.props.learnLanguage}</a></div>
                    <div className = "tab-float-left" key={this.props.firstLanguage}><a href="javascript:;" onClick = {(e) => this.loadPost(this.props.firstLanguage)}>{this.props.firstLanguage}</a></div>
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