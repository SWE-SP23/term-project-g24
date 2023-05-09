import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Book() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.name}</h2>
      <p>Author: {book.author_id}</p>
      <p>{book.brief}</p>
    </div>
  );
}

export default Book;