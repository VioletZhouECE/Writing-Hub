import React from "react";
import {Link} from "react-router-dom";

class PostSummary extends React.Component{
    render(){
        return (
            <div className = "pt-2">
                <div className = "d-flex justify-content-between">
                    <div className = "p-0 col-sm-2 col-md-2 col-lg-2">
                        <i className="fas fa-user-circle fa-3x"></i>
                    </div>
                    <div className = "pl-2 col-sm-10 col-md-10 col-lg-10 d-flex flex-column">
                        <Link to={`/journal/${this.props.id}`}>
                            <div className = "post-title-wrap font-weight-bold pb-3">
                                {this.props.title}
                            </div>
                        </Link>
                        <div className = "post-wrap post-summary-body mb-3" dangerouslySetInnerHTML={{ __html: this.props.body}}>
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