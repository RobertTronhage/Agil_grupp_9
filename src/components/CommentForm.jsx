import React, { useEffect, useState } from "react";

const CommentForm = ({id}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  

  // Funktion för att hantera inskickning av formuläret
  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindra sidomladdning

    // Skapa ny kommentar 
    const newComment = {
      name: name,
      comment: comment
    };
    console.log(newComment)

    // Lägg till ny kommentar till listan av kommentarer
    setComments([newComment, ...comments]);

    // Töm formuläret efter inskickning
    setName("");
    setComment("");

    try {
        // Skicka POST-förfrågan till API
        const response = await fetch(`https://recept9-pedal.reky.se/recipes/${id}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        });
  
        if (response.ok) {
          const savedComment = await response.json();
          // Uppdatera kommentarslistan med den nya kommentaren från API
          setComments([savedComment, ...comments]);
        } else {
          console.error("Error saving comment:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
  };

  return (
    <div>
      <h2>Lämna en kommentar</h2>

      {/* Formulär för att skriva in namn och kommentar */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="comment">Kommentar:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Skicka kommentar</button>
      </form>
    </div>
  );
};

export default CommentForm;