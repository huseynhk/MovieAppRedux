import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoIosRemoveCircle, IoMdArrowRoundBack } from "react-icons/io";
import { getMovieById } from "../../redux/slices/movieDetailSlice";
import { API_IMG } from "../../constants/api";
import { addToFavorite } from "../../redux/slices/favoritesSlice";
import { removeFromFavorite } from "../../redux/slices/favoritesSlice";
import { getMovieVideos } from "../../redux/slices/videoSlice";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { movieDetail, loading: detailLoading } = useSelector(
    (store) => store.movieDetail
  );
  const { videos, loading: videosLoading } = useSelector(
    (store) => store.movieVideos
  );
  const { title, vote_average, poster_path } = movieDetail;
  const dispatch = useDispatch();
  const { movies } = useSelector((store) => store.favorite);

  useEffect(() => {
    const isFavorite = movies?.find((movie) => movie.id == id);
    if (isFavorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movies]);

  useEffect(() => {
    dispatch(getMovieById(id));
    dispatch(getMovieVideos(id));
  }, [id]);

  const release_year = new Date(movieDetail?.release_date);

  const addFavorite = () => {
    const payload = {
      id,
      title,
      vote_average,
      poster_path,
    };
    dispatch(addToFavorite(payload));
    toast.success("Movie added successfully!", {
      autoClose: 1250,
    });
  };

  const removeFavorite = () => {
    const payload = {
      id,
    };
    dispatch(removeFromFavorite(payload));
    toast.info("Movie removed successfully!", {
      autoClose: 1250,
    });
  };

  return (
    <>
      {detailLoading ? (
        <div className="center">
          <ReactLoading color="#67e8f9" height={"20%"} width={"10%"} />
        </div>
      ) : (
        <div
          className="main-detail"
          style={{
            backgroundImage: `url(${API_IMG}/${movieDetail?.backdrop_path})`,
          }}
        >
          <div className="overlay"></div>
          <div className="movie-detail">
            <div className="content">
              <div className="left">
                <div className="movie-backdrop_path">
                  <img
                    src={`${API_IMG}/${movieDetail?.poster_path}`}
                    alt={movieDetail.title}
                  />
                </div>
                <div className="movie-videos">
                  {videosLoading ? (
                    <ReactLoading color="#67e8f9" height={"10%"} width={"5%"} />
                  ) : videos?.length > 0 ? (
                    <div className="video-list">
                      {(() => {
                        const trailer = videos.find(
                          (video) => video.type === "Trailer"
                        );
                        const videoToShow = trailer || videos[0];
                        return videoToShow ? (
                          <div key={videoToShow.id} className="video-item">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoToShow.key}`}
                              title={videoToShow.name}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <p className="noVideo">No videos available</p>
                        );
                      })()}
                    </div>
                  ) : (
                    <p className="noVideo">No videos available</p>
                  )}
                </div>
              </div>
              <div className="right mt">
                <div className="movie-overview">
                  <p>{movieDetail?.overview}</p>
                </div>
                <div className="movie-title">
                  <span>Movie: </span>
                  <p>{movieDetail?.title}</p>
                </div>

                <div className="movie-rating">
                  <FaStar />
                  <p>{movieDetail?.vote_average?.toFixed(1)}</p>
                </div>
                <div className="release-date">
                  <span>Year: </span>
                  <p>{release_year?.getFullYear()}</p>
                </div>
                <div className="movie-info">
                  <div className="movie-genres">
                    <span>Genre: </span>
                    <ul>
                      {movieDetail.genres &&
                        movieDetail?.genres?.map((genre) => (
                          <li key={genre?.id} className="movie-genre">
                            {genre?.name === "Science Fiction"
                              ? "S.Fiction"
                              : genre?.name}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="movie-languages">
                    <span>Lang: </span>
                    <ul>
                      {movieDetail?.spoken_languages &&
                        movieDetail?.spoken_languages
                          ?.slice(0, 3)
                          .map((language, index) => (
                            <li key={index}>{language?.english_name}</li>
                          ))}
                    </ul>
                  </div>
                  <header>
                    <div className="add-favorite-remove">
                      {isFavorite ? (
                        <button onClick={removeFavorite} className="btn remove">
                          <span className="icon">
                            <IoIosRemoveCircle className="ic" />
                          </span>
                          <span>Remove WatchList</span>
                        </button>
                      ) : (
                        <button onClick={addFavorite} className="btn add">
                          <span className="icon">
                            <FaHeart className="ic"/>
                          </span>
                          <span>Add WatchList</span>
                        </button>
                      )}
                    </div>
                  </header>
                  <div onClick={() => navigate(-1)} className="back">
                    <span className="mtIcon">
                      <IoMdArrowRoundBack size={30} />
                    </span>
                    <span>Go Back</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
