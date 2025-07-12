import React, { useEffect, useState } from 'react';
import './CSS/index.css';
import Sidebar from "./Sidebar";
import Main from "./Main";
import { API } from "../../service/api";

export default function Index() {
  const [question, setQuestion] = useState([])

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await API.allQuestions();
        if (response.isSuccess) {
          console.log(response.data);
          setQuestion(response.data.reverse());
        }
      } catch (error) {
        console.error(error);
      }
    }
    getQuestions();
  }, []);

  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <Main question = { question }/>
      </div>
    </div>
  );
}
