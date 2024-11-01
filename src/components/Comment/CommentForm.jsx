import React, { useState } from "react";
import "./comment.css";

/**
 * CommentForm component allows users to submit their name and comment.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onSubmit - The function to call when the form is submitted.
 *
 * @example
 * <CommentForm onSubmit={handleCommentSubmit} />
 *
 * @returns {JSX.Element} The rendered CommentForm component.
 */
const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName("");
    setComment("");
    setIsSubmitting(true); //inputfält ändrar färg (vit) när det disables

    await onSubmit({ name, comment }); // Skicka in kommentaren till CommentSection via props
    setName(""); // Töm input-fältet
    setComment(""); // Töm input-fältet
    setIsSubmitting(false); // Återaktivera input-fälten
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="name-input">
        <input
          type="text"
          placeholder="Namn"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="comment-input">
        <textarea
          placeholder="Skriv din kommentar"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
          required
        ></textarea>
      </div>
      <button id="submit-button" type="submit" disabled={isSubmitting}>
        Skicka kommentar
      </button>
    </form>
  );
};

export default CommentForm;
