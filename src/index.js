import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './pages/App';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />

        </Routes>
      </Router>
  // </React.StrictMode>
);
