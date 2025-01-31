import { useState, useEffect } from "react";
import '../components/Notification.css';

const Notifications = ({ userEmail }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userEmail) return;

        fetch(`http://localhost:5001/notifications?createdBy=${userEmail}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched notifications:", data);
                setNotifications(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching notifications:", error);
                setError("Failed to load notifications.");
                setLoading(false);
            });
    }, [userEmail]);

    const handleDismiss = (id) => {
        setNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="notifications-container">
            <div className="notifications-box">
                <h2 className="notifications-header">📢 Notifications</h2>

                {loading && <p className="loading-message">⏳ Loading notifications...</p>}
                {error && <p className="error-message">❌ {error}</p>}

                {notifications.length > 0 ? (
                    <>
                        <button className="clear-notifications-button" onClick={handleClearAll}>
                            Clear All Notifications
                        </button>
                        <ul className="notification-list">
                            {notifications.map((notification) => (
                                <li key={notification.id} className={`notification-item ${notification.type || ''}`}>
                                    <span className="notification-message">{notification.message}</span>
                                    <button className="dismiss-button" onClick={() => handleDismiss(notification.id)}>✖</button>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="no-notifications">✅ No upcoming exams.</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;
