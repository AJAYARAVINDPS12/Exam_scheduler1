import React, { useState } from 'react';
import './SearchExam.css';


const SearchExam = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false); // State for no results message

    const handleSearch = async () => {
        if (!searchTerm.trim()) { // Check for empty search term
            setSearchResults([]);
            setNoResults(false);
            return;
        }

        try {
            // Replace this with your actual API call to fetch exam data
            const mockExams = [
                { id: 1, name: 'Midterm Exam', subject: 'Mathematics', date: '2024-03-15', time: '10:00 AM' },
                { id: 2, name: 'Final Exam', subject: 'Physics', date: '2024-03-22', time: '2:00 PM' },
                { id: 3, name: 'Quiz 1', subject: 'Chemistry', date: '2024-03-08', time: '11:00 AM' },
                { id: 4, name: 'Another Exam', subject: 'Mathematics', date: '2024-04-10', time: '1:00 PM' },
            ];

            const results = mockExams.filter(exam =>
                exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setSearchResults(results);
            setNoResults(results.length === 0);

        } catch (error) {
            console.error("Error fetching exams:", error);
            setSearchResults([]);
            setNoResults(true);
            alert("Error fetching exams.");
        }
    };

    return (
        <div className="search-exam-container">
            <div className="search-exam-box">
                <h2>Search Exams</h2>
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Search by exam name or subject"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>

                {searchResults.length > 0 && (
                    <ul className="search-results">
                        {searchResults.map((exam) => (
                            <li key={exam.id} className="search-result-item">
                                <h3>{exam.name}</h3>
                                <p>Subject: {exam.subject}</p>
                                <p>Date: {exam.date}, Time: {exam.time}</p>
                            </li>
                        ))}
                    </ul>
                )}
                {noResults && <p className="no-results-message">No exams found.</p>} {/* Display message if no results */}
            </div>
        </div>
    );
};

export default SearchExam;