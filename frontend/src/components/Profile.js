import React from 'react';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <h2>Account Information</h2>
      <p>Name: John Smith</p>
      <p>Email: john.smith@example.com</p>
      <h2>My Books</h2>
      <ul>
        <li>Harry Potter and the Philosopher's Stone - Want to Read</li>
        <li>The Da Vinci Code - Currently Reading</li>
        <li>To Kill a Mockingbird - Finished Reading</li>
      </ul>
    </div>
  );
}

export default Profile;