import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/SearchResults.css";

function SearchResults({ searchResults }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(9);
  const [authorNames, setAuthorNames] = useState([]);
  const navigate = useNavigate();

  // Calculate the index of the first and last result on the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;

  // Get the results to display on the current page
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  // Calculate the total number of pages
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  // Create an array of page numbers to display in the pagination links
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.dataset.page));
  };

  const handleResultClick = (result) => {
    const route = result.icon ? "/author" : "/book";
    const data = result.icon ? { author: result} : { book: result };
    navigate(route, { state: data });
  };

  useEffect(() => {
    const getAuthorNames = async () => {
      const bookResults = currentResults.filter(result => !result.icon);
      if (bookResults.length > 0) {
        const authorIds = bookResults.map((result) => result.author_id);
        const requests = authorIds.map((id) => axios.post(`http://localhost:4000/author/`, { _id: id }));
        const responses = await Promise.all(requests);
        const names = responses.map((response) => response.data.name);
        setAuthorNames(names);
      } else {
        setAuthorNames([]);
      }
    };
    getAuthorNames();
  }, [currentResults]);

  return (
    <div>
      <p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </p>
      <div className="results-container">
      <p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></p>

        {currentResults.map((result, index) => (
          <div
            key={result._id}
            className={result.icon ? "author-container" : "book-container"}
          >
            <img
              className={result.icon ? "author-icon" : "book-cover"}
              src={result.icon || result.cover}
              alt={result.icon ? result.name + " icon" : result.name + " book cover"}
              onClick={() => handleResultClick(result)}
            />
            <div className={result.icon ? "author-info" : "book-info"}>
              <div
                className={result.icon ? "author-name" : "book-title"}
                onClick={() => handleResultClick(result)}
              >
                {result.name}
              </div>
              {!result.icon && <div className="book-genre">{result.category}</div>}
              {!result.icon && <div className="book-author">Author: {authorNames[index]}</div>}
              {result.icon && <div className="author-bio">{result.bio}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((page) => (
          <div
            key={page}
            className={`pagination-link ${
              page === currentPage ? "active" : ""
            }`}
            data-page={page}
            onClick={handlePageClick}
          >
            {page}
          </div>
        ))}

      </div>
      <p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </p>
    </div>
  );
}

export default SearchResults;