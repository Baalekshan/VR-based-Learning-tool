import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/selectionBg.jpg"; // Reusing selection page background
import vrCharacter from "../assets/vr-character.png";
import avatarIcon from "../assets/avatar.png";
import roadCrossingImg from "../assets/cognitive.png"; // Using existing assets, replace with specific images later
import solarSystemImg from "../assets/sensory.png";
import groceryShoppingImg from "../assets/social.png";
import drawingImg from "../assets/communication.png";
import { fetchProfile } from "../utils/fetchProfile";

const CognitiveActivities: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState(avatarIcon);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchProfile();
        if (profile) {
          setUserName(profile.name || 'User');
          setAvatar(profile.avatar || avatarIcon);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleProfile = () => {
    navigate("/user-profile");
  };

  const handleActivitySelection = (path: string) => {
    navigate(path);
  };

  return (
    <div className="cognitive-activities-container">
      {/* Background Image */}
      <img src={bgImage} alt="Background" className="background-image" />
      <div className="background-overlay"></div>

      {/* Header with Avatar and Logout */}
      <div className="header">
        <div className="user-avatar">
          <img src={avatar} alt="User Avatar" style={{ borderRadius: "50%" }} className="avatar" onClick={handleProfile} />
          <span>Hey! {userName || 'User'}</span>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="title">
        <span className="radley-regular">Cognitive Skills Activities</span>
        <br />
        <span className="sub-title">Choose an activity to start learning</span>
      </h1>

      {/* VR Character & Activity Cards */}
      <div className="content-wrapper">
        <div className="activity-cards">
          <div className="activity-card" onClick={() => handleActivitySelection("/road-crossing")}>
            <img src={roadCrossingImg} alt="Road Crossing" />
            <span>ROAD CROSSING</span>
            <p>Learn how to safely cross roads in a virtual environment</p>
          </div>
          
          <div className="activity-card" onClick={() => handleActivitySelection("/solar-system")}>
            <img src={solarSystemImg} alt="Solar System" />
            <span>SOLAR SYSTEM</span>
            <p>Explore the solar system in an interactive 3D environment</p>
          </div>
          
          <div className="activity-card" onClick={() => handleActivitySelection("/vr-grocery")}>
            <img src={groceryShoppingImg} alt="Grocery Shopping" />
            <span>GROCERY SHOPPING</span>
            <p>Practice shopping skills in a virtual grocery store</p>
          </div>
          
          <div className="activity-card" onClick={() => handleActivitySelection("/coloring-activity")}>
            <img src={drawingImg} alt="Draw/Color" />
            <span>DRAW & COLOR</span>
            <p>Express creativity and improve fine motor skills with coloring activities</p>
          </div>
        </div>
      </div>

      {/* VR Character */}
      <img src={vrCharacter} alt="VR Character" className="vr-character" />

      {/* Styles */}
      <style>{`
        .cognitive-activities-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          text-align: center;
          padding-top: 120px;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          opacity: 1;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
          z-index: -1;
        }

        .header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          z-index: 10;
        }

        .user-avatar {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
        }

        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          cursor: pointer;
        }

        .avatar:hover {
          transform: scale(1.2);
          transition: transform 0.3s ease;
        }

        .logout-btn {
          background-color: #ff4757;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 8px 16px;
          font-weight: bold;
          cursor: pointer;
        }

        .logout-btn:hover {
          background-color: #ff6b81;
        }

        .title {
          color: #fff;
          margin-bottom: 40px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .radley-regular {
          font-family: "Radley", serif;
          font-weight: 200;
          font-style: normal;
          font-size: 36px;
        }

        .sub-title {
          font-family: "Radley", serif;
          font-weight: 200;
          font-style: normal;
          font-size: 24px;
        }

        .content-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          position: relative;
          z-index: 1;
        }

        .activity-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          max-width: 900px;
        }

        .activity-card {
          background: rgba(255, 252, 252, 0.7);
          border-radius: 15px;
          padding: 25px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border: 2px solid #FF7F50;
        }

        .activity-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .activity-card img {
          width: 80px;
          height: 80px;
          margin-bottom: 15px;
        }

        .activity-card span {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }

        .activity-card p {
          font-size: 14px;
          color: #666;
          text-align: center;
        }

        .vr-character {
          position: absolute;
          bottom: 0;
          right: 20px;
          height: 300px;
          z-index: 1;
        }

        @media (max-width: 968px) {
          .activity-cards {
            grid-template-columns: 1fr;
            padding: 0 20px;
          }
          
          .vr-character {
            height: 200px;
            right: 10px;
            bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default CognitiveActivities; 