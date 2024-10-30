import React, { useState } from "react";
import './comment.css';


const CommentForm = ({onSubmit}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setName(""); 
    setComment("");
    setIsSubmitting(true); //inputfält ändrar färg (vit) när det disables
  
    await onSubmit({ name, comment }); // Skicka in kommentaren till CommentSection via props
    setName("");   // Töm input-fältet
    setComment(""); // Töm input-fältet
    setIsSubmitting(false); // Återaktivera input-fälten

       
  }; 
  
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Namn:</label>
        <input type="text" 
        id="name" value={name} 
        onChange={(e) => setName(e.target.value)} 
        disabled={isSubmitting}
        required 
      />
      </div>

      <div>
        <label htmlFor="comment">Kommentar:</label>
        <textarea
        id="comment"
        value={comment}
        onChange={(e)=> setComment(e.target.value)}
        disabled={isSubmitting}
        required
        ></textarea>
      </div>
      <button id="submit-button" type="submit"
      disabled={isSubmitting}
      >Skicka kommentar</button>
    </form>
  );
};

export default CommentForm;