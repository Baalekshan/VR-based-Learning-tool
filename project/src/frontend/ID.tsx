import React, { useEffect, useState } from "react";
import {Navigate,  useNavigate } from "react-router-dom";
import bgImage from "../assets/backgroundID.jpg";
import vrCharacter from "../assets/vr-character.png";
import avatarIcon from "../assets/avatar.png";
import videoIcon from "../assets/video-icon.png";
import progressIcon from "../assets/progress-icon.png";
import communicationImg from "../assets/communication.png";
import cognitiveImg from "../assets/cognitive.png";
import socialImg from "../assets/social.png";
import sensoryImg from "../assets/sensory.png";
import { fetchProfile } from "../utils/fetchProfile";


const ID: React.FC = () => {
  const [userName, setUserName] = useState("your name");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const getProfile = async () => {
    const profile = await fetchProfile();
    if (profile?.name) {
      setUserName(profile.name);
    }
    if (profile?.avatar) {
      setAvatar(profile.avatar);
    }
  };
    getProfile();
  }, []);
  const navigate = useNavigate();
  const handleProgressTrackingID = () => {
    navigate("/progress-track-id");
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
        <img src={avatar} alt="User Avatar" style={{ borderRadius: "50%" }} className="avatar" onClick={handleProfile} />
        <span>Hey! {userName}</span>
      </div>

      {/* Main Title */}
      <h1 className="title">
        <span className="radley-regular">VR Learning Adventures</span>
        <br />
        <span className="radley-regular">Learning Made Easy for Kids with ID!</span>
      </h1>

      {/* Feature Buttons */}
      <div className="feature-buttons">
        <div className="feature-card">
          <img src={videoIcon} alt="Learn Videos" />
          <span>Learn through videos</span>
        </div>
        <div className="feature-card">
          <img src={progressIcon} alt="Progress Tracking" />
          <span onClick={handleProgressTrackingID}>Progress Tracking</span>
        </div>
      </div>

      {/* VR Character & Skill Cards */}
      <div className="content-wrapper">
        {/* Left Skill Cards */}
        <div className="skill-cards left">
          <div className="skill-card">
            <img src={communicationImg} alt="Communication Skills" />
            <span onClick={() => navigate("/communication-quiz")}>COMMUNICATION SKILLS</span>
          </div>
          <div className="skill-card">
            <img src={cognitiveImg} alt="Cognitive Skills" />
            <span onClick={() => navigate("/road-crossing")}>COGNITIVE SKILLS</span>
          </div>
        </div>

        {/* VR Character */}
        <img src={vrCharacter} alt="VR Character" className="vr-character" />

        {/* Right Skill Cards */}
        <div className="skill-cards right">
          <div className="skill-card">
            <img src={socialImg} alt="Daily Life & Social Interaction" />
            <span onClick={() => navigate("/object-quiz")}>DAILY LIFE AND SOCIAL INTERACTION</span>
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
          font-color: #fff;
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
        background: linear-gradient(90deg, #ff8c42, #ff3e7f);  
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
          color: #fff;
          
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
          .tagline{
          color: #fff;
          
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

export default ID;