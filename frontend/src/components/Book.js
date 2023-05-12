import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './css/Book.css';

function Book() {
  const location = useLocation();
  const book = location.state.book;
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  const addComment = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `${token}` };

    const data = { _id: book._id, body: comment };
    const response = await axios.post('http://localhost:4000/addreview', data, { headers });
    book.reviews.push(response.data);
    setComment('');
  };

  const addBook = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      authorization: `${token}`
    };

    const data = { bookId: book._id };
    console.log(data);
    console.log(headers);
    await axios.post('http://localhost:4000/addBook', data, { headers });
  };

  const reviews = book.reviews || [];

  useEffect(() => {
    const getAuthorName = async () => {
      const searchTerm = {
        _id: book.author_id,
      };
      const response = await axios.post(`http://localhost:4000/author/`, searchTerm );
      setAuthorName(response.data.name);
    };
    getAuthorName();
  }, [book.author_id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><br/><br/><br/><br/><br/></p>

      <div className="book-page">
        <div className="book-container">
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <img src={book.cover} alt="bookCover" className="book-cover" />
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h2 className="book-title">{book.name}</h2>
          <p className="book-author">Author: {authorName}</p>
          <p className="book-brief">{book.brief}</p>
          <button className="book-container" onClick={addBook}>Add to my books</button>
          <div className="comment-container">
            <br/><br/><br/><br/>
            <h3>Add a comment:</h3>
            <form className="comment-form" onSubmit={(e) => { e.preventDefault(); addComment(); }}>
              <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment" />
              <button type="submit">Submit</button>
            </form>
            <h3>Comments:</h3>
            <ul className="comment-list">
              {reviews.map((review, index) => (
                <li key={index} className="comment-item">
                  <p className="comment-user">{review.user_name}</p>
                  <p className="comment-body">{review.body}</p>
                  <p className="comment-date"> {new Date(review.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
            
            <br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;