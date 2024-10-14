import React, { useState } from 'react';

const Rating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  // Hantera klick på stjärnorna
  const handleRating = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value); // Om en callback skickas in, anropa den
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleRating(value)}
          style={{
            color: value <= rating ? 'gold' : 'lightgray',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
