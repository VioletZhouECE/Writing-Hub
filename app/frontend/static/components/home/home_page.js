import React from "react";
import PostSummary from "./post_summary";

const languages = ["Simplified Chinese", "English", "Japanese"];

class HomePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
           posts: []
        }
    }

    componentDidMount(){
        //load posts
    }

    loadPost(language){
       //load posts
    }

    render(){
        let tabs = [];
        tabs.push(<div className = "tab-float-left"><a href="" onClick = {(e) => this.loadPost(e.target.value)}>Feed</a></div>);
        languages.forEach(element => {
            tabs.push( <div className = "tab-float-left"><a href="" onClick = {(e) => this.loadPost(e.target.value)}>{element}</a></div>);
        });
        tabs.push(<div className = "tab-float-left"><a href="" onClick = {(e) => this.loadPost(e.target.value)}>...</a></div>);

        return(
            <div>
                <div className="tab-bar">
                    {tabs}
                    <div className="clear-float"></div>
                </div>
                <br></br>
                <div className = "center-container">
                    <PostSummary username="VioletZhou" title="Today is a nice day" body="I spent the whole day on my website" viewsCount="0"></PostSummary>
                    <PostSummary username="Xinyi Zhou" title="It is Friday already" body="I am gonna spend the whole weekend on leetcoding + this simple website, yay!" viewsCount="1"></PostSummary>
                </div>
            </div>
        )
    }
}

export default HomePage;