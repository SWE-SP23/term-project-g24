import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./css/profile.css";

const Profile = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `${token}` };
    console.log(token);
    console.log(headers);
    
    axios.get('http://localhost:4000/all', { headers })
      .then(response => {
        setBooks(response.data.books);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error here, such as displaying an error message to the user
      });
  }, []);

  return (
    <div className="profile-page">
      <p><br/><br/><br/><br/></p>

      <h1>My Books</h1>
      <div className="results-container">
        {books.map(book => (
          <div key={book._id} className="book-container">
            <Link to={{ pathname: "/book", state: { book } }}>
              <img className="book-cover" src={book.cover} alt={book.name} />
            </Link>
            <div className="book-info">
              <Link to={{ pathname: "/book", state: { book } }}>
                <div className="book-title">{book.name}</div>
              </Link>
              <div className="book-genre">{book.category}</div>
              <Link to={{ pathname: "/author", state: { author: book.author_id } }}>
                <div className="book-author">Author: {book.author_name}</div>
              </Link>
              <div className="book-brief">{book.brief}</div>
              <div className="book-reviews">Reviews: {book.reviews.length}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;