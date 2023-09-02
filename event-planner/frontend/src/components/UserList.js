import React, { useState, useEffect } from 'react'; // Import React and hooks
import { getUsers, deleteUser } from '../services/userService'; // Import getUsers function
import UserForm from './UserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); 

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      console.log('Fetched users:', usersData);
      setUsers(usersData);
    };

    fetchUsers();
  }, [refreshKey]);

  const handleUserCreated = (newUser) => {
    setRefreshKey((prevKey) => prevKey + 1);
    console.log('New user:', newUser);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    handleUserDeleted(id);
  };

  const handleUserDeleted = (deletedUserId) => {
    setRefreshKey((prevKey) => prevKey + 1);
    console.log(`User with ID ${deletedUserId} deleted.`);
  };


  return (
    <div className="user-list">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserForm onUserCreated={handleUserCreated} />
    </div>
  );
}

export default UserList;
