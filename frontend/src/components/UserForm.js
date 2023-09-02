import React, { useState } from 'react';
import { createUser } from '../services/userService';

function UserForm({ onUserCreated }) { // Receive the prop here
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await createUser({ username: userName, email: userEmail, fullName: userFullName });
    setUserName('');
    setUserEmail('');
    setUserFullName('');
    if (onUserCreated) {
      onUserCreated(newUser); // Use the prop here
    }
  };
  

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={userFullName}
          onChange={(e) => setUserFullName(e.target.value)}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default UserForm;
