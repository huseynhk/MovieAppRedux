import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, API_MOVIE_SEARCH_URL } from "../../constants/api";
import axios from "axios";


const initialState = {
  searchResults: [],
  loading: false,
  error: null,
};

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_MOVIE_SEARCH_URL}?api_key=${API_KEY}&query=${query}`
      );
      return response.data.results; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error.";
      });
  },
});

export default searchSlice.reducer;
