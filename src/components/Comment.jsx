import React from "react";
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";

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

function Comments(){
    const { id } = useParams(); // Hämta ID från URL
    console.log("Recipe ID from URL:", id); // Logga ID:t för att kontrollera
    const[comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchComments = async () => {
            try{
                const response = await fetch(`https://recept9-pedal.reky.se/recipes/${id}/comments`)
                if(!response.ok){
                    console.log(response); 
                    throw new Error('Något gick fel vid hämntingen av kommentarer.')
                }
                const data = await response.json();
                setComments(data);
            }
            catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }; 
        if(id){
            fetchComments();
        }
    },[id]); 

    if (loading) {
        return <p>Laddar...</p>;
      }
    
      if (error) {
        return <p>Fel: {error}</p>;
      }
    
      if (!comments) {
        return <p>kommentaren hittades inte.</p>;
      }

    return (
        <div className="comments">
            <h3>Kommentar</h3>
            <CommentList comments = {comments} />
        </div>
    )
}

export default Comments;