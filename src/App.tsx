import React, { useEffect } from "react";
import "./App.css";
import {
  useGetMovieDetail,
  useGetMovieDetailV2,
  useGetMovieKeywords,
  useGetMovieKeywordsV2,
  useGetMovieReviews,
  useGetMovieReviewsV2,
  useSearchMovie,
  useSearchMovieV2,
} from "./sdk/MovieManager";
import { IMAGE_ORIGINAL_URL } from "./sdk/ApiDomain";
import "./index.css";
import { initSdk } from "./sdk/http-helper";

//for demo purposes only, should not be needed in production
initSdk({
  apiKey:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDUwZmYxZWEwNjEwYmZlNDJkMGJiMzEyZWUxNmRiYSIsIm5iZiI6MTczNTI3MDE3NC4xOTkwMDAxLCJzdWIiOiI2NzZlMWYxZTc2OTg1MmYyOTAxMjlkZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-aFhPbLWbDyO_JTeURYXRdX9tTYug-HBAalQhmwXRQI",
});
function App() {
  const SAMPLE_MOVIE_ID = 558449;
  //V1
  const { movieList } = useSearchMovie({
    initSearchQuery: "",
    performanceMode: "debounce",
  });
  const { keywords } = useGetMovieKeywords({ id: SAMPLE_MOVIE_ID });
  const { movieDetail } = useGetMovieDetail({ id: SAMPLE_MOVIE_ID });
  const { reviews } = useGetMovieReviews({ id: SAMPLE_MOVIE_ID, page: 1 });
  console.log("movieListV2: " + JSON.stringify(movieList));
  console.log("movieDetailV2: " + JSON.stringify(movieDetail));
  console.log("reviewsV2: " + JSON.stringify(reviews));
  console.log("keywordsV2: " + JSON.stringify(keywords));
  //V2
  const { movieList: movieListV2 } = useSearchMovieV2({
    initSearchQuery: "",
    performanceMode: "debounce",
  });
  const { keywords: keywordsV2 } = useGetMovieKeywordsV2({
    id: SAMPLE_MOVIE_ID,
  });
  const { movieDetail: movieDetailV2 } = useGetMovieDetailV2({
    id: SAMPLE_MOVIE_ID,
  });
  const { reviews: reviewsV2 } = useGetMovieReviewsV2({
    id: SAMPLE_MOVIE_ID,
    page: 1,
  });
  console.log("movieListV2: " + JSON.stringify(movieListV2));
  console.log("movieDetailV2: " + JSON.stringify(movieDetailV2));
  console.log("reviewsV2: " + JSON.stringify(reviewsV2));
  console.log("keywordsV2: " + JSON.stringify(keywordsV2));
  return (
    <div className="App">
      <div className="movie-list">
        {movieList.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={IMAGE_ORIGINAL_URL + movie.backdrop_path}
              alt={`${movie.title} Poster`}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-release-date">
                Release: {movie.release_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
