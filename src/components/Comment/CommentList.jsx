import React from "react";
import "./comment.css";
import { FaRegCircleUser } from "react-icons/fa6";

/**
 * CommentList component renders a list of comments in reverse order.
 *
 * @param {Object[]} comments - Array of comment objects.
 * @param {string} comments[].name - Name of the commenter.
 * @param {string} comments[].comment - Text of the comment.
 * @param {string} comments[].createdAt - Date when the comment was created.
 *
 * @returns {JSX.Element} A JSX element containing the list of comments.
 */
function CommentList({ comments }) {

  // Kontrollera att comments är en array, eller använd en tom array som standardvärde
  const reverseComments = Array.isArray(comments) ? [...comments].reverse() : [];
  const commentListItem = reverseComments.map((reverseComments, index) => {
    const date = new Date(reverseComments.createdAt);
    const formattedDate = date.toLocaleDateString();

    return (
      <div className="comment" key={index}>
        <div className="avatar">
          <span role="img" aria-label="avatar">
            <FaRegCircleUser />
          </span>
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
}

export default CommentList;
