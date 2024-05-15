//https://api.quotable.io/quotes/random

import { useEffect, useState } from "react";
import './quote.css'
function RandomQuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseURL = "https://api.quotable.io/quotes/random";

  async function fetchQuote() {
    try {
      setLoading(true);
      const response = await fetch(baseURL, {
        method: "GET",
      });
      const result = await response.json();
      if (result && result.length > 0) {
        setLoading(false);
        setQuote(result[0]);
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchQuote();
  }, []);
  function handleRefresh() {
    fetchQuote();
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="random-quote-generator">
      <h1>Random Quote Generator</h1>
      <div className="quote-wrapper">
        <p>{quote?.author}</p>
        <p>{quote?.content}</p>
      </div>
      <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default RandomQuoteGenerator;
