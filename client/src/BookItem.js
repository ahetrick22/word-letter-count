import React from 'react';

const BookItem = ({ book, history }) => {

  const image = require(`${book.image_url}`);

    return(
      <div className="card book-card">
      <img src={image} alt='Cover'></img>
        {book.title}
        <button onClick={() => history.push(`/stats/${book.gutenberg_id}`)}>Get Stats</button>
      </div>
    )
}

export default BookItem;