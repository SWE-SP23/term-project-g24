import React from "react";
import { useLocation } from "react-router-dom";

function Book() {
  const location = useLocation();
  const book = location.state.book;

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><br/><br/><br/><br/></p>
      <h2>{book.name}</h2>
      <p>Author: {book.author_id}</p>
      <p>{book.brief}</p>
      <p>{book.cover}</p>
      <p>{book.category}</p>
      {/* <p>{book.reviews}</p> */}
    </div>
  );
}

export default Book;