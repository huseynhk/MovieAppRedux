import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_KEY, API_MOVIE_LIST_URL } from '../../constants/api'

const initialState = {
    movieList: []
}

export const getMovieList = createAsyncThunk('movies', async () => {
    const res = await axios.get(`${API_MOVIE_LIST_URL}?api_key=${API_KEY}`)
    return res.data.results;
})

export const getMovieListByGenre = createAsyncThunk('moviesByGenre', async (id) => {
    const res = await axios.get(`${API_MOVIE_LIST_URL}?api_key=${API_KEY}&with_genres=${id}`)
    return res.data.results;
})

export const movieListSlice = createSlice({
    name: "movieList",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {  
        builder.addCase(getMovieList.fulfilled, (state, action) => {
            state.movieList = action.payload;
        })
        builder.addCase(getMovieListByGenre.fulfilled, (state, action) => {
            state.movieList = action.payload;
        })
    }
})

export const {} = movieListSlice.actions;  
export default movieListSlice.reducer;  