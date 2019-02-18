const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5001;
const cors = require('cors');

//allow express app to correctly parse parameters from the body
//set high payload limit to handle long strings
app.use(bodyParser.json({limit: '50mb'}));
app.use(
  bodyParser.urlencoded({
    limit: '50mb', extended: true
  })
);

app.use(cors());

//receives a JSON payload in the request body with key 'paragraph' and a string value of 2+ sentences, 
//returns JSON with key 'sentences' and an array value containing objects with text and wordCount properties
app.post('/word_count_per_sentence', (req, res) => {
  //make sure there's a body sent
  if (req.body) {
    let { paragraph } = req.body;
    //make sure the request has sent a paragraph and get rid of whitespace on either side
    if (paragraph) {
      paragraph = paragraph.trim();
      //identify both the spaces and sentence endings in one place and then save it in a return obj
      const returnObj = {
        sentences: []
      };
      //track the previous end so that we know where to split each sentence
      let previousSentenceEnd = 0;
      let singleSentence = {
        text: '', 
        wordCount: 1
      };
      for (let c = 0; c < paragraph.length; c++) {
        //if the character is a space, then track a new word
        if (paragraph[c] === ' ') {
          singleSentence.wordCount++;
        }
        //if the character is a sentence ender, then slice off the sentence and push a copy of 
        //it into the return, then reset the object to track the next sentence
        if(paragraph[c] === '.' || paragraph[c] === '?' || paragraph[c] === '!') {
          singleSentence.text = paragraph.slice(previousSentenceEnd, c+1).trim();
          returnObj.sentences.push({...singleSentence});
          previousSentenceEnd = c;
          singleSentence.text = '';
          singleSentence.wordCount = 1;
          //bump up to the next index that has a letter after the end of the sentence 
          //this allows for any number of spaces after a sentence's ending punctuation
          //also accounts for two punctuation marks in a row (like !?)
            while (paragraph[c+1] === ' ' || paragraph[c+1] === '.' || paragraph[c+1] === '!'|| paragraph[c+1] === '?') {
              c++
            };
        };
      };
      //make sure there is more than one sentence in the paragraph
      if (returnObj.sentences.length < 2) {
        res.status(400).send('Bad request - your paragraph must have 2 or more sentences to be processed');
      } else {
        //send the result
        res.json(returnObj);
      }
    } else {
      //handle if no paragraph was sent
      res.status(400).send('Bad request - must send a JSON body with a key of "paragraph"');
    }
  } else {
    //handle if no body was sent
    res.status(400).send('Body is required');
  }
})

//For each case-insensitive letter in a string(sent as JSON with key - body, value - the string to assess), 
//returns the number of times that letter appears in the entire text. 
//returns JSON with a key for each letter, even if that letter shows up 0 times.
app.post('/total_letter_count', (req, res) => {
 //make sure there's a body sent
  if (req.body) {
    let { text } = req.body;
    //make sure the request has sent text and get rid of whitespace on either side
    if (text) {
      text = text.trim();
      //build the array of alphabet characters to test against
      const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
      const returnObj = {};
      //assign each character to the object we're returning and set the count to 0
      alphabet.forEach(letter => returnObj[letter] = 0);
      //check each character in the text string
      for (let c = 0; c < text.length; c++) {
        let currentCharacter = text[c].toUpperCase();
        //if we can lookup the character in the return object, then it's an alphabet char and we add it
        if (returnObj[currentCharacter] >= 0) {
          returnObj[currentCharacter]++;
        };
      };
      res.json(returnObj);
    } else {
      //handle if no text was sent
      res.status(400).send('Bad request - must send a JSON body with a key of "text"');
      }
  } else {
  //handle if no body was sent
  res.status(400).send('Body is required');
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

//export for testing
module.exports = app;