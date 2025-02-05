import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './frontend/SignUp'
import Login from './frontend/Login'
import SelectionPage from './frontend/SelectionPage';
import Asd from './frontend/Asd';
import ID from './frontend/ID';

function App() {
  return(
    <Router>
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="selectionpage" element={<SelectionPage />} />
      <Route path="asdpage" element={<Asd />} />
      <Route path="idpage" element={<ID />} />
      </Routes>
    </Router>
  )
}

export default App