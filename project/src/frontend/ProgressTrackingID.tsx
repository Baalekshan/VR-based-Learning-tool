import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/backgroundID.jpg";
import avatarIcon from "../assets/avatar.png";
import userAvatar from "../assets/avatar.png";
import subBg from "../assets/subBg.png";
import { fetchProfile } from "../utils/fetchProfile";
import { fetchScore } from "../utils/fetchScore";

const colorMapping: { [key: string]: string } = {
  "communication-quiz": "bg-success",
  "object-quiz": "bg-warning",
  "road-crossing": "bg-danger",
};

const activityMap: Record<string, string> = {
  "communication-quiz": "Communication Quiz",
  "object-quiz": "Object Quiz",
  "road-crossing": "Road Crossing"
};

const scoreMap: Record<string, number> = {
  "communication-quiz": 5,
  "object-quiz": 10,
  "road-crossing": 10
};

const ProgressTrackingID: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("your name");
  const [scores, setScores] = useState<{ [activity: string]: number }>({});
  useEffect(() => {
    const getProfile = async () => {
    const profile = await fetchProfile();
    if (profile?.name) {
      setUserName(profile.name);
    }
    };
    getProfile();
  }, []);

  useEffect(() => {
      const fetchData = async () => {
        const data = await fetchScore();
        if (data && data.score) {
          setScores(data.score);
        }
      };
      fetchData();
    }, []);

  return (
    <div className="progress-container">
      {/* Background Image */}
      <img src={bgImage} alt="Background" className="background-image" />
      <img src={subBg} alt="Background" className="subBackground-image" />

      {/* User Avatar Section */}
      <div className="user-avatar">
        <img src={avatarIcon} alt="User Avatar" className="avatar" />
        <span>Hey! {userName}</span>
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
          <div className="progress-chart">
            {Object.entries(scores).map(([activity, score]) => (
              <div key={activity} className="progress-item">
                <label style={{ fontFamily: '"Londrina Solid", serif' }}>
                  <h3>{activityMap[activity]}</h3>
                </label>
                <div className="progress" style={{ height: "20px", width: "200px", margin: "0 auto", borderRadius: "4px !important" }}>
                  <div
                    className={`progress-bar ${colorMapping[activity] || "bg-primary"}`}
                    role="progressbar"
                    style={{
                      width: `${(5 / scoreMap[activity]) * 100}%`,
                      borderRadius: "4px !important",
                    }}
                    aria-valuenow={score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {score}%
                  </div>
                </div>
              </div>
            ))}
          </div> 
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
        
        .progress-chart {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
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

function setScores(score: { [activity: string]: number; }) {
  throw new Error("Function not implemented.");
}
