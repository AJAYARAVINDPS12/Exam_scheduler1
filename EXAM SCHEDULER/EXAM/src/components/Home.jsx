import React, { useState, useEffect } from 'react';
import './Home.css';
import HomePageImage from '../assets/HomePage.gif'; // Correctly import the image

const Home = ({ user }) => {
    const [scheduledExams, setScheduledExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null); // State to track selected exam
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScheduledExams = async () => {
            try {
                const mockScheduledExams = [
                    { id: 1, name: 'Midterm Exam', subject: 'Mathematics', date: '2024-03-15', time: '10:00 AM' },
                    { id: 2, name: 'Final Exam', subject: 'Physics', date: '2026-03-22', time: '2:00 PM' },
                    { id: 3, name: 'Quiz 1', subject: 'Chemistry', date: '2023-03-08', time: '11:00 AM' },
                    { id: 4, name: 'Another Exam', subject: 'Biology', date: '2022-01-10', time: '1:00 PM' },
                ];

                await new Promise((resolve) => setTimeout(resolve, 500));
                setScheduledExams(
                    mockScheduledExams.filter((exam) => new Date(exam.date) >= new Date()) // Filter only current and upcoming exams
                );
            } catch (err) {
                setError(err);
                console.error('Error fetching scheduled exams:', err);
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

    const handleExamClick = (exam) => {
        setSelectedExam(exam); // Set the clicked exam as selected
    };

    const handleBack = () => {
        setSelectedExam(null); // Clear the selected exam to go back to the list
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
        // Detailed view for a selected exam
        return (
            <div className="home-container">
                <div className="home-content">
                    <h1>Exam Details</h1>
                    <div className="exam-details">
                        <h2>{selectedExam.name}</h2>
                        <p>
                            <span>Subject:</span> {selectedExam.subject}
                        </p>
                        <p>
                            <span>Date:</span> {selectedExam.date}
                        </p>
                        <p>
                            <span>Time:</span> {selectedExam.time}
                        </p>
                        <button className="back-button" onClick={handleBack}>
                            Back to Exams
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (scheduledExams.length === 0) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <h1>Your Upcoming Exams</h1>
                    <p className="no-exams-message">No upcoming exams scheduled.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Your Upcoming Exams</h1>
                <div className="exam-list">
                    {scheduledExams.map((exam) => (
                        <div
                            key={exam.id}
                            className="exam-item clickable" // Add a class to indicate clickable
                            onClick={() => handleExamClick(exam)} // Click handler for each exam
                        >
                            <h3>{exam.name}</h3>
                            <p>
                                <span>Subject:</span> {exam.subject}
                            </p>
                            <p>
                                <span>Date:</span> {exam.date}, <span>Time:</span> {exam.time}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="image-container">
                <img src={HomePageImage} alt="Decorative" />
            </div>
        </div>
    );
};

export default Home;
