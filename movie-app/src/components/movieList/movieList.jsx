import React, { useEffect, useState } from "react";
import MovieCard from "../movieCard/movieCard";
import "../movieList/movieList.css";
import ReactPaginate from "react-paginate";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieListByGenre,
  getMovieList,
} from "../../redux/slices/movieListSlice";
import { searchMovies } from "../../redux/slices/searchSlice";
import ReactLoading from "react-loading";

const excludedGenres = [0, 10749];

const MovieList = ({ selectedGenre }) => {
  const { movieList } = useSelector((store) => store.movieList);
  const { searchResults, loading } = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;

  // const filteredMovies = searchQuery
  //   ? searchResults
  //   : movieList.filter(
  //       (movie) =>
  //         !movie.genre_ids.some((genreId) => excludedGenres.includes(genreId))
  //     );
  const filteredMovies = searchQuery ? searchResults : movieList;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredMovies.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredMovies.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredMovies.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setItemOffset(0);
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  useEffect(() => {
    setItemOffset(0);
    if (!selectedGenre && !searchQuery) {
      dispatch(getMovieList());
    } else if (selectedGenre) {
      dispatch(getMovieListByGenre(selectedGenre.id));
    }
  }, [selectedGenre, dispatch, searchQuery]);

  return (
    <div className="movie-list">
      <div className="centerDiv mb">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="mt"
        />
      </div>

      <div className="centerDiv mb">
        <h1>{`${selectedGenre ? selectedGenre.name : "Discover"}`}</h1>
      </div>

      <div className="centerDiv">
        {loading && (
          <ReactLoading color="#67e8f9" height={"20%"} width={"10%"} />
        )}
        {!loading && searchQuery && currentItems.length === 0 && (
          <h1 className="mt" style={{ color: "#fecaca" }}>
            No movies found.
          </h1>
        )}
      </div>
      <ul>
        {currentItems.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      <div className="pagination-component">
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel={<GrNext />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<GrPrevious />}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default MovieList;
