import React from "react";
import {Navigate,  useNavigate } from "react-router-dom";
import bgImage from "../assets/background.png";
import vrCharacter from "../assets/vr-character.png";
import avatarIcon from "../assets/avatar.png";
import videoIcon from "../assets/video-icon.png";
import progressIcon from "../assets/progress-icon.png";
import communicationImg from "../assets/communication.png";
import cognitiveImg from "../assets/cognitive.png";
import socialImg from "../assets/social.png";
import sensoryImg from "../assets/sensory.png";


const Asd: React.FC = () => {
  const navigate = useNavigate();
  const handleProgressTrackingAsd = () => {
    navigate("/progress-track-asd");
  }
  const handleProfile = () => {
    navigate("/user-profile");
  }

  return (
    <div className="home-container">
      {/* Background Image */}
      <img src={bgImage} alt="Background" className="background-image" />

      {/* User Avatar Section */}
      <div className="user-avatar">
        <img src={avatarIcon} alt="User Avatar" className="avatar" onClick={handleProfile} />
        <span>Hey! your name</span>
      </div>

      {/* Main Title */}
      <h1 className="title">
        <span className="gradient-text">VR Learning Adventures</span>
        <br />
        <span className="radley-regular">Empowering Kids with ASD</span>
      </h1>

      {/* Feature Buttons */}
      <div className="feature-buttons">
        <div className="feature-card">
          <img src={videoIcon} alt="Learn Videos" />
          <span>Learn through videos</span>
        </div>
        <div className="feature-card">
          <img src={progressIcon} alt="Progress Tracking" />
          <span onClick={handleProgressTrackingAsd}>Progress Tracking</span>
        </div>
      </div>

      {/* VR Character & Skill Cards */}
      <div className="content-wrapper">
        {/* Left Skill Cards */}
        <div className="skill-cards left">
          <div className="skill-card">
            <img src={communicationImg} alt="Communication Skills" />
            <span>COMMUNICATION SKILLS</span>
          </div>
          <div className="skill-card">
            <img src={cognitiveImg} alt="Cognitive Skills" />
            <span>COGNITIVE SKILLS</span>
          </div>
        </div>

        {/* VR Character */}
        <img src={vrCharacter} alt="VR Character" className="vr-character" />

        {/* Right Skill Cards */}
        <div className="skill-cards right">
          <div className="skill-card">
            <img src={socialImg} alt="Daily Life & Social Interaction" />
            <span>DAILY LIFE AND SOCIAL INTERACTION</span>
          </div>
          <div className="skill-card">
            <img src={sensoryImg} alt="Sensory Regulation" />
            <span>SENSORY REGULATION</span>
          </div>
        </div>
      </div>

      

      {/* Styles */}
      <style>{`
        .home-container {
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
          opacity: 0.9;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .user-avatar {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
        }

        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
          .avatar:hover{
          transform: scale(1.2);
            transition: box-shadow 0.3s ease;
            }

        .title {
          font-size: 3px;
          font-weight: bold;
          margin-top: 20px;
          
        }


        .gradient-text {
          background: linear-gradient(90deg, #7b5cff, #ff6464);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: "Ranchers", serif;
          font-weight: 500;
          font-style: normal;
          font-size: 55px;
        
          
        }
          .radley-regular{
          font-family: "Radley", serif;
          font-weight: 200;
          font-style: normal;
          font-size: 28px;
          
      }

        .feature-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 20px 0;
        }

        .feature-card {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 10px 20px;
          gap: 10px;
          font-size: 16px;
          font-weight: bold;
          border: 2px solid #FF7F50;
        }
          .feature-card:hover{
            transform: scale(1.1);
            transition: transform 0.8s ease;
            text-decoration: bold;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 4);
            }

        .feature-card img {
          width: 30px;
          height: 30px;
        }

        .content-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 130px;
          margin-top: 20px;
        }

        .vr-character {
          width: 400px;
          margin-bottom: -55px;
        }

        .skill-cards {
          display: flex;
          flex-direction: row;
          gap: 20px;
          margin-left: 20px;
        }

        .skill-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: rgba(255, 255, 255, 0.8);
          padding: 10px;
          border-radius: 10px;
          width: 150px;
          font-size: 14px;
          font-weight: bold;
           border: 3px solid #FF7F50;
          
        }
           .skill-card:hover{
           transform: scale(1.1);
           transition: transform 0.3s ease;
           text-decoration: bold;
           box-shadow: 0 4px 10px rgba(0, 0, 0, 4);
           }

        .skill-card img {
          width: 100px;
          height: 100px;
          border-radius: 10px;
          margin-bottom: 5px;
        }
          
        /* Responsive */
        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
            align-items: center;
          }

          .skill-cards {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .vr-character {
            width: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default Asd;