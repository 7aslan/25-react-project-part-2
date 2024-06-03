import { useContext } from "react";
import { MovieContext } from "./context/GlobalState";
import MovieCard from "./components/movie-card";
import "./movie.css";
import MovieWatchList from "./components/watchlist";
import MovieAlreadyWatched from "./components/wathced";

function MovieApp() {
  const { searchMovieParam, setSearchMovieParam, loading, movieSearchResults } =
    useContext(MovieContext);

  return (
    <div className="movie-app">
      <h1>Movie App</h1>
      <div className="watch-list-details-container">
        <MovieWatchList />
        <MovieAlreadyWatched />
      </div>
      <div className="search-container">
        <input
          type="text"
          name="searchMovieParam"
          value={searchMovieParam}
          onChange={(event) => setSearchMovieParam(event.target.value)}
          placeholder="Serch for a movie..."
        />
      </div>
      {loading ? <h2>Fetching List of Movies... Please Wait! </h2> : null}
      <div className="movie-search-results-container">
        {movieSearchResults && movieSearchResults.length > 0 && !loading
          ? movieSearchResults.map((movieItem) => (
              <MovieCard key={movieItem.id} movieItem={movieItem} />
            ))
          : null}
      </div>
    </div>
  );
}

export default MovieApp;
