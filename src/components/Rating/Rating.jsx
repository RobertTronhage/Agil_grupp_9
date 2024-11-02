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
        fetchRating();
      } else {
        const errorData = await response.json();
        setMessage(`Ett fel inträffade: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Ett fel inträffade vid inskickning.");
    }
    setIsSubmitting(false);
    // Rensa meddelande efter några sekunder
    setTimeout(() => setMessage(""), 3000);
  };

  if (isLoading) {
    return <p>Laddar betyg...</p>;
  }
  return (
    <div className="rating">
      <p>Betyg: {rating}/5</p>
      <div className="star">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value)}
            style={{
              color: value <= rating ? "gold" : "lightgray",
              cursor: "pointer",
              fontSize: "1.3rem",
              pointerEvents: isSubmitting ? "none" : "auto", //inaktivera om betyget skickas
            }}
          >
            ★
          </span>
        ))}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Rating;
