import React from 'react'
import { API_IMG } from '../../constants/api'
import './movieCard.css'
import { FaStar } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const MovieCard = ({ movie }) => {
  const { id, title, vote_average, poster_path } = movie;
  
  const getRatingClass = (vote) => {
    if (vote >= 1 && vote < 6) return 'red';
    if (vote >= 6 && vote < 7) return 'blue';
    if (vote >= 7 && vote < 8) return 'green';
    if (vote >= 8) return 'zinc';
    return '';
  };
  
  return (
    <Link to={`/${id}`}>
      <div className="movie-card">
        <div className='gradient'></div>
        <img src={`${API_IMG}/${poster_path}`} alt={title} />
        <div className="movie-info">
        <div className={`movie-rating ${getRatingClass(vote_average)}`}>
            <p>{vote_average?.toFixed(1)}</p>
            <FaStar />
          </div>
        </div>
      </div> 
    </Link>
  )
}

export default MovieCard