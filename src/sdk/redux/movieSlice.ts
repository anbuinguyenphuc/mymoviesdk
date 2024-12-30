import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../http-helper";
import {
  IMAGE_ORIGINAL_URL,
  SEARCH_MOVIE_URL,
  TRENDING_MOVIE_URL,
} from "../ApiDomain";
import { IMovie } from "../type";

// Async thunk to fetch posts
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ searchQuery }: { searchQuery: string }, thunkAPI) => {
    try {
      const url = searchQuery
        ? `${TRENDING_MOVIE_URL}${searchQuery}`
        : `${SEARCH_MOVIE_URL}`;
      const json = await get({ url });
      //console.log("anbnp test:",JSON.stringify(json));
      return json.results.map((i: any) => {
        return {
          ...i,
          uri: i.backdrop_path ? IMAGE_ORIGINAL_URL + i.backdrop_path : null,
        };
      }); // Automatically becomes `payload` in `fulfilled` case
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // For `rejected` case
    }
  }
);

const initialState: { loading: boolean; movies: IMovie[]; error: any } = {
  loading: false,
  movies: [],
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    // (Optional) Add reducers for other synchronous actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
