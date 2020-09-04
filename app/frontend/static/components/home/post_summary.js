import React from "react";

class PostSummary extends React.Component{
    render(){
        return (
            <div className = "post-summary-container">
                <div className = "d-flex justify-content-between">
                    <div className = "p-0 col-sm-3 col-md-3 col-lg-2">
                        {this.props.username}
                    </div>
                    <div className = "p-0 col-sm-9 col-md-9 col-lg-10 d-flex flex-column">
                        <div>
                            {this.props.title}
                        </div>
                        <div>
                            {this.props.body}
                        </div>
                    </div>
                </div>
                <div className="float-right">
                    Views: {this.props.viewsCount} 
                </div>
            </div>
        )
    }
}

export default PostSummary;