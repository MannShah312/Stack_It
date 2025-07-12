import { Avatar } from "@mui/material";
import React from "react";
import "./CSS/Allquestions.css";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser'  

function AllQuestions({question}) {
  console.log("AllQuestions component rendered");
  console.log("Question prop:", question);

  console.log(question?.tags[0]);
  let tags = JSON.parse(question?.tags[0]);
  function truncate(str, n) {
    return str?.length > n ? str.substring(0,n-1)+"..." : str;
  }
  
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="all-option">
              <p>{question?.answerDetails?.length}</p>
              <span>answers</span>
            </div>
            <div className="all-option">
              <small>2 views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question?q=${question?._id}`}>{question?.title}</Link>
          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>{ReactHtmlParser(truncate(question?.body,200))}</div>
          </div>
          
          <div
            style={{
              display: "flex",
            }}
          >
            {tags.map((_tag) => (
              <p
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#007cd446",
                  borderRadius: "3px",
                }}
              >
                {_tag}
              </p>
            ))}
          </div>
          <div className="author">
            <small>{new Date(question?.created_at).toLocaleString()}</small>
            <div className="auth-details">
              <Avatar src={question?.user?.photo}/>
              <p>{question?.user?.displayName ? question?.user?.displayName : String(question?.user?.email).split('a')[0]} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;