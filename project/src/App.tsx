import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './frontend/SignUp'
import Login from './frontend/Login'
import SelectionPage from './frontend/SelectionPage';

function App() {
  return(
    <Router>
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="selectionpage" element={<SelectionPage />} />
      </Routes>
    </Router>
  )
}

export default App