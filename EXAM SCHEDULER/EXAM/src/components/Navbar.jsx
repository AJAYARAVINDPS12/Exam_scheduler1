import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling
import LOGO from '../assets/LOGO.gif'; // Main navbar GIF logo
import HOME from '../assets/HOME.gif'; // Home button logo
import SCHEDULE from '../assets/SCHEDULE.gif'; // Schedule button logo
import HISTORY from '../assets/HISTORY.gif'; // History button logo
import SEARCH from '../assets/SEARCH.gif'; // Search button logo
import NOTIFICATION from '../assets/NOTIFICATION.gif'; // Notification button logo
import MYACCOUNT from '../assets/MYACCOUNT.gif'; // My Account button logo
import LOGOUT from '../assets/LOGOUT.gif'; // Logout button logo

const Navbar = ({ onLogout, user }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Main Logo */}
                <Link to="/" className="navbar-logo">
                    <img src={LOGO} alt="Exam Scheduler Logo" className="logo-image" />
                </Link>
                <Link to="/" className="navbar-title">Exam Scheduler</Link>
                <div className="nav-buttons-container">
                    {/* Home Button */}
                    <Link to="/" className="nav-button">
                        <img src={HOME} alt="Home" className="button-logo" />
                        <span>Home</span>
                    </Link>
                    {/* Schedule Exam Button */}
                    <Link to="/schedule" className="nav-button">
                        <img src={SCHEDULE} alt="Schedule Exam" className="button-logo" />
                        <span>Schedule</span>
                    </Link>
                    {/* History Button */}
                    <Link to="/history" className="nav-button">
                        <img src={HISTORY} alt="History" className="button-logo" />
                        <span>History</span>
                    </Link>
                    {/* Search Button */}
                    <Link to="/search" className="nav-button">
                        <img src={SEARCH} alt="Search" className="button-logo" />
                        <span>Search</span>
                    </Link>
                    {/* Notifications Button */}
                    <Link to="/notifications" className="nav-button">
                        <img src={NOTIFICATION} alt="Notifications" className="button-logo" />
                        <span>Notifications</span>
                    </Link>
                    {/* My Account Button */}
                    <Link to="/account" className="nav-button">
                        <img src={MYACCOUNT} alt="My Account" className="button-logo" />
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
                <img src={LOGOUT} alt="User Icon" className="user-logout" />
                 
                    
                    <button onClick={onLogout} className="nav-logout">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
