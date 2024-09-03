import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import StackOverflow from './components/StackOverFlow/index.js';
import AddQuestion from './components/Add-Questions/Question.js';
import ViewQuestion from "./components/ViewQuestion/index.js";
import Auth from './components/Auth';
import DataProvider from './context/DataProvider.js';

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/login' />;
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Auth isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route index element={<StackOverflow />} />
            </Route>
            <Route path='/add-question' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route index element={<AddQuestion />} />
            </Route>
            <Route path='/question' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route index element={<ViewQuestion />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
