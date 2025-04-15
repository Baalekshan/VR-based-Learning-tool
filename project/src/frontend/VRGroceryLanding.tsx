import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../utils/fetchProfile';

const VRGroceryLanding: React.FC = () => {
  const navigate = useNavigate();

  const handleStartVR = () => {
    navigate('/store-3d');
  };

  const handleBackToHome = async () => {
    try {
      const profile = await fetchProfile();
      if (profile?.disorder === "ASD") {
        navigate('/asdpage');
      } else if (profile?.disorder === "ID") {
        navigate('/idpage');
      } else {
        // Default to selection page if disorder type is not set
        navigate('/selectionpage');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Default to selection page if there's an error
      navigate('/selectionpage');
    }
  };

  return (
    <div className="vr-grocery-landing">
      <div className="landing-content">
        <h1>VR Grocery Shopping</h1>
        <p className="description">
          Experience a virtual grocery store where you can practice shopping skills in a safe, 
          controlled environment. Navigate through aisles, select products, and learn about 
          different food categories.
        </p>
        
        <div className="features">
          <div className="feature">
            <div className="feature-icon">🛒</div>
            <h3>Interactive Shopping</h3>
            <p>Pick up items, examine them, and add them to your cart</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💰</div>
            <h3>Budget Practice</h3>
            <p>Learn to manage a shopping budget and track spending</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🏷️</div>
            <h3>Product Recognition</h3>
            <p>Identify different products and understand their categories</p>
          </div>
        </div>
        
        <div className="buttons">
          <button className="start-button" onClick={handleStartVR}>
            Start VR Experience
          </button>
          <button className="back-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
      
      <style>{`
        .vr-grocery-landing {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: auto;
        }
        
        .landing-content {
          max-width: 800px;
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        h1 {
          font-size: 36px;
          color: #333;
          margin-bottom: 20px;
        }
        
        .description {
          font-size: 18px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 40px;
        }
        
        .features {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        
        .feature {
          flex: 1;
          min-width: 200px;
          padding: 20px;
          margin: 10px;
          background: #f9f9f9;
          border-radius: 10px;
          transition: transform 0.3s ease;
        }
        
        .feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
          font-size: 40px;
          margin-bottom: 15px;
        }
        
        .feature h3 {
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
        }
        
        .feature p {
          font-size: 16px;
          color: #666;
        }
        
        .buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }
        
        .start-button, .back-button {
          padding: 12px 30px;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .start-button {
          background-color: #4CAF50;
          color: white;
        }
        
        .start-button:hover {
          background-color: #3e8e41;
        }
        
        .back-button {
          background-color: #f44336;
          color: white;
        }
        
        .back-button:hover {
          background-color: #d32f2f;
        }
        
        @media (max-width: 768px) {
          .features {
            flex-direction: column;
          }
          
          .feature {
            margin-bottom: 20px;
          }
          
          .buttons {
            flex-direction: column;
          }
          
          .start-button, .back-button {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default VRGroceryLanding; 