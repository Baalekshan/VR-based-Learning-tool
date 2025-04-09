import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/Fun Beans Logo.png';

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Logo in top right corner */}
      <div className="fixed top-4 right-4 z-50">
        <img 
          src={logo} 
          alt="Fun Beans Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>
      
      {/* Main content */}
      <div className="pt-20"> {/* Add padding to prevent content from being hidden under the logo */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 