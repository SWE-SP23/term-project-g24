import React from 'react';
import { useParams } from 'react-router-dom';

function Author() {
  const { id } = useParams();

  return (
    <div>
      <h1>Author {id}</h1>
      <h2>Description</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse pharetra mi sit amet lorem dapibus commodo. Praesent ut interdum augue, sit amet commodo mi. Fusce euismod ante eu purus commodo, nec bibendum tellus mattis. Integer nec arcu eu tellus egestas ultrices ac id ligula. </p>
      <h2>Books</h2>
      <ul>
        <li>Harry Potter and the Philosopher's Stone</li>
        <li>The Da Vinci Code</li>
        <li>To Kill a Mockingbird</li>
      </ul>
    </div>
  );
}

export default Author;