import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ScheduleExam from './components/ScheduleExam';
import UserAccount from './components/UserAccount';
import SearchExam from './components/SearchExam';
import Notification from './components/Notification';
import Navbar from './components/Navbar';
import ExamHistory from './components/ExamHistory';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

    const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Navbar onLogout={handleLogout} user={user} />}
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
          <Route path="/" element={isLoggedIn ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/schedule" element={isLoggedIn ? <ScheduleExam user={user} /> : <Navigate to="/login" />} />
          <Route path="/account" element={isLoggedIn ? <UserAccount user={user} /> : <Navigate to="/login" />} />
          <Route path="/search" element={isLoggedIn ? <SearchExam user={user} /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={isLoggedIn ? <Notification user={user} /> : <Navigate to="/login" />} />
          <Route path="/history" element={isLoggedIn ? <ExamHistory user={user} /> : <Navigate to="/login" />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;