import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import HomePageImage from '../assets/HomePage.gif';

const Home = ({ user }) => {
    const [scheduledExams, setScheduledExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScheduledExams = async () => {
            if (!user || !user.email) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5001/exams?createdBy=${user.email}`);
                
                // Get the current date in YYYY-MM-DD format
                const currentDate = new Date().toISOString().split('T')[0];

                // Filter exams that are upcoming or today
                const upcomingExams = response.data.filter(exam => exam.date >= currentDate);

                setScheduledExams(upcomingExams);
            } catch (err) {
                setError(err);
                console.error('Error fetching scheduled exams:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchScheduledExams();
    }, [user]);

    const handleExamClick = (exam) => {
        setSelectedExam(exam);
    };

    const handleBack = () => {
        setSelectedExam(null);
    };

    if (!user) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <h1>Welcome to the Exam Scheduler</h1>
                    <p className="home-description">Please log in to see your scheduled exams.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="loading-message">Loading scheduled exams...</div>;
    }

    if (error) {
        return <div className="error-message">Error loading scheduled exams.</div>;
    }

    if (selectedExam) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <h1>Exam Details</h1>
                    <div className="exam-details">
                        <h2>{selectedExam.examName}</h2>
                        <p><span>Subject:</span> {selectedExam.subject}</p>
                        <p><span>Date:</span> {selectedExam.date}</p>
                        <p><span>Time:</span> {selectedExam.time}</p>
                        <button className="back-button" onClick={handleBack}>
                            Back to Exams
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Your Upcoming Exams</h1>
                {scheduledExams.length === 0 ? (
                    <p className="no-exams-message">No upcoming exams scheduled.</p>
                ) : (
                    <div className="exam-list">
                        {scheduledExams.map((exam) => (
                            <div key={exam._id} className="exam-item clickable" onClick={() => handleExamClick(exam)}>
                                <h3>{exam.examName}</h3>
                                <p><span>Subject:</span> {exam.subject}</p>
                                <p><span>Date:</span> {exam.date}, <span>Time:</span> {exam.time}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="image-container">
                <img src={HomePageImage} alt="Decorative" />
            </div>
        </div>
    );
};

export default Home;
    