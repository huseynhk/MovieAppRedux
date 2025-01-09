import { configureStore } from "@reduxjs/toolkit";
import genreSliceReducer from "./slices/genreSlice";
import movieListSliceReducer from "./slices/movieListSlice";
import movieDetailSliceReducers from "./slices/movieDetailSlice";
import favoritesSliceReducers from "./slices/favoritesSlice";
import searchSliceReducers from "./slices/searchSlice";
import videoSliceReducers from "./slices/videoSlice";


export const store = configureStore({
  reducer: {
    genre: genreSliceReducer,
    movieList: movieListSliceReducer,
    movieDetail: movieDetailSliceReducers,
    favorite: favoritesSliceReducers,
    search: searchSliceReducers,
    movieVideos: videoSliceReducers,
  },
});
