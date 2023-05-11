import React, { useState, useEffect } from "react";
import axios from 'axios';
// import './css/Profile.css';

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
      <div className="books-container">
        {books.map(book => (
          <div key={book._id} className="book-card">
            <img src={book.cover} alt={book.name} />
            <h2>{book.name}</h2>
            <p>{book.brief}</p>
            <p>Category: {book.category}</p>
            <p>Author: {book.author_id}</p>
            <p>Reviews: {book.reviews.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;