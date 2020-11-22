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
                        <Link to={`/${this.props.post.type}/${this.props.post.id}`}>
                            <div className = "post-title-wrap font-weight-bold pb-3">
                                {this.props.post.title}
                            </div>
                        </Link>
                        <div className = "post-wrap post-summary-body mb-3" dangerouslySetInnerHTML={{ __html: this.props.post.body}}></div>
                        {this.props.post.type == "question"? 
                            <div className="d-flex flex-row">
                                {this.props.post.tags.map(tag=><div key={tag} className="mr-2 post-tag">{tag}</div>)}
                            </div> : <div></div>}
                    </div>
                </div>
                <div className="float-right">
                    {this.props.post.type == "journal"? <div>Views: {this.props.post.count}</div> : <div>Upvotes: {this.props.post.count}</div>}
                </div>
                <div className="clear-float"></div>
                <hr></hr>
            </div>
        )
    }
}

export default PostSummary;