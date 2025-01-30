import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ user }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to track the expanded notification
    const [expandedNotificationId, setExpandedNotificationId] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Replace with your actual API call to fetch notifications for the user
                const mockNotifications = [
                    { id: 1, message: 'Your Midterm Exam is scheduled for March 15th at 10:00 AM.', type: 'info', details: 'The exam will cover chapters 1-5 of the syllabus, and it will be held in Room 101.' },
                    { id: 2, message: 'The deadline for the Physics assignment is approaching.', type: 'warning', details: 'Submit the assignment by March 10th to avoid penalties. Remember to include all the necessary diagrams.' },
                    { id: 3, message: 'New study materials have been uploaded for Chemistry.', type: 'info', details: 'You can access the materials in the course portal under the "Resources" section. The material includes notes, practice questions, and past exams.' },
                ];

                await new Promise(resolve => setTimeout(resolve, 500));

                setNotifications(mockNotifications);
            } catch (err) {
                setError(err);
                console.error("Error fetching notifications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user]);

    const handleClearNotifications = async () => {
        setNotifications([]);
        alert("Notifications cleared!");
    };

    const handleDismissNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    const handleToggleDetails = (id) => {
        // Toggle the expanded notification
        setExpandedNotificationId(prevId => (prevId === id ? null : id));
    };

    if (loading) {
        return <div className="loading-message">Loading notifications...</div>;
    }

    if (error) {
        return <div className="error-message">Error loading notifications.</div>;
    }

    if (!notifications || notifications.length === 0) {
        return (
            <div className="notifications-container">
                <div className="notifications-box">
                    <h2 className="notifications-header">Notifications</h2>
                    <div className="no-notifications">No new notifications.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="notifications-container">
            <div className="notifications-box">
                <h2 className="notifications-header">Notifications ({notifications.length})</h2>
                <button className="clear-notifications-button" onClick={handleClearNotifications}>
                    Clear All Notifications
                </button>
                <ul className="notification-list">
                    {notifications.map((notification) => (
                        <li key={notification.id} className={`notification-item ${notification.type}`}>
                            <div className="notification-icon">
                                {notification.type === 'info' ? 'ℹ️' : '⚠️'}
                            </div>
                            <div 
                                className="notification-message" 
                                onClick={() => handleToggleDetails(notification.id)}
                            >
                                {notification.message}
                            </div>
                            <button 
                                className="dismiss-button" 
                                onClick={() => handleDismissNotification(notification.id)}
                            >
                                X
                            </button>
                            {expandedNotificationId === notification.id && (
                                <div className="notification-details">
                                    <h4>Details:</h4>
                                    <p>{notification.details}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notification;
