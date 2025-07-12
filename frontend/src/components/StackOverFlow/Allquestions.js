import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Allquestions.css";

const formatCount = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
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
          <span>{formatCount(question.upvotes || 0)}</span>
          <p>Likes</p>
        </div>
        <div
          className={`stat-item ${
            question.answerDetails?.length > 0 ? "answered" : ""
          }`}
        >
          <span>{formatCount(question.downvotes || 0)}</span>
          <p>Dislikes</p>
        </div>
        <div className="stat-item">
          <span>{formatCount(question.answer || 0)}</span>
          <p>Answers</p>
        </div>
      </div>
      <div className="question-summary">
        <Link to={`/question/${question._id}`} className="question-title-link">
          <h3>{question.title}</h3>
        </Link>
        <div>
          <p className="question-body">
            {question.body.replace(/<[^>]*>?/gm, "")}
          </p>
        </div>
        <div className="question-meta">
          <div className="question-tags">
            {question.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="question-author-info">
            <img
              src={
                question.user?.profilePicture ||
                `https://ui-avatars.com/api/?name=${question?.user}&background=3f51b5&color=fff`
              }
              alt={question?.user}
              className="author-avatar"
            />
            <p>
              <span className="author-name">
                {question?.user || "Anonymous"}
              </span>{" "}
              asked {timeAgo(question.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
