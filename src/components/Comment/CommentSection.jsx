import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";


const CommentSection = ({id}) =>{
    const[comments, setComments] = useState([]); 
    const[error, setError] = useState("");
    const [sucessMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() =>{
        const fetchComments = async () =>{
            try {
                const response = await fetch(`https://recept9-pedal.reky.se/recipes/${id}/comments`);
                if(response.ok){
                    const data = await response.json();
                    setComments(data); 
                }else{
                    setError("Kunde inte visa kommentarer.");
                }
            } catch(error){
                setError("Ett fel inträffade när kommentarerna hämtades.")
            }
        };
        fetchComments();
    }, [id]); 

    const handleSubmitComment = async(newComment) =>{
        if(newComment.name.trim().length < 2 || newComment.comment.trim().length < 2){
            setError("Namnet måste vara minst 2 tecken och kommentaren måste vara minst 5 tecken lång");
            return;
        }
        try{
            const response = await fetch (
                `https://recept9-pedal.reky.se/recipes/${id}/comments` ,
            {
                method: "POST", 
                headers:{
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(newComment),
            }
        );
        if(response.ok){
            const savedComment = await response.json();
            setComments([savedComment,...comments]); 
            setError("");
            setSuccessMessage("Tack för din kommentar!");

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } else{
            setError("Kunde inte spara kommentaren. Försök igen");
            setIsSubmitting(false);
        }
        } catch (error){
            setError("Ett fel inträffade när kommentaren skulle skickas.");
            setIsSubmitting(false);
        }
    };
    return(
        <div>
            <h3>Skriv en kommentar</h3>
            <CommentForm onSubmit={handleSubmitComment} />
            {sucessMessage && <p style={{ color: "green" }}>{sucessMessage}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h3>Kommentarer</h3>
            <CommentList comments={comments} />
        </div>
    )
}
export default CommentSection;