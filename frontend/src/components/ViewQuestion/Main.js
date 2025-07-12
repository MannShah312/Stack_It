import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';

// --- Helper Functions for consistent formatting ---
const formatCount = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num || 0;
};

const timeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    return `${days}d ago`;
};

// --- Child Components for a cleaner, more organized structure ---

const VotingComponent = ({ votes, onUpvote, onDownvote }) => (
    <div className="voting-controls">
        <button className="vote-btn" onClick={onUpvote}>▲</button>
        <span className="vote-count">{formatCount(votes)}</span>
        <button className="vote-btn" onClick={onDownvote}>▼</button>
    </div>
);

const UserInfo = ({ user, action, date }) => (
    <div className="user-info-card">
        <p className="user-action">{action} {timeAgo(date)}</p>
        <div className="user-details">
            <img 
                src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=00d9ff&color=121212`} 
                alt={user?.name || 'User'}
                className="user-avatar"
            />
            <p className="user-name">{user || 'Anonymous'}</p>
        </div>
    </div>
);

export default function Main() {
    const { id: questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [answerText, setAnswerText] = useState('');
    const { account } = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/api/question/${questionId}`);
            if (response.status === 200 && response.data && response.data.length > 0) {
                setQuestion(response.data[0]);
                setError(null);
            } else {
                setError("Question not found.");
            }
        } catch (err) {
            console.error("Failed to fetch question:", err);
            setError("An error occurred while fetching the question.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (questionId) {
            fetchQuestion();
        }
    }, [questionId]);

    const handleVote = async (voteType) => {
        try {
            if (voteType === 'up') {
                await API.upvoteQuestion({ id: questionId });
            } else {
                await API.downvoteQuestion({ id: questionId });
            }
            fetchQuestion();
        } catch (err) {
            console.error(`Failed to ${voteType}vote:`, err);
        }
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (!answerText.trim()) return;

        try {
            await axios.post('http://localhost:8000/api/answer', {
                question_id: questionId,
                answer: answerText,
                user: account.username,
            });
            setAnswerText('');
            fetchQuestion();
        } catch (err) {
            console.error("Failed to submit answer:", err);
        }
    };

    if (loading) return <div className="loading-state">Loading Question...</div>;
    if (error) return <div className="error-state">{error}</div>;
    if (!question) return <div className="error-state">Could not load question data.</div>;

    return (
        <div className="question-detail-page">
            <div className="page-header">
                <h1 className="question-main-title">{question.title}</h1>
                <Link to="/add-question" className="ask-question-btn">
                    Ask Question
                </Link>
            </div>
            
            <div className="meta-info">
                <span>Asked {timeAgo(question.created_at)}</span>
                <span>Viewed {formatCount(question.views)} times</span>
            </div>

            <div className="question-body-container">
                <VotingComponent 
                    votes={question.upvotes}
                    onUpvote={() => handleVote('up')}
                    onDownvote={() => handleVote('down')}
                />
                <div className="question-content">
                    <div className="ql-snow">
                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: question.body }} />
                    </div>
                    <div className="tags-and-author">
                        <div className="tags-container">
                            {question.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
                        </div>
                        <UserInfo user={question.user} action="asked" date={question.created_at} />
                    </div>
                </div>
            </div>

            <div className="answers-section">
                <h2 className="answers-header">{question.answerDetails?.length || 0} Answers</h2>
                {question.answerDetails?.map((ans) => (
                    <div key={ans._id} className="answer-container">
                        <VotingComponent votes={ans.upvotes} onUpvote={() => {}} onDownvote={() => {}} />
                        <div className="answer-content">
                           <div className="ql-snow">
                                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: ans.answer }} />
                           </div>
                           <div className="author-info-wrapper">
                                <UserInfo user={ans.user} action="answered" date={ans.created_at} />
                           </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="your-answer-section">
                <h2 className="your-answer-header">Your Answer</h2>
                <form onSubmit={handleAnswerSubmit}>
                    <ReactQuill 
                        theme="snow" 
                        value={answerText} 
                        onChange={setAnswerText}
                        className="answer-editor"
                    />
                    <button type="submit" className="submit-answer-btn">
                        Post Your Answer
                    </button>
                </form>
            </div>
        </div>
    );
}
