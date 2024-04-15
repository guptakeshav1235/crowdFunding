import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/Admin.css";
import { Link } from "react-router-dom";

function AllUsers() {
  const [users, setUsers] = useState([]);

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Function to fetch all users from the backend API
  const fetchAllUsers = async () => {
    try {
      const response = await fetch("https://localhost:7063/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle deleting a user
  const handleDeleteUser = async (id) => {
    console.log("User deleted");
    try {
      const response = await fetch(`https://localhost:7063/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove the deleted user from the list
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAdminChange = async (id, isAdmin) => {
    console.log("Admin status changed");
    try {
      const response = await fetch(
        `https://localhost:7063/api/update-admin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(isAdmin), // Send only the isAdmin boolean
        }
      );
      if (response.ok) {
        // Update the local state with the new admin status
        setUsers(
          users.map((user) => (user.id === id ? { ...user, isAdmin } : user))
        );
      } else {
        console.error("Failed to update admin status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating admin status:", error.message);
    }
  };

  return (
    <div className="all-users-container">
      <h2>All Users</h2>
      <Link to="/dashboard" className="back-btn">
        Go Back
      </Link>
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={() => handleAdminChange(user.id, !user.isAdmin)}
                />
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;
