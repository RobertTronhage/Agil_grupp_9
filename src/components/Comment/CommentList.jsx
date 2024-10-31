import React from "react";
import './comment.css'
import { FaUser } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";

function CommentList({ comments }){
    const reverseComments = [...comments].reverse();
    const commentListItem = reverseComments.map((reverseComments, index) => {
        const date = new Date(reverseComments.createdAt); 
        const formattedDate = date.toLocaleDateString();

        return(        
            <div className="comment" key={index}>
            <div className="avatar">
                <span role="img" aria-label="avatar"><FaRegCircleUser /></span>
            </div>
            <div className="comment-content">
                <h4 className="comment-name">{reverseComments.name}</h4>
                <p className="comment-text">{reverseComments.comment}</p>
            </div>
            <div className="comment-date">{formattedDate}</div>
        <div className="line"></div>
        </div> 
        );
}); 
    return <div>{commentListItem}</div>;
}; 

export default CommentList;