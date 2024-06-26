import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalState from "./components/movie-app/context/GlobalState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalState>
    <App />
  </GlobalState>
);
