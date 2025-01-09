import React, { lazy, useState } from "react";
import Genres from "../../components/genres/genres";
// import MovieList from '../../components/movieList/movieList'
const MovieList = lazy(() => import("../../components/movieList/movieList"));
import Hero from "../../components/hero/Hero";
import { Suspense } from "react";
import ReactLoading from "react-loading";
import "./Home.css";

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div className="Home">
        <Hero />

      <Suspense
        fallback={<ReactLoading color="#67e8f9" height={"30%"} width={"20%"} />}
      >
        <div className="bottom-area">
          <MovieList selectedGenre={selectedGenre} />
          <Genres
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
