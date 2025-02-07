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
        {/* Left Side - VR Avatar */}
        <div className="left-section">
          <img src={userAvatar} alt="User Avatar" className="user-avatar-large" />
        </div>

        
        <div className="right-section">
          {/* Placeholder for chart */}
         
        </div>
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

        /* Close Button */
        .close-button {
          position: absolute;
          top: 20px;
          left: 20px;
          cursor: pointer;
          font-size: 28px;
          color: black;
          widht: 10px;
        }

        .user-avatar {
          position: absolute;
          top: 20px;
          left: 60px;
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
          gap: 100px; 
          margin-top: 40px;
          width: 90%;
        }

        .left-section {
          display: flex;
          justify-content: flex-start;
          width: 50%;
        }

        .user-avatar-large {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 4px solid white;
        }

        .right-section {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
            gap: 20px;
          }

          .left-section, .right-section {
            width: 100%;
            justify-content: center;
          }

          .user-avatar-large {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressTrackingID;