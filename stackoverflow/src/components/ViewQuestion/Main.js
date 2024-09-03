import { Bookmark, History } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import './index.css'
import ReactQuill from 'react-quill'

export default function Main() {
  const [show, setShow] = useState(false);
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">
            This is question title
          </h2>
          <Link to="/add-question">
            <button>Ask question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>Timestamp</p>
            <p>Active<span>today</span></p>
            <p>Viewd<span>69 times</span></p>
          </div>
        </div>
        <div className="all-questions">
          <div className='all-questions-container'>
            <div className="all-questions-left">
              <div className='all-options'>
                <p className="arrow">🔺</p>
                <p className="arrow">0</p>
                <p className="arrow">🔻</p>
                <Bookmark />
                <History />
              </div>
            </div>
            <div className='question-answer'>
              <p>This is que body</p>
              <div className="author">
                <small>asked "timestamp"</small>
                <div className="auth-details">
                  <Avatar />
                  <p>Tina ki bahen</p>
                </div>
              </div>
              <div className="comments">
                <div className='comment'>
                  <p>This is comment - <span>Username</span><small>timestamp</small></p>
                </div>
                <p onClick={() => setShow(!show)} style={{cursor: "pointer"}}>Add a comment</p>
                {
                  show && (<div className="title">
                    <textarea type="text" placeholder="add your comment" style={{amrgin: "5px 6px", padding: "10px", border: "1px solid rgba(0,0,0,0.2", borderRadius: "3px"}} rows={5}></textarea>
                    <button style={{maxWidth: "fit-content", marginTop: "10px"}}>Add comment</button>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className="all-questions" style={{flexDirection: "column",}}>
          <p style={{marginBottom: "20px", fontsize: "1.1rem", fontWeight: "300",}}>No of answers</p>
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className='all-options'>
                <p className="arrow">🔺</p>
                <p className="arrow">0</p>
                <p className="arrow">🔻</p>
                <Bookmark />
                <History />
              </div>
            </div>
            <div className='question-answer'>
              <p>This is ans body</p>
              <div className="author">
                <small>asked "timestamp"</small>
                <div className="auth-details">
                  <Avatar />
                  <p>Tina ki bahen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-answer" >
            <h3 style={{ fontSize: "22px", margin: "10px 0", fontWeight: "400",}}>your answer</h3>
            <ReactQuill className="react-quill" theme="snow" style={{height: "200px",}} />
        </div>
        <button style={{ marginTop: "50px", maxWidth: "fit-content",}}>Post your answer</button>
      </div>
    </div>
  )
}
