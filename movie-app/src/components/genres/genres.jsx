import React, { useEffect, useState } from "react";
import { getGenres } from "../../redux/slices/genreSlice";
import { useDispatch, useSelector } from "react-redux";
import "./genres.css";

const Genres = ({ setSelectedGenre }) => {
  const dispatch = useDispatch();
  const { genres } = useSelector((store) => store.genre);
  
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const [activeGenre, setActiveGenre] = useState(null);

  const handleGenre = (genre) => {
    setSelectedGenre(genre);
    setActiveGenre(genre.id);
  };

  const handleReset = () => {
    setSelectedGenre(null);
    setActiveGenre(null);
    dispatch(getGenres());
  };

  return (
    <div className="genres">
      <ul>
        <li className="reset" onClick={handleReset}>
          Discover
        </li>

        {genres?.map((genre, index) => (
          <li
            className={`genre ${genre.id === activeGenre ? "active" : ""}`}
            onClick={() => handleGenre(genre)}
            key={genre.id + index}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
