import React from "react";

class Search extends React.Component{
    constructor(props){
        super(props);
        this.searchString = window.location.search.split("?q=")[1];

        this.lastLoadedJournal = '';

        this.state = {
            posts: [],
            totalPosts: 0,
            isLoading: false,
            hasMorePost: true
         }
    }

    render(){
        return(
            <div>
                Search String: {this.searchString}
            </div>
        )
    }
}

export default Search;