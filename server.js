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

//receives a JSON payload in the request body with key 'paragraph' and a string value of 2+ sentences, 
//returns JSON with key 'sentences' and an array value containing objects with text and wordCount properties
app.post('/word_count_per_sentence', (req, res) => {
  let { paragraph } = req.body;
  //make sure the request has sent a paragraph
  if (paragraph) {
    //remove whitespace on either side 
    paragraph = paragraph.trim();
    //we only want to have to iterate over the entire string once, 
    //so identify both the spaces and sentence endings in one place and 
    //then save it in a return obj
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
          while (paragraph[c+1] === ' ') {
            c++
          };
      };
    };
    //make sure there is more than one sentence in the paragraph, since that was a requirement
    if (returnObj.sentences.length < 2) {
      res.status(400).send('Bad request - your paragraph must have 2 or more sentences to be processed');
    };
    res.send(JSON.stringify(returnObj));
  } else {
    //handle if no paragraph was sent
    res.status(400).send('Bad request - must send a paragraph in the body');
  }

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