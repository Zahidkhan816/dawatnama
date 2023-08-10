import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Form from './Components/Form';
import MeraigeHall from './Components/MeraigeHall';
import Foods from './Components/Foods';
import Photography from './Components/Photography';
import CompareService from './Components/CompareService';
import Login from './Components/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={loggedIn ? <Form /> : <Login setLoggedIn={setLoggedIn} />} />
        <Route path="/MeraigeHall" element={<MeraigeHall />} />
        <Route path="/Food" element={<Foods />} />
        <Route path="/Photography" element={<Photography />} />
        <Route path="/Compare" element={<CompareService />} />
      </Routes>
    </div>
  );
}

export default App;
