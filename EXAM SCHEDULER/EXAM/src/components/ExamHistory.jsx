import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API request
import './ExamHistory.css';

const ExamHistory = ({ user }) => {
    const [pastExams, setPastExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScheduledExams = async () => {
            if (!user) return;
            
            try {
                const response = await axios.get('http://localhost:5001/exams', {
                    params: { createdBy: user.email }
                });

                // Get only past exams (before today's date)
                const today = new Date().toISOString().split("T")[0];
                const filteredExams = response.data.filter(exam => exam.date < today);

                setPastExams(filteredExams);
            } catch (err) {
                setError(err);
                console.error("Error fetching exam history:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchScheduledExams();
    }, [user]);

    if (!user) {
        return <div className="no-user">Please login to see your Exam History</div>;
    }

    if (loading) {
        return <div className="loading-message">Loading Exam History...</div>;
    }

    if (error) {
        return <div className="error-message">Error loading Exam History.</div>;
    }

    return (
        <div className="history-container">
            <div className="history-content">
                <h1>Past Exam History</h1>
                {pastExams.length === 0 ? (
                    <p className="no-exams-message">No past exams found.</p>
                ) : (
                    <div className="exam-list">
                        {pastExams.map((exam, index) => (
                            <div key={index} className="exam-item">
                                <h3>{exam.examName}</h3>
                                <p><span>Subject:</span> {exam.subject}</p>
                                <p><span>Date:</span> {exam.date}, <span>Time:</span> {exam.time}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamHistory;
