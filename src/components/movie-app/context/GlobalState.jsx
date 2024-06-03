import { createContext, useEffect, useState } from "react";
import useDebounce from "../../debounce/use-debounce";

export const MovieContext = createContext(null);
const tmdb_api_key = "32415fba912003ef919fc10ac5769010";

function GlobalState({ children }) {
  const [searchMovieParam, setSearchMovieParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieSearchResults, setMovieSearchResults] = useState([]);

  const debouncedMovieSearchParamValue = useDebounce(searchMovieParam, 500);

  async function fetchListOfMovies() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_api_key}&query=${debouncedMovieSearchParamValue}&include_adult=false&language=en-US&page=1`
      );
      const result = await res.json();

      if (result && result.results && result.results.length > 0) {
        setMovieSearchResults(result.results);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListOfMovies();
  }, [debouncedMovieSearchParamValue]);

  return (
    <MovieContext.Provider
      value={{
        searchMovieParam,
        setSearchMovieParam,
        loading,
        movieSearchResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
export default GlobalState;
