import { useState, useEffect } from "react";
import axios from "axios";
import { config } from '../frontend/config';

interface User {
  email: string;
}

const useAuth = (): string | null => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");  // Get the token from localStorage
    if (token) {
      // Fetch current user with the token
      fetchCurrentUser();
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get<User>(`${config.apiBaseUrl}/current-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Send the token for authentication
        },
        withCredentials: true,
      });
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching current user:', error);
      setIsLoading(false);
    }
  };

  return user?.email || null;  // Return email if user is found
};

export default useAuth;
