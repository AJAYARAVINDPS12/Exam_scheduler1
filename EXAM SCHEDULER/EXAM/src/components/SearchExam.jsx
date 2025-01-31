import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import './SearchExam.css';

const SearchExam = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false); // State for no results message

    const handleSearch = async () => {
        if (!searchTerm.trim()) { // Check for empty search term
            setSearchResults([]);
            setNoResults(false);
            return;
        }

        if (!user || !user.email) {
            alert("Please log in first!");
            return;
        }

        try {
            const response = await axios.get('http://localhost:5001/exams', {
                params: { createdBy: user.email }
            });

            const exams = response.data;
            const results = exams.filter(exam =>
                exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                            <li key={exam._id} className="search-result-item">
                                <h3>{exam.examName}</h3>
                                <p>Subject: {exam.subject}</p>
                                <p>Date: {exam.date}, Time: {exam.time}</p>
                                {exam.description && <p>Description: {exam.description}</p>}
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
