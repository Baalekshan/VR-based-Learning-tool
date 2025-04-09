import axios from "axios";
import { config } from '../config';

const API_BASE_URL = config.apiBaseUrl;

interface SubmitScoreResponse {
  message: string;
}

export const submitScore = async (
  activity: "communication-quiz" | "object-quiz" | "road-crossing",
  score: number,
  email: string
): Promise<SubmitScoreResponse | null> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found.");
      return null;
    }

    const response = await axios.post<SubmitScoreResponse>(
      `${API_BASE_URL}/submit-score`,
      {
        activity,
        score,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Score submitted successfully:", response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error submitting score:", error);
    return null;
  }
};
