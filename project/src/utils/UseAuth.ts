import { useState, useEffect } from "react";
import axios from "axios";
import { config } from '../frontend/config';
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
  authMethod: string;
}

const useAuth = (): { user: User | null; isLoading: boolean } => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get<User>(`${config.apiBaseUrl}/current-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setUser(response.data);
          // Redirect to selection page if not already there
          if (window.location.pathname === '/login' || window.location.pathname === '/') {
            navigate('/selectionpage');
          }
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return { user, isLoading };
};

export default useAuth;
