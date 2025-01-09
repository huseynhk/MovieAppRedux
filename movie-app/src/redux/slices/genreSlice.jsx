import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, API_GENRE_URL } from "../../constants/api";
import axios from "axios";

const initialState = {
  genres: [],
};

export const getGenres = createAsyncThunk("genres", async () => {
  const res = await axios.get(`${API_GENRE_URL}?api_key=${API_KEY}`);
  return res.data.genres;
});

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
  },
});

export const {} = genreSlice.actions;
export default genreSlice.reducer;
