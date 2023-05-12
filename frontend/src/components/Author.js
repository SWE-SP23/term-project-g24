import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./css/author.css"

function Author() {
const location = useLocation();
const author = location.state.author;
console.log(author);
const navigate = useNavigate();

const handleBookClick = (book) => {
navigate('/book', { state: { book } });
}

return (
<div className="author-container">
<p> <br/ ><br/ ><br/ ><br/ ><br/ > </p>
<h2 className="author-name">{author.name}</h2>
<p className="author-bio">{author.bio}</p>
<div className="author-books-container">
<h3 className="author-books-heading">Books:</h3>
<ul className="author-books-list">
{author.author_books.map(book => (
<li key={book._id} className="author-book">
<img src={book.cover} alt={book.name} className="author-book-cover" onClick={() => handleBookClick(book)} />
<div className="author-book-details">
<h4 className="author-book-name" onClick={() => handleBookClick(book)}>{book.name}</h4>
<p className="author-book-brief">{book.brief}</p>
<p className="author-book-category">{book.category}</p>
</div>
</li>
))}
</ul>
</div>
</div>
);
}

export default Author;