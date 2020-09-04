import React from "react";

const languages = ["Simplified Chinese", "English", "Japanese"];

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let tabs = [];
        tabs.push(<div className = "tab-float-left"><a href="">Feed</a></div>);
        languages.forEach(element => {
            tabs.push( <div className = "tab-float-left"><a href="">{element}</a></div>);
        });
        tabs.push(<div className = "tab-float-left"><a href="">...</a></div>);

        return(
            <div className = "center-container">
                {tabs}
            </div>
        )
    }
}

export default HomePage;