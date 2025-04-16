import axios from "axios";
import { config } from '../config';

const API_BASE_URL = config.apiBaseUrl;

interface SubmitScoreResponse {
  message: string;
}

export const submitScore = async (
  activity: "communication-quiz" | "object-quiz" | "road-crossing" | "coloring-activity" | "grocery-shopping" | "solar-system",
  score: number,
  email: string
): Promise<SubmitScoreResponse | null> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found.");
      return null;
    }

    const payload = {
      activity,
      score,
      email,
    };

    console.log("Submitting score with payload:", payload);
    console.log("Authorization token present:", !!token);

    const response = await axios.post<SubmitScoreResponse>(
      `${API_BASE_URL}/submit-score`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Score submission response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error submitting score:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return null;
  }
};
