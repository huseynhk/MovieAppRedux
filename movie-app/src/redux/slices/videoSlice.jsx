import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, API_KEY } from "../../constants/api";
import axios from "axios";

export const getMovieVideos = createAsyncThunk(
  "movieVideos/getMovieVideos",
  async (movieId) => {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    return response.data.results;
  }
);

const movieVideosSlice = createSlice({
  name: "movieVideos",
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovieVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getMovieVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieVideosSlice.reducer;
