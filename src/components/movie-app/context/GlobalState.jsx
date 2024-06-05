import { createContext, useEffect, useReducer, useState } from "react";
import useDebounce from "../../debounce/use-debounce";
import { Reducer } from "./Reducer";
import {
  ADD_MOVIE_TO_WATCHED,
  ADD_MOVIE_TO_WATCHLIST,
  MOVE_TO_WATCHED,
  REMOVE_MOVIE_TO_WATCHED,
  REMOVE_MOVIE_TO_WATCHLIST,
} from "../types";

export const MovieContext = createContext(null);
const tmdb_api_key = "32415fba912003ef919fc10ac5769010";

const initialState = {
  watchList: (() => {
    try {
      return localStorage.getItem("watchList")
        ? JSON.parse(localStorage.getItem("watchList"))
        : [];
    } catch (e) {
      console.error("Invalid JSON in localStorage for watchList", e);
      return [];
    }
  })(),
  watched: (() => {
    try {
      return localStorage.getItem("watched")
        ? JSON.parse(localStorage.getItem("watched"))
        : [];
    } catch (e) {
      console.error("Invalid JSON in localStorage for watched", e);
      return [];
    }
  })(),
};

function GlobalState({ children }) {
  const [searchMovieParam, setSearchMovieParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieSearchResults, setMovieSearchResults] = useState([]);

  // reducer
  const [state, dispatch] = useReducer(Reducer, initialState);

  const debouncedMovieSearchParamValue = useDebounce(searchMovieParam, 500);

  async function fetchListOfMovies() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_api_key}&query=${debouncedMovieSearchParamValue}&include_adult=false&language=en-US&page=1`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();

      if (result && result.results && result.results.length > 0) {
        setMovieSearchResults(result.results);
      } else {
        setMovieSearchResults([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (debouncedMovieSearchParamValue !== "") {
      fetchListOfMovies();
    }
  }, [debouncedMovieSearchParamValue]);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  function handleAddMovieToWatchList(movie) {
    dispatch({
      type: ADD_MOVIE_TO_WATCHLIST,
      payload: movie,
    });
  }

  function handleAddMovieToWatched(movie) {
    dispatch({
      type: ADD_MOVIE_TO_WATCHED,
      payload: movie,
    });
  }

  function handleRemoveFromWatchList(id) {
    dispatch({
      type: REMOVE_MOVIE_TO_WATCHLIST,
      payload: id,
    });
  }

  function handleRemoveFromWatched(movie) {
    dispatch({
      type: REMOVE_MOVIE_TO_WATCHED,
      payload: movie,
    });
  }

  function handleMoveToWatched(movie){
    dispatch({
      type: MOVE_TO_WATCHED,
      payload: movie,
    })
  }

  return (
    <MovieContext.Provider
      value={{
        searchMovieParam,
        setSearchMovieParam,
        loading,
        movieSearchResults,
        handleAddMovieToWatchList,
        handleAddMovieToWatched,
        state,
        handleRemoveFromWatchList,
        handleRemoveFromWatched,
        handleMoveToWatched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default GlobalState;
