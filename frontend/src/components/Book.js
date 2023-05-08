import React from 'react';
import { useParams } from 'react-router-dom';
// import "./css/Theme.css"
function Book() {
  const { id } = useParams();

  return (
    <div>
      <h1>Book {id}</h1>
      <h2>Description</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse pharetra mi sit amet lorem dapibus commodo. Praesent ut interdum augue, sit amet commodo mi. Fusce euismod ante eu purus commodo, nec bibendum tellus mattis. Integer nec arcu eu tellus egestas ultrices ac id ligula. </p>
      <h2>Reviews</h2>
      <ul>
        <li>Great book, highly recommend it!</li>
        <li>Couldn't put it down, loved it!</li>
        <li>Disappointing ending, but still worth a read.</li>
      </ul>
    </div>
  );
}

export default Book;