import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/backgroundID.jpg";
import avatarIcon from "../assets/avatar.png";
import userAvatar from "../assets/avatar.png";
import subBg from "../assets/subBg.png";
import { fetchScore, fetchPastScores } from "../utils/fetchScore";
import { fetchProfile } from "../utils/fetchProfile";

const colorMapping: { [key: string]: string } = {
  "communication-quiz": "bg-success",
  "object-quiz": "bg-warning",
  "road-crossing": "bg-danger",
  "coloring-activity": "bg-info",
  "grocery-shopping": "bg-primary",
  "solar-system": "bg-secondary",
  "store-3d": "bg-dark"
};

const activityMap: Record<string, string> = {
  "communication-quiz": "Communication Quiz",
  "object-quiz": "Object Quiz",
  "road-crossing": "Road Crossing",
  "coloring-activity": "Coloring Activity",
  "grocery-shopping": "Grocery Shopping",
  "solar-system": "Solar System",
  "store-3d": "3D Store"
};

const maxScores: { [key: string]: number } = {
  "communication-quiz": 5,
  "object-quiz": 10,
  "road-crossing": 10,
  "coloring-activity": 4,
  "grocery-shopping": 1,
  "solar-system": 5,
  "store-3d": 5
};

const ProgressTrackingID: React.FC = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<{ [activity: string]: number }>({});
  const [userName, setUserName] = useState("your name");
  const [avatar, setAvatar] = useState("your avatar");
  const [pastScores, setPastScores] = useState<Array<{ score: { [activity: string]: number }, timestamp: Date, email: string }>>([]);
  const [showPastScores, setShowPastScores] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchScore();
      if (data && data.score) {
        setScores(data.score);
      }
    };
    fetchData();
  }, []);

  const handleViewPastScores = async () => {
    const data = await fetchPastScores();
    if (data && data.pastScores) {
      setPastScores(data.pastScores);
      setShowPastScores(true);
    }
  };

  const handleBackToCurrent = () => {
    setShowPastScores(false);
  };

  const handleActivityClick = (activity: string) => {
    if (activity === "grocery-shopping") {
      navigate("/vrgrocerylanding");
    }
  };

  return (
    <div className="progress-container">
      <img src={bgImage} alt="Background" className="background-image" />
      <img src={subBg} alt="Background" className="subBackground-image" />

      <div className="user-avatar">
        <img src={avatar} style={{ borderRadius: "50%" }} alt="User Avatar" className="avatar" />
        <span>Hey! {userName}</span>
      </div>

      <h1 className="title">PROGRESS TRACKING</h1>

      <div className="content-wrapper">
        <div className="left-section">
          <img src={userAvatar} alt="User Avatar" className="user-avatar-large" />
        </div>

        <div className="right-section">
          <div className="progress-chart-container">
            {!showPastScores ? (
              <>
                <div className="progress-chart">
                  {Object.entries(scores).map(([activity, score]) => {
                    const percentage = (score / maxScores[activity]) * 100;
                    return (
                      <div 
                        key={activity} 
                        className="progress-item"
                        onClick={() => handleActivityClick(activity)}
                        style={{ cursor: activity === "grocery-shopping" ? "pointer" : "default" }}
                      >
                        <label><h3>{activityMap[activity]}</h3></label>
                        <div className="progress" style={{ height: "20px", width: "200px", margin: "0 auto" }}>
                          <div
                            className={`progress-bar ${colorMapping[activity] || "bg-primary"}`}
                            role="progressbar"
                            style={{ width: `${percentage}%` }}
                            aria-valuenow={percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            {Math.round(percentage)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="view-past-scores-btn" onClick={handleViewPastScores}>
                  View Past Scores
                </button>
              </>
            ) : (
              <>
                <div className="past-scores-list">
                  {pastScores.map((pastScore, index) => (
                    <div key={index} className="past-score-item">
                      <h4>Score from {new Date(pastScore.timestamp).toLocaleDateString()}</h4>
                      {Object.entries(pastScore.score).map(([activity, score]) => {
                        const percentage = (score / maxScores[activity]) * 100;
                        return (
                          <div 
                            key={activity} 
                            className="progress-item"
                            onClick={() => handleActivityClick(activity)}
                            style={{ cursor: activity === "grocery-shopping" ? "pointer" : "default" }}
                          >
                            <label><h3>{activityMap[activity]}</h3></label>
                            <div className="progress" style={{ height: "20px", width: "200px", margin: "0 auto" }}>
                              <div
                                className={`progress-bar ${colorMapping[activity] || "bg-primary"}`}
                                role="progressbar"
                                style={{ width: `${percentage}%` }}
                                aria-valuenow={percentage}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                {Math.round(percentage)}%
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <button className="back-to-current-btn" onClick={handleBackToCurrent}>
                  Back to Current Scores
                </button>
              </>
            )}
          </div>
        </div>
      </div>

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
          left: 60px;
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

        .title {
          font-size: 32px;
          margin-top: -80px;
        }

        .content-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px; 
          margin-top: 40px;
          width: 90%;
        }

        .progress-chart-container {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          text-align: center;
        }

        .progress-chart {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .progress-item {
          margin-bottom: 15px;
        }

        .progress-item label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .progress {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }

        .view-past-scores-btn, .back-to-current-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: rgba(255, 255, 255, 0.3);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .view-past-scores-btn:hover, .back-to-current-btn:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }

        .past-scores-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .past-score-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 10px;
        }

        .past-score-item h4 {
          margin-bottom: 15px;
          color: white;
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
