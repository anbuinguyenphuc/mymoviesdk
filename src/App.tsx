import React from "react";
import "./App.css";
import { useSearchMovie } from "./sdk/MovieManager";
import { IMAGE_ORIGINAL_URL } from "./sdk/ApiDomain";
import "./index.css";
import { initSdk } from "./sdk/http-helper";
//for demo purposes only, should not be needed in production
initSdk({
  apiKey:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDUwZmYxZWEwNjEwYmZlNDJkMGJiMzEyZWUxNmRiYSIsIm5iZiI6MTczNTI3MDE3NC4xOTkwMDAxLCJzdWIiOiI2NzZlMWYxZTc2OTg1MmYyOTAxMjlkZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-aFhPbLWbDyO_JTeURYXRdX9tTYug-HBAalQhmwXRQI",
});
function App() {
  const { movieList, setSearchQuery, searchQuery, loading } = useSearchMovie({
    initSearchQuery: "",
    performanceMode: "debounce",
  });
  console.log("movieList: " + JSON.stringify(movieList));
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
