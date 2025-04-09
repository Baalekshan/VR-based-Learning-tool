import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./frontend/SignUp";
import Login from "./frontend/Login";
import SelectionPage from "./frontend/SelectionPage";
import Asd from "./frontend/Asd";
import ID from "./frontend/ID";
import ProgressTrackingAsd from "./frontend/ProgressTrackingAsd";
import ProgressTrackingID from "./frontend/ProgressTrackingID";
import ProfilePage from "./frontend/Profile";
import CommunicationQuiz from "./frontend/CommunicationQuiz";
import ObjectQuiz from "./frontend/ObjectQuiz";
// @ts-ignore
import TrafficScene from "./frontend/RoadCross";
import VRGroceryLanding from "./frontend/VRGroceryLanding";
// @ts-ignore
import VRGroceryShopping from "./frontend/VRGroceryShopping";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vr-grocery" element={<VRGroceryLanding />} />
        <Route path="/shopping" element={<VRGroceryShopping />} />

        {/* Protected Routes */}
        <Route path="/selectionpage" element={<PrivateRoute element={<SelectionPage />} />} />
        <Route path="/asdpage" element={<PrivateRoute element={<Asd />} />} />
        <Route path="/idpage" element={<PrivateRoute element={<ID />} />} />
        <Route path="/progress-track-asd" element={<PrivateRoute element={<ProgressTrackingAsd />} />} />
        <Route path="/progress-track-id" element={<PrivateRoute element={<ProgressTrackingID />} />} />
        <Route path="/user-profile" element={<PrivateRoute element={<ProfilePage />} />} />
        <Route path="/communication-quiz" element={<PrivateRoute element={<CommunicationQuiz />} />} />
        <Route path="/object-quiz" element={<PrivateRoute element={<ObjectQuiz />} />} />
        <Route path="/road-crossing" element={<PrivateRoute element={<TrafficScene />} />} />
      </Routes>
    </Router>
  );
}

export default App;
