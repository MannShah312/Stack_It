import React, { useEffect, useState } from 'react';
import './CSS/index.css';
import Main from "./Main";
import { API } from "../../service/api";

export default function Index() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuestions() {
      try {
        setLoading(true);
        const response = await API.allQuestions();
        if (response.isSuccess) {
          setQuestions(response.data.reverse());
        } else {
           setError("Failed to fetch questions.");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching questions.");
      } finally {
        setLoading(false);
      }
    }
    getQuestions();
  }, []);

  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Main questions={questions} loading={loading} error={error} />
      </div>
    </div>
  );
}
