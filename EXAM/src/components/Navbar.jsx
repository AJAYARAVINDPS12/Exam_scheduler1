import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling

const Navbar = ({ onLogout, user }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Main Logo (optional text-based logo) */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">Exam Scheduler</span>
                </Link>

                <div className="nav-buttons-container">
                    {/* Home Button */}
                    <Link to="/" className="nav-button">
                        <span>Home</span>
                    </Link>
                    {/* Schedule Exam Button */}
                    <Link to="/schedule" className="nav-button">
                        <span>Schedule</span>
                    </Link>
                    {/* History Button */}
                    <Link to="/history" className="nav-button">
                        <span>History</span>
                    </Link>
                    {/* Search Button */}
                    <Link to="/search" className="nav-button">
                        <span>Search</span>
                    </Link>
                    {/* Notifications Button */}
                    <Link to="/notifications" className="nav-button">
                        <span>Notifications</span>
                    </Link>
                    {/* My Account Button */}
                    <Link to="/account" className="nav-button">
                        <span>My Account</span>
                    </Link>
                </div>
                {/* User and Logout Section */}
                <div className="user-section">
                    {user && (
                        <span className="nav-user">
                            Welcome, {user.username || user.email}
                        </span>
                    )}
                    <button onClick={onLogout} className="nav-logout">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
