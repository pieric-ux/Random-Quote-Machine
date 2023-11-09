import { useEffect, useState } from "react";
import './App.css'

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState({});

  const JSON_URL =
    "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";

  useEffect(() => {
    fetch(JSON_URL)
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data);
        setSelectedQuote(getRandomQuote(data));
      });
  }, []);

  const getRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleNewQuote = () => {
    setSelectedQuote(getRandomQuote(quotes));
  };

  const twitterURL = `https://twitter.com/intent/tweet?text=${selectedQuote.quote} - ${selectedQuote.author}`;

  return (
    <div id="quote-box">
      <p id="text">"{selectedQuote.quote}"</p>
      <p id="author">-{selectedQuote.author}</p>
      <div>
        <a id="tweet-quote" href={twitterURL}>
          Tweet!
        </a>
        <button id="new-quote" onClick={handleNewQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}
