import React, { useState } from "react";

const CommentForm = ({onSubmit}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    onSubmit({name, comment}); 
    setName(""); 
    setComment("");
  }; 
  
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Namn:</label>
        <input type="text" 
        id="name" value={name} 
        onChange={(e) => setName(e.target.value)} 
        required />
      </div>

      <div>
        <label htmlFor="comment">Kommentar:</label>
        <textarea
        id="comment"
        value={comment}
        onChange={(e)=> setComment(e.target.value)}
        required
        ></textarea>
      </div>
      <button type="submit">Skicka kommentar</button>
    </form>
  );
};

export default CommentForm;