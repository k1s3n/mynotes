import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { getUsers } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
    <div className="border p-3 mb-3 rounded-4 shadow">
      <h4>Registered Users</h4>
      {error && <p style={{color: 'red'}}>{error}</p>}  {/* Show error message */}
      <ul className="list-group" style={{listStyle: 'none'}}>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
                <div className="p-2">
            <span><FontAwesomeIcon icon={faUser} /> </span>
              <span>{user.email} </span>
              <span>{user.isAdmin ? 'Admin' : 'User'}</span>
              </div>
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
