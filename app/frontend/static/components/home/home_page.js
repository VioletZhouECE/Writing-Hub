import React from "react";
import PostSummary from "./post_summary";
import {displayErrorMessage} from "../../scripts/display_messages";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
           posts: [],
           totalPosts: 0,
           page: 0,
           //feed = all posts written in learnLanguage
           language: this.props.learnLanguage,
           isLoading: false,
           hasMorePost: true
        }

        this.loadFeed = this.loadFeed.bind(this);
        this.loadPost = this.loadPost.bind(this);
        this.switchLanguage = this.switchLanguage.bind(this);
    }

    componentDidMount(){
        //for simplification, feed = all posts written in learnLanguage
        this.loadPost();

        //infinite scroll implemented with IntersectionObserver
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };

        let observer = new IntersectionObserver(
            this.loadPost,
            options
        );
        
        observer.observe(this.loadingRef);
    }

    loadFeed(){
        //for simplification, feed = all posts written in learnLanguage
        this.switchLanguage(this.props.learnLanguage);
    }

    loadPost(){
        this.setState({isLoading: true, hasMorePost: true});
        fetch(`/journals/all/language?languageName=${this.state.language}&page=${this.state.page + 1}`, {
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
                page: prevState.page + 1,
                isLoading: false,
                hasMorePost: (prevState.page + 1)*5 < resData.totalPosts
            }});
        })
        .catch(err=>{
            displayErrorMessage(err.message);
        })
    }

    switchLanguage(language){
        this.setState({
            posts : [],
            totalPosts : 0,
            page : 0,
            language : language
        }, this.loadPost);
    }

    render(){
        return(
            <div>
                <div className="tab-bar">
                    <div className = "tab-float-left"><a href="#" onClick = {(e) => this.loadFeed(e.target.value)}>Feed</a></div>
                    <div className = "tab-float-left" key={this.props.learnLanguage}><a href="javascript:;" onClick = {(e) => this.switchLanguage(this.props.learnLanguage)}>{this.props.learnLanguage}</a></div>
                    <div className = "tab-float-left" key={this.props.firstLanguage}><a href="javascript:;" onClick = {(e) => this.switchLanguage(this.props.firstLanguage)}>{this.props.firstLanguage}</a></div>
                    <div className = "tab-float-left"><a href="#">...</a></div>
                    <div className="clear-float"></div>
                </div>
                <br></br>
                <div className = "center-container">
                    {this.state.posts.map(post => (<PostSummary id={post.id} key={post.id} username={post.username} title={post.title} body={post.body} viewsCount={post.viewsCount}></PostSummary>))}
                    <div ref={loadingRef => (this.loadingRef = loadingRef)}></div>
                    <div className = "text-center" style={{display: this.state.isLoading? "block" : "none"}}> Loading... </div>
                    <div className = "text-center" style={{display: this.state.hasMorePost? "none" : "block"}}> All posts have been loaded</div>
                </div>
            </div>
        )
    }
}

export default HomePage;