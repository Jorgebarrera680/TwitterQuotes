const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
// Get Quote From API
async function getQuote() {
    loading();
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const apiUrl = encodeURIComponent('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        const quoteData = JSON.parse(data.contents); // Parse the contents to JSON
        
        // If Author is blank, add 'Unknown'
        if (quoteData.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = quoteData.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (quoteData.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = quoteData.quoteText;
        // Stop Loader, Show Quote
        complete();
    } catch (error) {
        console.error('Error fetching quote: ', error);
        getQuote();
    }
}


// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

