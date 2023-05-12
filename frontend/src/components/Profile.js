import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "./css/profile.css";

const Profile = () => {
  const [books, setBooks] = useState([]);
  const [authorNames, setAuthorNames] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `${token}` };
    console.log(headers);
    console.log(token);
    axios.get('http://localhost:4000/all', { headers })
      .then(response => {
        console.log(response);
        setBooks(response.data.books);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error here, such as displaying an error message to the user
      });

    const getAuthorName = async (authorId) => {
      const searchTerm = {
        _id: authorId,
      };
      const response = await axios.post(`http://localhost:4000/author/`, searchTerm );
      return response.data.name;
    };

    const fetchAuthorNames = async () => {
      const newAuthorNames = {};
      for (const book of books) {
        if (!newAuthorNames[book.author_id]) {
          const authorName = await getAuthorName(book.author_id);
          newAuthorNames[book.author_id] = authorName;
        }
      }
      setAuthorNames(newAuthorNames);
    };

    fetchAuthorNames();
  }, [books]);

  const removeBook = async (bookId) => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `${token}` };

    const data = { bookId };
    try {
      await axios.post('http://localhost:4000/removeBook', data, { headers });
      setBooks(books.filter(book => book._id !== bookId)); // remove the book from the local state
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here, such as displaying an error message to the user
    }
  };

  const handleBookClick = (book) => {
    navigate('/book', { state: { book } });
  };

  return (
    <div className="profile-page">
      <h1>My Books</h1>
      <div className="results-container">
        {books.map(book => (
          <div key={book._id} className="book-container">
            <img className="book-cover" src={book.cover} alt={book.name} onClick={() => handleBookClick(book)} />
            <div className="book-info">
              <div className="book-title" onClick={() => handleBookClick(book)}>{book.name}</div>
              <div className="book-genre">{book.category}</div>
              <div className="book-author">Author: {authorNames[book.author_id]}</div>
              <div className="book-brief">{book.brief}</div>
              <div className="book-reviews">Reviews: {book.reviews.length}</div>
              <button className="remove-button" onClick={() => removeBook(book._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;