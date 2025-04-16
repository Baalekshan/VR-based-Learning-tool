import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Fun Beans Logo.png';
import axios from 'axios';
import { config } from './config';
import useAuth from '../utils/UseAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      // Call the backend logout endpoint
      await axios.post(`${config.apiBaseUrl}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if the API call fails, we still want to clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Logo and Logout Button */}
      <div className="fixed top-4 right-4 z-[1001] flex items-center gap-4">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="px-3 py-1 bg-red-500 text-white rounded-lg transition-colors hover:bg-red-600 shadow-md"
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
        <img 
          src={logo} 
          alt="Fun Beans Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>
      
      {/* Main content */}
      {children}
    </div>
  );
};

export default Layout; 