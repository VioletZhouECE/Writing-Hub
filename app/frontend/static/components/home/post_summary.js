import React from "react";

class PostSummary extends React.Component{
    render(){
        return (
            <div className = "post-summary-container">
                <div className = "d-flex justify-content-between">
                    <div className = "p-0 col-sm-3 col-md-3 col-lg-2">
                        {this.props.username}
                    </div>
                    <div className = "pl-2 col-sm-9 col-md-9 col-lg-10 d-flex flex-column">
                        <div className = "post-wrap font-weight-bold pb-3">
                            {this.props.title}
                        </div>
                        <div className = "post-wrap" dangerouslySetInnerHTML={{ __html: this.props.body}}>
                        </div>
                    </div>
                </div>
                <div className="float-right">
                    Views: {this.props.viewsCount} 
                </div>
                <div className="clear-float"></div>
                <hr></hr>
            </div>
        )
    }
}

export default PostSummary;