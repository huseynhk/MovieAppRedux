import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, API_MOVIE_FIND_URL } from "../../constants/api";

const initialState = {
  movieDetail: [],
  loading: false,
};

export const getMovieById = createAsyncThunk("getMovieById", async (id) => {
  const res = await axios.get(`${API_MOVIE_FIND_URL}/${id}?api_key=${API_KEY}`);
  return res.data;
});

export const movieDetailSlice = createSlice({
    name: "movieDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getMovieById.pending, (state) => {
        state.loading = true;
      });
  
      builder.addCase(getMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload;
      });
  
      builder.addCase(getMovieById.rejected, (state) => {
        state.loading = false;
        state.movieDetail = [];
      });
    },
  });
  

export const {} = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
