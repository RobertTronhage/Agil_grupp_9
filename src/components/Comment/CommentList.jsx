import React from "react";

function CommentList({ comments }){
    const commentListItem = comments.map((comments, index) => {
        const date = new Date(comments.createdAt); 
        const formattedDate = date.toLocaleDateString();

        return(        
        <div key={index}>
            <h4>  
                {formattedDate}  skrev: {comments.name} 
            </h4>
            <p>{comments.comment}</p>
        </div> 
        );
}); 
    return <ul>{commentListItem}</ul>;
}; 

export default CommentList;