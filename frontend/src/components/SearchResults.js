import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/SearchResults.css";

function SearchResults({ searchResults }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(30);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {currentResults.map((result) => (
        <div key={result.id} className="search-result">
          <h3>{result.title}</h3>
          <p>{result.author}</p>
          <Link to={`/book/${result.id}`} className="search-result-link">
            View Details
          </Link>
        </div>
      ))}
      {totalPages > 1 && (
        <div className="pagination">
          {pageNumbers.map((pageNumber) => (
            <div
              key={pageNumber}
              className={`pagination-link ${pageNumber === currentPage ? "active" : ""}`}
              data-page={pageNumber}
              onClick={handlePageClick}
            >
              {pageNumber}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;