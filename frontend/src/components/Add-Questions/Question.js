import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CSS/Question.css'; 
import { TagsInput } from 'react-tag-input-component';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider.js';
import { API } from '../../service/api.js';

export default function Question() {
  const [tags, setTags] = useState([]); 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { account } = useContext(DataContext);

  const navigate = useNavigate();

  const handleQuill = (value) => {
    setBody(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(title!=="" && body!==""){
      const bodyJSON = {
        title: title,
        body: body,
        tags: tags,
        username: account.username
      };

      try {
        const response = await API.newQuestion(bodyJSON);
        console.log('API response:', response);
        if(response.status===201) {
          alert('Question added successfully');
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Title and body are required.');
      setLoading(false);
    }
  }

  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>Be specific and imagine you are asking a question to another person</small>
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  type="text" 
                  placeholder="e.g Is Java an interpreted language?" 
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>Include all the information required to answer your question</small>
                <ReactQuill 
                  value={body} 
                  onChange={handleQuill} 
                  className="react-quill" 
                  theme="snow" 
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>Add up to 5 tags to describe your question topic</small>
                <TagsInput
                  value={tags}
                  onChange={setTags}
                  name="tags"
                  placeholder="Press enter to add new tag"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button 
            disabled={loading} 
            type="button" 
            onClick={handleSubmit} 
            className="button"
          >
            {loading ? 'Adding Question' : 'Add your question'}
          </button>
        </div>
      </div>
    </div>
  );
}
