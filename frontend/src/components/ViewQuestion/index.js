import React from 'react';
import '../StackOverFlow/CSS/index.css';
// import Sidebar from "../StackOverFlow/Sidebar";
import Main from "./Main";

export default function Index() {
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        {/* <Sidebar /> */}
        <Main />
      </div>
    </div>
  );
}
