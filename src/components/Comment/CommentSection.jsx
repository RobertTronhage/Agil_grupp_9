import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import "./comment.css";

/**
 * CommentSection component fetches and displays comments for a specific recipe.
 * It also allows users to submit new comments.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the recipe for which comments are fetched.
 *
 * @returns {JSX.Element} The rendered CommentSection component.
 */
const CommentSection = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");


const CommentSection = ({id}) =>{
    const[comments, setComments] = useState([]); 
    const[error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() =>{
        const fetchComments = async () =>{
            try {
                const response = await fetch(`https://recept9-pedal.reky.se/recipes/${id}/comments`);
                if(response.ok){
                    const data = await response.json();
                    setComments(data); 
                }else{
                    setError("Kunde inte visa kommentarer.");
                }
            } catch(error){
                setError("Ett fel inträffade när kommentarerna hämtades.")
            }
        };
        fetchComments();
    }, [id]); 

    const handleSubmitComment = async(newComment) =>{
        if(newComment.name.trim().length < 2 || newComment.comment.trim().length < 2){
            setError("Namnet måste vara minst 2 tecken och kommentaren måste vara minst 5 tecken lång");
            return;
        }
        try{
            const response = await fetch (
                `https://recept9-pedal.reky.se/recipes/${id}/comments` ,
            {
                method: "POST", 
                headers:{
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(newComment),
            }
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          setError("Kunde inte visa kommentarer.");
        }
      } catch (error) {
        setError("Ett fel inträffade när kommentarerna hämtades.");
      }
    };

    return(
        <div className="comment-section">
        <h3>Skriv en kommentar</h3>
        <CommentForm onSubmit={handleSubmitComment} />

        {/* Success Message */}
        {successMessage && (
            <div className="success-message">
                <p>{successMessage}</p>
            </div>
        )}

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        <div className="comment-list">
            <h3>Kommentarer</h3>
            <CommentList comments={comments} />
        </div>
    </div>
    )
}
export default CommentSection;
