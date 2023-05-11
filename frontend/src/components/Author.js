import React from 'react';
import { useLocation } from 'react-router-dom';

function Author() {
  const location = useLocation();
  const author = location.state && location.state.author;

  if (!author || !author.books) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><br/><br/><br/><br/><br/><br/><br/><br/></p>
      <h2>{author.name}</h2>
      <p>{author.bio}</p>
      
      {/* <ul>
        {author.books.map((book) => (
          <li key={book._id}>{book.name}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Author;