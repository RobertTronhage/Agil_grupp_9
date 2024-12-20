import React from "react";
import "./rating.css";
import { useState, useEffect } from "react";

/**
 * RatingDisplay component fetches and displays the average rating of a recipe.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.id - The ID of the recipe to fetch the rating for
 * @returns {JSX.Element} The rendered component
 *
 * @example
 * <RatingDisplay id="12345" />
 *
 * @description
 * This component fetches the average rating of a recipe from an API and displays it as both a numeric value and a series of star icons. The rating is rounded to one decimal place. If the rating cannot be fetched, an error message is displayed.
 */
const RatingDisplay = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const roundToOneDecimal = (num) => Number(num.toFixed(1));

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

  return (
    <div className="rating">
      <p>Betyg: {rating}/5</p>
      <div className="star">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            style={{
              color: value <= rating ? "gold" : "lightgray",
              fontSize: "1.3rem",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingDisplay;
