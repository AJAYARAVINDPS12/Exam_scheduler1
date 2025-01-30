import React, { useState } from 'react';
import './ScheduleExam.css';


const ScheduleExam = ({ user }) => {
    const [examName, setExamName] = useState('');
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle exam scheduling logic here (e.g., API call)
        console.log("Exam scheduled:", { examName, subject, date, time, description });
        // Reset the form after submission (optional)
        setExamName('');
        setSubject('');
        setDate('');
        setTime('');
        setDescription('');
        alert("Exam Scheduled!");
    };

    return (
        <div className="schedule-exam-container">
            <div className="schedule-exam-box">
                <h2>Schedule Exam</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="examName">Exam Name</label>
                        <input type="text" id="examName" value={examName} onChange={(e) => setExamName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="schedule-button">Schedule</button>
                </form>
            </div>
        </div>
    );
};

export default ScheduleExam; 