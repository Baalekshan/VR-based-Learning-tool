import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/backgroundID.jpg";
import avatarIcon from "../assets/avatar.png";
import userAvatar from "../assets/avatar.png";
import subBg from "../assets/subBg.png";


const ProgressTrackingID: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="progress-container">
      {/* Background Image */}
      <img src={bgImage} alt="Background" className="background-image" />
      <img src={subBg} alt="Background" className="subBackground-image" />

      {/* User Avatar Section */}
      <div className="user-avatar">
        <img src={avatarIcon} alt="User Avatar" className="avatar" />
        <span>Hey! your name</span>
      </div>

      {/* Main Title */}
      <h1 className="title">PROGRESS TRACKING</h1>

      {/* Content Layout */}
      <div className="content-wrapper">
        {/* Left Side - User Avatar */}
        <div className="left-section">
          <img src={userAvatar} alt="User Avatar" className="user-avatar-large" />
          
        </div>
        <button className="home-button" onClick={() => navigate("/idpage")}>
            HOME
          </button>

        {/* Right Side - Progress Chart */}
        
      </div>

      {/* Styles */}
      <style>{`
        .progress-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-align: center;
        }

        .background-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
          .subBackground-image {
          position: absolute;
          width: 70%;
          height: 80%;
          object-fit: cover;
          z-index: -1;
          opacity: 0.8;
          border-radius: 50px;
          border: 1px solid white;
          }

        .user-avatar {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          width: 200px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        .title {
          font-size: 32px;
          margin-top: -80px;
          font-family: "Londrina Solid", serif;
          font-weight: 400;
          font-style: normal;
        }

        .content-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 50px;
          margin-top: 40px;
        }

        .left-section {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .user-avatar-large {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 4px solid white;
          margin-right: 550px;
          
        }

        .home-button {
          background-color: #6200ea;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          margin-top: 15px;
          margin-left: -20px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .home-button:hover {
          background-color: #4b00b3;
        }

        .right-section {
          display: flex;
          align-items: center;
        }

        

        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
            gap: 20px;
          }

          .progress-chart {
            width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressTrackingID;