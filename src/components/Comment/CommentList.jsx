import React from "react";

function CommentList({ comments }){
    const reverseComments = [...comments].reverse();
    const commentListItem = reverseComments.map((reverseComments, index) => {
        const date = new Date(reverseComments.createdAt); 
        const formattedDate = date.toLocaleDateString();

        return(        
        <div key={index}>
            <h4>  
                {formattedDate}  skrev: {reverseComments.name} 
            </h4>
            <p>{reverseComments.comment}</p>
        </div> 
        );
}); 
    return <ul>{commentListItem}</ul>;
}; 

export default CommentList;