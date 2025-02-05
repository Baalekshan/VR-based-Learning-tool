import { useState } from "react";
import { useNavigate } from "react-router-dom";
import selectionBg from "../assets/selectionBg.jpg";
import selectionAvatar from "../assets/selectionAvatar.png";

function SelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState(""); // Store selected category
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleAsd = () => {
    navigate("/asdpage");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Category:", selectedCategory);
  };

  return (
    <div className="selection-container">
      {/* Background Image */}
      <img src={selectionBg} alt="Background" className="background-image" />
      <div className="background-overlay"></div>

      {/* Form Section */}
      <div className="form-container">
        <h2>Choose your category</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            {/* ASD Option */}
            <label className={`radio-label ${selectedCategory === "ASD" ? "selected" : ""}`}>
              <input
                type="radio"
                name="category"
                value="ASD"
                checked={selectedCategory === "ASD"}
                onChange={() => setSelectedCategory("ASD")}
              />
              <span className="radio-text">
                <strong>ASD</strong> <span className="subtext">[Autism Spectrum Disorder]</span>
              </span>
            </label>

            {/* ID Option */}
            <label className={`radio-label ${selectedCategory === "ID" ? "selected" : ""}`}>
              <input
                type="radio"
                name="category"
                value="ID"
                checked={selectedCategory === "ID"}
                onChange={() => setSelectedCategory("ID")}
              />
              <span className="radio-text">
                <strong>ID</strong> <span className="subtext">[Intellectual Disability]</span>
              </span>
            </label>
          </div>

          <button type="submit" className="submit-btn" onClick={handleAsd}>
            Submit
          </button>
        </form>
      </div>

      {/* Avatar Image */}
      <img src={selectionAvatar} alt="VR Avatar" className="avatar" />

      {/* Styles */}
      <style>{`
        .selection-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .background-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .background-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0);
          z-index: -1;
        }

        .form-container {
          position: absolute;
          left: 50%;
          max-width: 400px;
          background: rgba(255, 255, 255, 0.8); 
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transform: translateX(-50%);
          text-align: center;
        }

        h2 {
          font-size: 26px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        p {
          font-size: 16px;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .login-link {
          color: #007bff;
          font-weight: bold;
          cursor: pointer;
        }

        .login-link:hover {
          text-decoration: underline;
        }

    
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .radio-label {
          display: flex;
          align-items: center;
          background: white;
          border: 3px solid transparent;
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .radio-label:hover,
        .radio-label.selected {
          border-color: #f57c00; 
          background: rgba(255, 165, 0, 0.2);
        }

        .radio-label input {
          margin-right: 15px;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .radio-text {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .subtext {
          font-size: 14px;
          color: #555;
        }

        .submit-btn {
          width: 100%;
          background-color: #6200ea;
          color: white;
          padding: 12px;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-btn:hover {
          background-color: #4b00b3;
        }

    
        .avatar {
          position: absolute;
          right: 70%;
          bottom: -5%;
          width: 450px;
          z-index: 3;
        }
      `}</style>
    </div>
  );
}

export default SelectionPage;