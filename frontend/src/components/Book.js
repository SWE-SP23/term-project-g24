import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

function Book() {
  const location = useLocation();
  const book = location.state.book;
  const [comment, setComment] = useState('');

  const addComment = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `${token}` };
    const data = { _id: book._id, body: comment };
    console.log(data);
    const response = await axios.post('http://localhost:4000/addreview', data, { headers });
    book.reviews.push(response.data);
    console.log(response);
    setComment('');
  };

  const reviews = book.reviews || [];

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><br/><br/><br/><br/></p>
      <h2>{book.name}</h2>
      <p>Author: {book.author_name}</p>
      <p>{book.brief}</p>
      <img src={book.cover} alt="bookCover" style={{scale:"200%"}} />
      <p>{book.category}</p>
      <h3>Add a comment:</h3>
      <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={addComment}>Submit</button>
      <h3>Comments:</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>User: {review.user_name}</p>
            <p>Comment: {review.body}</p>
            <p>Date: {new Date(review.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Book;