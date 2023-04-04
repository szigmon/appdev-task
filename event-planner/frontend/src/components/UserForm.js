import React, { useState } from 'react';
import { createUser } from '../services/userService';

function UserForm() {
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ name: userName });
    setUserName('');
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
            onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Create User</button>
        </form>
    </div>
    );
}

export default UserForm;
