import React from "react";
import './rating.css';
import { useState,useEffect } from "react";


const RatingDisplay = ({ id }) =>{
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 
    const [message, setMessage] = useState(''); 

    const roundToOneDecimal = (num) => Number(num.toFixed(1));

    const fetchRating = async() =>{
        setIsLoading(true); 
        try{
          const response = await fetch(`https://recept9-pedal.reky.se/recipes/${id}`); 
          if(response.ok){
            const data = await response.json(); 
            if(data.avgRating != null){
              setRating(roundToOneDecimal(data.avgRating));
              console.log(rating);
            }
            else{
              setRating(0);
            }
          }
          else{
            setMessage('Kunde inte hämta betyget.')
          }
        } catch(error){
          setMessage('Ett fel inträffade vid hämtning av betyget'); 
        }
        setIsLoading(false);
      }; 
    
      useEffect(() =>{
        fetchRating();
      }, [id]); 

      return (
        <div className='rating'>
          <p>Betyg: {rating}/5</p>
        <div className="star">
          {[1, 2, 3, 4, 5].map((value) => (
            <span 
              key={value}
              style={{
                color: value <= rating ? 'gold' : 'lightgray',
                fontSize: '1.3rem',
              }}
            >
              ★
            </span>
          ))}
        </div>
        </div>
      );

}

export default RatingDisplay;