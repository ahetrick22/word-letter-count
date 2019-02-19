import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import BookItem from './BookItem';
export default class Home extends Component {

  render() {
    return(
      <div className = "container">
      <div className = "row">
      <div className = "col">
      <Jumbotron className="home-jumbo">
        <h1 className = 'home-jumbo-title'>What's In A Book?</h1>
      </Jumbotron>
      </div>
      </div>
      <div className="row">
      {bookArr.map(book => (<div className="col-4" key={book.gutenberg_id} ><BookItem history = {this.props.history} book={book} /> </div>))} 
      </div>
      </div>

    )
  }
}

const bookArr = [
  {
    title: 'Pride & Prejudice',
    author: 'Jane Austen',
    gutenberg_id: 1342,
    image_url: './data/pride_&_prejudice.jpg'
  },
  {
    title: 'Oliver Twist',
    author: 'Charles Dickens',
    gutenberg_id: 730,
    image_url: './data/oliver_twist.jpg'
  },
  {
    title: 'The Odyssey',
    author: 'Homer',
    gutenberg_id: 1727,
    image_url: './data/the_odyssey.jpg'
  },
  {
    title: 'Heart of Darkness',
    author: 'Joseph Conrad',
    gutenberg_id: 219,
    image_url: './data/heart_of_darkness.JPG'
  },
  {
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    gutenberg_id: 74,
    image_url: './data/tom_sawyer.jpg'
  },
]
