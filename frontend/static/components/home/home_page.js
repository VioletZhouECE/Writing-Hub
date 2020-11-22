import React from "react";
import PostSummary from "./post_summary";
import {displayErrorMessage} from "../../scripts/display_messages";

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.loadedJournals = 0;
        this.lastLoadedJournal = '';
        this.loadedQuestions = 0;
        this.lastLoadedQuestion = '';

        this.state = {
           posts: [],
           totalPosts: 0,
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
            const lastJournalId = this.lastLoadedJournal? this.lastLoadedJournal.id : ""
            const lastQuestionId = this.lastLoadedQuestion? this.lastLoadedQuestion.id : ""
            fetch(`/feeds?languageName=${this.state.language}&lastJournalId=${lastJournalId}&lastQuestionId=${lastQuestionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + this.props.token
                }
            })
            .then(res=> res.json())
            .then(resData=>{
                //get the new posts
                const newPosts = this.getNewPosts(resData.posts);
                if (newPosts.length == 0){resolve()};
                this.setState( prevState => {
                    return {
                        posts: [...prevState.posts, ...newPosts], 
                        totalPosts: resData.totalPosts,
                        isLoading: false,
                        hasMorePost: (prevState.posts.length + newPosts.length) < resData.totalPosts
                        }
                    }, ()=>{
                    resolve();
                });
            })
            .catch(err=>{
                console.log(err);
                displayErrorMessage(err.message);
            })
        })
    }

    //return an array of newPosts (shuffle journals and questions) from the returned posts and update lastLoadedJournal & lastLoadedQuestion
    getNewPosts(posts){
        const newJournalPosts = posts.filter(post => post.type=="journal" && (!this.lastLoadedJournal || new Date(post.createdAt).getTime() > new Date(this.lastLoadedJournal.createdAt).getTime()))
        const newQuestionPosts = posts.filter(post => post.type=="question" && (!this.lastLoadedQuestion || new Date(post.createdAt).getTime() > new Date(this.lastLoadedQuestion.createdAt).getTime()));
        this.lastLoadedJournal = newJournalPosts.length != 0? newJournalPosts[newJournalPosts.length-1] : this.lastLoadedJournal;
        this.lastLoadedQuestion = newQuestionPosts.length != 0? newQuestionPosts[newQuestionPosts.length-1] : this.lastLoadedQuestion;
        const newPosts = [...newJournalPosts, ...newQuestionPosts];
        return newPosts;
    }

    switchLanguage(language){
        //reset to initial state
        this.loadedJournals = 0;
        this.lastLoadedJournal = '';
        this.loadedQuestions = 0;
        this.lastLoadedQuestion = '';
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
                <div className= "tab-bar mt-4">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="javascript:;" onClick = {this.loadFeed}>Feed</a>
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
                    {this.state.posts.map(post => (<PostSummary post = {post}></PostSummary>))}
                    <div ref={loadingRef => (this.loadingRef = loadingRef)}></div>
                    <div className = "text-center" style={{display: this.state.isLoading? "block" : "none"}}> Loading... </div>
                    <div className = "text-center" style={{display: this.state.hasMorePost? "none" : "block"}}> All posts have been loaded</div>
                </div>
            </div>
        )
    }
}

export default HomePage;