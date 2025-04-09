import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/loginBg.jpg";
import avatarImage from "../assets/vr-avatar.png";
import axios from "axios";
import LazyImage from "../components/LazyImage";
import "../styles/LazyImage.css";

interface LoginResponse {
  message: string;
  token: string;
  user: { email: string; userId: string };
}

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/");
  };

  const handleSelectionPage = () => {
    navigate("/selectionpage");
  };

  const handleGoogleAuth = () => {
    window.location.assign("https://vr-based-learning-tool.onrender.com/api/auth/google");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const response = await axios.post(
        "https://vr-based-learning-tool.onrender.com/api/login",
        formData,
        { withCredentials: true }
      );

      const data = response.data as LoginResponse;

      console.log("Login response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Login successful!");
        handleSelectionPage();
      } else {
        console.error("Login failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  
  return (
    <div className="signup-container">
      <LazyImage
        src={bgImage}
        alt="Background"
        className="background-image"
        placeholderColor="#f0f0f0"
      />
      <div className="background-overlay"></div>

      {/* Form Section */}
      <div className="form-container">
        <h2>Login</h2>
        <p>
          Don't have an account?{" "}
          <div className="signup-link" onClick={handleSignup}>
            Sign up
          </div>
        </p>
        

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              className="input-field full-width"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Password"
              className="input-field full-width"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          

          <div className="checkbox-container">
            

            <label htmlFor="terms" className="checkbox-label">
              Forgot password
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Sign in
          </button>

          <p className="or-text">or register with</p>

          <div className="social-buttons">
            <button type="button" className="social-btn">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="icon"
                onClick={handleGoogleAuth}
              />
              Google
            </button>
            <button type="button" className="social-btn">
              <img
                src="https://www.apple.com/favicon.ico"
                alt="Apple"
                className="icon"
              />
              Apple
            </button>
          </div>
        </form>
      </div>

      {/* Avatar Image Overlapping */}
      <LazyImage
        src={avatarImage}
        alt="VR Avatar"
        className="avatar"
        placeholderColor="#e0e0e0"
      />

      {/* Styles */}
      <style>{
        `
        .signup-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: no-repeat center center/cover;
        }

        .background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 500; 
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
  left: 10%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.7); 
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
 h2{
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 5px;
  }

  p{
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 400;
  }

        .input-group {
          display: flex;
          gap: 10px;
        }

        .input-field {
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 10px;
          font-size: 16px;
          width: 100%;
        }

        .full-width {
          display: block;
          width: 100%;
          margin-top: 10px;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          margin: 15px 0;
        }

        .checkbox {
          margin-right: 5px;
        }

        .checkbox-label {
          font-size: 14px;
          color: #555;
        }

        .submit-btn {
          width: 100%;
          background-color: #6200ea;
          color: white;
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-btn:hover {
          background-color: #4b00b3;
        }

        .or-text {
          text-align: center;
          margin: 15px 0;
          font-size: 14px;
          color: gray;
        }

        .social-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .social-btn:hover {
          background: #f5f5f5;
        }

        .icon {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }

        /* Avatar Styling */
        .avatar {
          position: absolute;
          right: 10%;
          bottom: -5%;
          width: 450px;
          z-index: 3;
        }

        /* Link Styling */
        .signup-link {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }

        .signup-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Login;
