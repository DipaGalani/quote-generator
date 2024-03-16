const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter-button");
const newQuoteBtn = document.querySelector("#new-quote-button");
const loader = document.querySelector("#loader");

let quotesArray = [];

function displayLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Displaying one quote from quotes array
function getQuote() {
  displayLoader();
  const quote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoader();
}

// Get an array of quotes from API
async function getQuotes() {
  displayLoader();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  const response = await fetch(apiUrl);
  quotesArray = await response.json();
  return getQuote();
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
