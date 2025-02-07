import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  email: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get<User>("http://localhost:5000/api/current-user", { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  return user;
};

export default useAuth;
