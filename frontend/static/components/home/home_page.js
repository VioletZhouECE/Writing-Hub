import React from "react";
import PostSummary from "./post_summary";
import {displayErrorMessage} from "../../scripts/display_messages";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.loadedPostsEager = 0;

        this.state = {
           posts: [],
           totalPosts: 0,
           loadedPosts: 0,
           //feed = all posts written in learnLanguage
           language: UserInfo.learnLanguage,
           isLoading: false,
           hasMorePost: true
        }

        this.loadFeed = this.loadFeed.bind(this);
        this.loadPost = this.loadPost.bind(this);
        this.switchLanguage = this.switchLanguage.bind(this);
        this.setUpIntersectionObserver = this.setUpIntersectionObserver.bind(this);
    }

    componentDidMount(){
        //for simplification, feed = all posts written in learnLanguage
        this.loadPost()
        .then(()=>{
            this.setUpIntersectionObserver();})
    }

    setUpIntersectionObserver(){
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
        this.switchLanguage(UserInfo.learnLanguage);
    }

    loadPost(){
        return new Promise ((resolve, reject)=> {
            this.setState({isLoading: true, hasMorePost: true});
            const lastPostId = this.loadedPostsEager!=0? this.state.posts[this.loadedPostsEager-1].id : "";
            this.loadedPostsEager += 5; 
            fetch(`/journals/all/language?languageName=${this.state.language}&lastPostId=${lastPostId}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + this.props.token
                }
            })
            .then(res=> res.json())
            .then(resData=>{
                this.setState( prevState => {
                    const postsToAppend = Math.min(resData.totalPosts-prevState.loadedPosts, 5);
                    return {
                    posts: [...prevState.posts, ...(resData.posts.slice(resData.posts.length-postsToAppend, resData.posts.length))], 
                    totalPosts: resData.totalPosts,
                    loadedPosts: prevState.loadedPosts + postsToAppend,
                    isLoading: false,
                    hasMorePost: (prevState.loadedPosts + postsToAppend) < resData.totalPosts
                }}, ()=>{
                    this.loadedPostsEager = this.state.loadedPosts; 
                    resolve();
                });
            })
            .catch(err=>{
                displayErrorMessage(err.message);
            })
        })
    }

    switchLanguage(language){
        this.loadedPostsEager = 0;
        this.setState({
            posts : [],
            totalPosts : 0,
            loadedPosts: 0,
            page : 0,
            language : language
        }, this.loadPost);
    }

    // <div className = "tab-float-left"><a href="#" onClick = {(e) => this.loadFeed(e.target.value)}>Feed</a></div>
    // <div className = "tab-float-left" key={this.props.learnLanguage}><a href="javascript:;" onClick = {(e) => this.switchLanguage(this.props.learnLanguage)}>{this.props.learnLanguage}</a></div>
    // <div className = "tab-float-left" key={this.props.firstLanguage}><a href="javascript:;" onClick = {(e) => this.switchLanguage(this.props.firstLanguage)}>{this.props.firstLanguage}</a></div>
    // <div className = "tab-float-left"><a href="#">...</a></div>
    // <div className="clear-float"></div>

    render(){
        return(
            <div>
                <div className= "tab-bar mt-4">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="javascript:;" onClick = {(e) => this.loadFeed(e.target.value)}>Feed</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:;" key={UserInfo.learnLanguage} onClick = {(e) => this.switchLanguage(UserInfo.learnLanguage)}>{UserInfo.learnLanguage}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:;" key={UserInfo.firstLanguage} onClick = {(e) => this.switchLanguage(UserInfo.firstLanguage)}>{UserInfo.firstLanguage}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:;">...</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className = "center-container mt-3">
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