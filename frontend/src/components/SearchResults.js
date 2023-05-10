import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/SearchResults.css";

function SearchResults({ searchResults }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(9);
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
    const data = result.icon ? result : { book: result };
    navigate(route, { state: data });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

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
        {currentResults.map((result) => (
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
              {!result.icon && <div className="book-author">{result.author_name}</div>}
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
    </div>
  );
}

export default SearchResults;