const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CONTENT_HEADERS = {"Content-Type": "application/json"};
const PORT = process.env.PORT || 5001;

//allow express app to correctly parse parameters from the body
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//The payload should be a simple key/value pair, 
//where the key is a name or identifier for the paragraph to be evaluated and the value is a string with two or more sentences.

//Return individual sentences along with a word count for the sentence. 
//A sentence is any grouping of letters and words ending in a period, question mark or exclamation point. 
//A word is text delimited by spaces.
//accepts and returns JSON
app.post('/word_count_per_sentence', (req, res) => {
  res.send('word count route');
})

//For each case-insensitive letter, return the number of times that letter appears in the entire text. 
//E.g. the text contains 50 As, 40 Bs, etc.
//accepts and returns JSON
app.post('/total_letter_count', (req, res) => {
  res.send('letter count route');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})