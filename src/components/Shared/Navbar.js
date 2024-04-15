// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Navbar.css";
import { useUserContext } from "../../context/UserContext";

function Navbar() {
  const { user, logout } = useUserContext();
  const navigation = useNavigate();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleAdminDropdownToggle = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const handleLogout = () => {
    setTimeout(() => {
      logout();
      navigation("/login");
    });
    // logout();
    // navigation("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/reports">Reports</Link>
        </li>

        {user ? (
          <div className="user-menu">
            <span className="username" onClick={handleDropdownToggle}>
              {user.username}
              <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
            </span>
            {dropdownVisible && (
              <div className="user-dropdown">
                <Link className="logout" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* <li>
              <Link to="/register">Register</Link>
            </li> */}
          </>
        )}

        {user && user.isAdmin && (
          <div className="user-menu">
            <span className="admin-menu" onClick={handleAdminDropdownToggle}>
              Admin
              <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
            </span>
            {adminDropdownVisible && (
              <div className="admin-dropdown">
                <Link to="/admin/add-campaign">Add Campaign</Link>
                <Link to="/admin/all-campaigns">All Campaigns</Link>
                <Link to="/admin/all-users">All Users</Link>
              </div>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
