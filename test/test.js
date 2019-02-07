const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('POST /word_count_per_sentence', () => {
  it('should require a body in the request', done => {
    chai.request(server)
      .post('/word_count_per_sentence')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.empty;
      })
      done();
  })

  it('should have a key paragraph in the body of the request', done => {
    chai.request(server)
      .post('/word_count_per_sentence')
      .send({NotAParagraph: "blah blah blah"})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.empty;
      })
      done();
  })

  it('should require at least 2 sentences in the paragraph', done => {
    chai.request(server)
      .post('/word_count_per_sentence')
      .send({paragraph: "blah blah blah."})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.empty;
      })
      done();
  })

  it('should return a response with one key: sentences and one array value with an item for each sentence', done => {
    chai.request(server)
      .post('/word_count_per_sentence')
      .send({paragraph: "blah blah blah. Blah? Testing with a paragraph of various sentence lengths! AND CAPITALS."})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.sentences.should.be.an('array');
        res.body.sentences.length.should.be.eql(4);
        res.body.sentences[0].text.should.be.eql('blah blah blah.')
        res.body.sentences[0].wordCount.should.be.eql(3);
      })
      done();
  })

  it ('should handle white space and no space around sentences', done => {
    chai.request(server)
    .post('/word_count_per_sentence')
    .send({paragraph: "              blah blah blah.     Blah?Testing with a paragraph of various sentence lengths! AND CAPITALS. "})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.sentences.should.be.an('array');
      res.body.sentences.length.should.be.eql(4);
      res.body.sentences[0].text.should.be.eql('blah blah blah.')
      res.body.sentences[0].wordCount.should.be.eql(3);
    })
    done(); 
  }) 

  it ('should handle double punctuation marks', done => {
    chai.request(server)
    .post('/word_count_per_sentence')
    .send({paragraph: "blah blah blah. Blah? Testing with a paragraph of various sentence lengths!? AND CAPITALS."})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.sentences.should.be.an('array');
      res.body.sentences.length.should.be.eql(4);
      res.body.sentences[0].text.should.be.eql('blah blah blah.')
      res.body.sentences[0].wordCount.should.be.eql(3);
    })
    done(); 
  }) 

})