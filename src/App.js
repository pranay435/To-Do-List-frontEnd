import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useContext } from 'react';
import Home from './Home';
import History from './history';
import Login from './Login';
import './Home.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

  );
}

export default App;
