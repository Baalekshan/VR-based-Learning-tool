import axios from "axios";
import { config } from '../config';

const API_BASE_URL = config.apiBaseUrl;

interface Profile {
  name?: string;
  age?: number;
  gender?: string;
  disorder?: string;
  mobile?: string;
  avatar?: string;
}


export const fetchProfile = async (): Promise<Profile | null> => {
  try {
    const token = localStorage.getItem('token');

    console.log('Token:', token);

    if (!token) {
      console.error("No token found in localStorage");
      return null;
    }

    const response = await axios.get<{ profile: Profile }>(
      `${API_BASE_URL}/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    return response.data.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};
