import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const CategoryDropDown = ({ categories, selectedCategory }) => {
    const [open, setOpen]= useState(false);
    const close = () => setOpen(false);
    const dropdownRef =useRef(); 
    const {kategori} = useParams();

    useEffect(()=>{
        const handler = (event) =>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setOpen(false);
            }
        }
        document.addEventListener("click", handler);
        return() =>{
            document.removeEventListener("click", handler);
        }
    },[dropdownRef])
    
    const toggleDropdown = () =>{
        setOpen((open) =>!open); 
    }
    return (
      <div className="category-dropdown" ref={dropdownRef}>
        <div 
        className={`dropdown-button ${open ? "button-open" : null}`} 
        onClick={toggleDropdown}
        >
            Välj Kategori
            <span className="toggle-icon">
                {open ? <FaChevronUp/> : <FaChevronDown/>}
            </span>
        </div>


        <div className={`dropdown-content ${open ? "dropdown-content-open": null} `}>
        <p>
            <Link to="/" className={!selectedCategory ? 'active' : ''} onClick={close}>
             Alla Kategorier
             </Link>
        </p>
         {categories.sort().map((category, index) => (
          <p key={index} className='list-item'>
            <Link
              to={`/recept/kategori/${category}`}
              className={kategori === category ? 'active' : ''}
              onClick={close}>
              {category}
            </Link>
          </p>
        ))}

        </div>
      </div>
    );
  };

export default CategoryDropDown;