import React, { useEffect, useState } from "react";
import "./rating.css";

/**
 * Rating component fetches and displays the average rating for a recipe and allows users to submit their own ratings.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.id - The ID of the recipe to fetch and submit ratings for
 *
 * @example
 * // Usage example
 * <Rating id="12345" />
 *
 * @returns {JSX.Element} The rendered Rating component
 */
const Rating = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false); 
  const [showStars, setShowStars] = useState(true);
  const [attemptedToRate, setAttemptedToRate] = useState(false);

  const roundToOneDecimal = (num) => Number(num.toFixed(1));

  // hämta betyg från API
  const fetchRating = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://recept9-pedal.reky.se/recipes/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.avgRating != null) {
          setRating(roundToOneDecimal(data.avgRating));
        } else {
          setRating(0);
        }

        // Kontrollera om användaren redan har skickat in en rating för detta recept
        const submittedRatings = JSON.parse(sessionStorage.getItem("submittedRatings")) || {};
        setHasSubmitted(!!submittedRatings[id]); // Om receptets ID finns, har användaren redan skickat in

      } else {
        setMessage("Kunde inte hämta betyget.");
      }
    } catch (error) {
      setMessage("Ett fel inträffade vid hämtning av betyget");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRating();
  }, [id]);

  const handleRatingChange = async (newRating) => {
    if (hasSubmitted) {
      setAttemptedToRate(true);
      setTimeout(() => {
        setAttemptedToRate(false); 
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://recept9-pedal.reky.se/recipes/${id}/ratings`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ rating: newRating }),
        }
      );

      if (response.ok) {
        setMessage("Tack för ditt betyg!");
        setShowStars(false);
        setTimeout(() => {
          setMessage(""); // Ta bort meddelandet efter 3 sekunder
        }, 3000);
        fetchRating();
        setHasSubmitted(true);

        
        const submittedRatings = JSON.parse(sessionStorage.getItem("submittedRatings")) || {};
        submittedRatings[id] = true;
        sessionStorage.setItem("submittedRatings", JSON.stringify(submittedRatings));


      } else {
        const errorData = await response.json();
        setMessage(`Ett fel inträffade: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Ett fel inträffade vid inskickning.");
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <p>Laddar betyg...</p>;
  }
  return (
    <div className="rating">
      <p>Betyg: {rating}/5</p>
      {message && !showStars ? (
        <p>{message}</p>
      ) : (
        <div className="star">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              onClick={() => handleRatingChange(value)}
              style={{
                color: value <= rating ? "gold" : "lightgray",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "1.3rem",
                pointerEvents: isSubmitting ? "none" : "auto", //inactivate if a rating has been set during a session or is submitting 
              }}
            >
              ★
            </span>
          ))}
        </div>
      )}
         {attemptedToRate && hasSubmitted && !message && (
        <p>Du har redan skickat in ditt betyg för detta recept.</p>
      )}
    </div>
  );
};

export default Rating;