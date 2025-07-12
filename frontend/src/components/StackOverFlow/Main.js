import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Allquestions from './Allquestions';
import './CSS/Main.css';


const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);


export default function Main({ questions, loading, error }) {
    const [activeFilter, setActiveFilter] = useState('Newest');
    const filters = ['Newest', 'Active', 'Unanswered', 'Score', 'Frequently Asked'];

    return (
        <main className="main-content">
            <div className="main-header">
                <h1>All Questions</h1>
                <Link to="/ask-question" className="ask-question-btn">
                    Ask Question
                </Link>
            </div>

            <div className="main-controls">
                <p className="question-count">{questions.length} questions</p>
                <div className="main-filters">
                    {filters.map(filter => (
                        <button 
                            key={filter} 
                            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                    <button className="filter-btn more-filters-btn">
                        <FilterIcon />
                        Filter
                    </button>
                </div>
            </div>

            <div className="questions-list">
                {loading && <p>Loading questions...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && questions.map((question) => (
                    <Allquestions key={question._id} question={question} />
                ))}
            </div>
        </main>
    );
}
