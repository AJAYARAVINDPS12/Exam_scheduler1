// ExamHistory.jsx (New component)
import React, { useState, useEffect } from 'react';
import './ExamHistory.css';


const ExamHistory = ({ user }) => {
    const [scheduledExams, setScheduledExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScheduledExams = async () => {
            try {
                const mockScheduledExams = [
                    { id: 1, name: 'Midterm Exam', subject: 'Mathematics', date: '2024-03-15', time: '10:00 AM' },
                    { id: 2, name: 'Final Exam', subject: 'Physics', date: '2024-03-22', time: '2:00 PM' },
                    { id: 3, name: 'Quiz 1', subject: 'Chemistry', date: '2023-03-08', time: '11:00 AM' },
                    { id: 4, name: 'Another Exam', subject: 'Biology', date: '2022-01-10', time: '1:00 PM' },
                ];
                await new Promise(resolve => setTimeout(resolve, 500));
                setScheduledExams(mockScheduledExams);
            } catch (err) {
                setError(err);
                console.error("Error fetching scheduled exams:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchScheduledExams();
        } else {
            setLoading(false);
        }
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
                <h1>Exam History</h1>
                {scheduledExams.length === 0 ? (
                    <p className="no-exams-message">No exams found.</p>
                ) : (
                    <div className="exam-list">
                        {scheduledExams.map(exam => (
                            <div key={exam.id} className="exam-item">
                                <h3>{exam.name}</h3>
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