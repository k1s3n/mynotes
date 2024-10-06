import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { getUsers } from "../services/api";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);  // For handling errors

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUsers();
        setUsers(result);
      } catch (error) {
        setError('Failed to fetch users');  // Handle errors
        console.error('Error fetching users:', error);
      }
    };

    if (user && user.isAdmin) {
      fetchUsers();  // Fetch users only if admin is logged in
    }
  }, [user]);

  if (!user) return <div>Not logged in</div>;
  if (!user.isAdmin) return <div>Access denied: You are not an admin</div>;

  return (
    <div>
      <h4>Admin: Registered Users</h4>
      {error && <p style={{color: 'red'}}>{error}</p>}  {/* Show error message */}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.isAdmin ? 'Admin' : 'User'}</p>
            </li>
          ))
        ) : (
          <p>No users found.</p>  // Handle the case where there are no users
        )}
      </ul>
    </div>
  );
};

export default UsersAdmin;
