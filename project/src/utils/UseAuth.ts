import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  email: string;
}

const useAuth = (): string | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");  // Get the token from localStorage
    if (token) {
      // Fetch current user with the token
      axios.get<User>("http://localhost:5000/api/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token for authentication
        },
        withCredentials: true,
      })
        .then(response => setUser(response.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, []);

  return user?.email || null;  // Return email if user is found
};

export default useAuth;
