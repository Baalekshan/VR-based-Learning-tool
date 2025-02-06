import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './frontend/SignUp'
import Login from './frontend/Login'
import SelectionPage from './frontend/SelectionPage';
import Asd from './frontend/Asd';
import ID from './frontend/ID';
import ProgressTrackingAsd from './frontend/ProgressTrackingAsd';
import ProgressTrackingID from './frontend/ProgressTrackingID';
import ProfilePage from './frontend/Profile';
import CommunicationQuiz from './frontend/CommunicationQuiz';
import ObjectQuiz from './frontend/ObjectQuiz';

function App() {
  return(
    <Router>
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="selectionpage" element={<SelectionPage />} />
      <Route path="asdpage" element={<Asd />} />
      <Route path="idpage" element={<ID />} />
      <Route path="progress-track-asd" element={<ProgressTrackingAsd />} />
      <Route path="progress-track-id" element={<ProgressTrackingID />} />
      <Route path="user-profile" element={<ProfilePage />} />
      <Route path="communication-quiz" element={<CommunicationQuiz />} />
      <Route path="object-quiz" element={<ObjectQuiz />} />
      </Routes>
    </Router>
  )
}

export default App