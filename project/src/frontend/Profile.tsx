import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/profileBg.jpg";
import defaultAvatar from "../assets/boyProfile.jpg";
import avatar1 from "../assets/boyProfile.jpg";
import avatar2 from "../assets/girlProfile.jpg";
import axios from "axios";


const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    disorder: "",
    mobile: "",
    email: "",
    avatar: defaultAvatar, // Default avatar
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  
  

  const handleAvatarSelect = (avatar: string) => {
    setFormData({ ...formData, avatar });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Get the token from localStorage or cookies
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token not found");
      return;
    }
  
    console.log("Token: ", token);
  
    try {
      const response = await axios.post<{ message: string }>(
        "https://vr-based-learning-tool.onrender.com/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      console.log("Profile Submitted:", response.data.message);
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };
  
  
  return (
    <div className="profile-container">
      {/* Background Image */}
      <img src={bgImage} alt="Background" className="background-image" />

      {/* Profile Form */}
      <div className="form-container">
        {/* Profile Avatar */}
        <img src={formData.avatar} alt="Profile Avatar" className="profile-avatar" />

        <h2>PROFILE</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} />
          <div className="row">
            <input type="text" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
         <option value="">Select Gender</option>
         <option value="male">Male</option>
         <option value="female">Female</option>
         <option value="disclose">Prefer not to disclose</option>
         </select>

          </div>
          <select name="disorder" value={formData.disorder} onChange={handleInputChange}>
  <option value="">Select Disorder</option>
  <option value="ASD">ASD</option>
  <option value="ID">ID</option>
</select>


          <input type="text" name="mobile" placeholder="Mobile number" value={formData.mobile} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleInputChange} />

          {/* Avatar Selection */}
          <div className="avatar-selection">
            <img src={avatar1} alt="Avatar 1" onClick={() => handleAvatarSelect(avatar1)} className="avatar-option" />
            <img src={avatar2} alt="Avatar 2" onClick={() => handleAvatarSelect(avatar2)} className="avatar-option" />
            
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" className="submit-btn">SUBMIT</button>
            <button type="button" className="edit-btn">EDIT</button>
            <button type="button" className="home-btn" onClick={() => navigate("/asdpage")}>HOME</button>
          </div>

          
        </form>
      </div>

      {/* Styles */}
      <style>{`
        .profile-container {
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
  opacity: 0.9;
}

.form-container {
  background: #DBE1FF;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 450px;
  height: 620px; /* Adjust height */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Space out elements properly */
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
}

h2 {
  margin-top: 60px;
  margin-bottom: 15px;
  font-size: 22px;
  font-family: "McLaren", serif;
  font-weight: 400;
  font-style: normal;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
}

input, select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 90%;
}

.row {
  display: flex;
  gap: 10px;
  width: 90%;
}

.row input, .row select {
  flex: 1;
}

.avatar-selection {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.avatar-option {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.avatar-option:hover {
  transform: scale(1.1);
}

/* Buttons Wrapper */
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  width: 90%;
  margin-top: 10px;
}

.submit-btn, .edit-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
}

.submit-btn {
  background: green;
  color: white;
}

.edit-btn {
  background: red;
  color: white;
}

.home-btn {
   flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  background: purple;
  color: white;
}

.home-btn:hover {
 background: #fff;
  color: purple;
}

.edit-btn:hover {
  background: #fff;
  color: red;
}

.submit-btn:hover {
  background: #fff;
  color: green;
}
      `}</style>
    </div>
  );
};

export default ProfilePage;