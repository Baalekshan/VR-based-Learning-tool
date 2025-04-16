import axios from "axios";
import { config } from '../frontend/config';

const API_BASE_URL = config.apiBaseUrl;

interface Profile {
  email: string;
  name?: string;
  age?: string;
  gender?: string;
  disorder?: string;
  mobile?: string;
  avatar?: string;
}

export const fetchProfile = async (): Promise<Profile | null> => {
  try {
    const token = localStorage.getItem('token');
    const currentEmail = localStorage.getItem('email');

    if (!token || !currentEmail) {
      console.error("No token or email found in localStorage");
      return null;
    }

    const response = await axios.get<{ profile: Profile }>(
      `${API_BASE_URL}/profile`,
      {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.data.profile.email !== currentEmail) {
      console.error("Profile email mismatch");
      return null;
    }

    return response.data.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};
