import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../http-helper";
import {
  GET_MOVIE_DETAIL_URL,
  GET_MOVIE_KEYWORDS,
  GET_MOVIE_REVIEWS_URL,
  IMAGE_ORIGINAL_URL,
  SEARCH_MOVIE_URL,
  TRENDING_MOVIE_URL,
} from "../ApiDomain";
import { IMovie, IMovieDetail, Keyword, Review } from "../type";

// Async thunk to fetch posts
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (
    { searchQuery, page = 1 }: { searchQuery: string; page: number },
    thunkAPI
  ) => {
    try {
      const url = searchQuery
        ? SEARCH_MOVIE_URL(searchQuery, page)
        : `${TRENDING_MOVIE_URL}`;
      const json = await get({ url });
      console.log("anbnp test:", JSON.stringify(json));
      return { ...json, searchQuery: searchQuery }; // Automatically becomes `payload` in `fulfilled` case
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // For `rejected` case
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  "movies/getMovieDetail",
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      const url = `${GET_MOVIE_DETAIL_URL}${id}?&append_to_response=credits`;
      const json = await get({ url });
      //console.log("anbnp test:", JSON.stringify(json));
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // For `rejected` case
    }
  }
);

export const getMovieReviews = createAsyncThunk(
  "movies/getMovieReviews",
  async ({ id, page }: { id: number; page: number }, thunkAPI) => {
    try {
      const url = GET_MOVIE_REVIEWS_URL(id, page);
      const json = await get({ url });
      //console.log("anbnp test:", JSON.stringify(json));
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // For `rejected` case
    }
  }
);

export const getMovieKeywords = createAsyncThunk(
  "movies/getMovieKeywords",
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      const url = GET_MOVIE_KEYWORDS(id);
      const json = await get({ url });
      //console.log("anbnp test:", JSON.stringify(json));
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // For `rejected` case
    }
  }
);

//This store should be divided into multiple slices to improve maintainability.
const initialState: {
  loadingMovies: boolean;
  loadingMovieDetail: boolean;
  loadingReview: boolean;
  loadingKeyword: boolean;
  movies:
    | {
        [key: number]: IMovie[];
      }
    | {};
  moviesTotalPages: number;
  searchQuery: string;
  movieDetail: IMovieDetail;
  reviews: Review[];
  reviewsTotalPage: number;
  keywords: Keyword[];
  error: any;
} = {
  loadingMovies: false,
  loadingMovieDetail: false,
  loadingReview: false,
  loadingKeyword: false,
  movies: {},
  moviesTotalPages: 0,
  searchQuery: "",
  movieDetail: null,
  reviews: [],
  reviewsTotalPage: 0,
  keywords: [],
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
        state.loadingMovies = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loadingMovies = false;
        //reset when user search new query
        if (state.searchQuery != action.payload?.query) {
          state.movies = {};
        }
        state.movies[action.payload?.page || 1] = action?.payload?.results?.map(
          (i: any) => {
            return {
              ...i,
              uri: i.backdrop_path
                ? IMAGE_ORIGINAL_URL + i.backdrop_path
                : null,
            };
          }
        );
        state.searchQuery = action.payload?.query;
        state.moviesTotalPages = action?.payload?.total_pages || 0;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loadingMovies = false;
        state.error = action.payload;
      })
      .addCase(getMovieDetail.pending, (state) => {
        state.loadingMovieDetail = true;
        state.error = null;
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        state.loadingMovieDetail = false;
        const payload = action?.payload || {};
        state.movieDetail = {
          ...payload,
          backdrop_url: payload.backdrop_path
            ? IMAGE_ORIGINAL_URL + payload.backdrop_path
            : null,
        };
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        state.loadingMovieDetail = false;
        state.error = action.payload;
      })

      .addCase(getMovieReviews.pending, (state) => {
        state.loadingReview = true;
        state.error = null;
      })
      .addCase(getMovieReviews.fulfilled, (state, action) => {
        state.loadingReview = false;
        const payload = action?.payload || {};
        state.reviews = payload?.results || [];
        state.reviewsTotalPage = payload?.total_pages || [];
      })
      .addCase(getMovieReviews.rejected, (state, action) => {
        state.loadingReview = false;
        state.error = action.payload;
      })

      .addCase(getMovieKeywords.pending, (state) => {
        state.loadingKeyword = true;
        state.error = null;
      })
      .addCase(getMovieKeywords.fulfilled, (state, action) => {
        state.loadingKeyword = false;
        const payload = action?.payload || {};
        state.keywords = payload?.keywords || [];
      })
      .addCase(getMovieKeywords.rejected, (state, action) => {
        state.loadingKeyword = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
