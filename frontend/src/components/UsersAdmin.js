import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { getUsers, toggleAdmin } from "../services/api";  // Import new toggleAdmin function
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Track loading state

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getUsers();
        setUsers(result.slice(0, 10));  // Limit to 10 users for now
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    if (user && user.isAdmin) {
      fetchUsers();  // Fetch users only if admin is logged in
    }
  }, [user]);

  const handleAdminToggle = async (userId) => {
    try {
      const updatedUser = await toggleAdmin(userId);  // Call API to toggle admin status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
    } catch (error) {
      setError('Failed to update admin status');
      console.error('Error updating admin status:', error);
    }
  };

  if (!user) return <div></div>;
  if (!user.isAdmin) return <div>Access denied: You are not an admin</div>;

  return (
    <div className="border p-3 mb-3 rounded-4 shadow">
      <h4>Registered Users</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading users...</p>}
      <ul className="list-group" style={{ listStyle: "none" }}>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="d-flex justify-content-between align-items-center">
              <div className="p-2">
                <span>
                  <FontAwesomeIcon icon={faUser} />{" "}
                </span>
                <span>{user.email}</span>
              </div>
              <div>
                {/* Toggle admin status by clicking */}
                <button
                  className={`btn ${user.isAdmin ? "btn-success" : "btn-warning"} btn-sm`}
                  onClick={() => handleAdminToggle(user._id)}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default UsersAdmin;
