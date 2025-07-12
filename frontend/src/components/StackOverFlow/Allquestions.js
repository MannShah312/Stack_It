import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Allquestions.css';


const formatCount = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
};

const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
};

export default function Allquestions({ question }) {
    return (
        <div className="question-item-card">
            <div className="question-stats">
                <div className="stat-item">
                    <span>{formatCount(question.votes || 0)}</span>
                    <p>Votes</p>
                </div>
                <div className={`stat-item ${question.answerDetails?.length > 0 ? 'answered' : ''}`}>
                    <span>{formatCount(question.answerDetails?.length || 0)}</span>
                    <p>Answers</p>
                </div>
                <div className="stat-item">
                    <span>{formatCount(question.views || 0)}</span>
                    <p>Views</p>
                </div>
            </div>
            <div className="question-summary">
                <Link to={`/question?q=${question._id}`} className="question-title-link">
                    <h3>{question.title}</h3>
                </Link>
                <div className="question-meta">
                    <div className="question-tags">
                        {question.tags.map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                    <div className="question-author-info">
                        <img 
                            src={question.user?.profilePicture || `https://ui-avatars.com/api/?name=${question.user?.name}&background=3f51b5&color=fff`} 
                            alt={question.user?.name} 
                            className="author-avatar"
                        />
                        <p>
                            <span className="author-name">{question.user?.name || 'Anonymous'}</span> asked {timeAgo(question.created_at)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
