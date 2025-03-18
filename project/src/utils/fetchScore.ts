import axios from "axios";

const API_BASE_URL = "https://vr-based-learning-tool.onrender.com/api";

interface FetchScoreResponse {
  score: { [activity: string]: number };
}

interface PastScore {
  score: { [activity: string]: number };
  timestamp: Date;
  email: string;
}

interface FetchPastScoresResponse {
  pastScores: PastScore[];
}

export const fetchScore = async (): Promise<FetchScoreResponse | null> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found.");
      return null;
    }

    const response = await axios.get<FetchScoreResponse>(
      `${API_BASE_URL}/get-score`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Fetched scores successfully:", response.data.score);
    return response.data;
  } catch (error) {
    console.error("Error fetching scores:", error);
    return null;
  }
};

export const fetchPastScores = async (): Promise<FetchPastScoresResponse | null> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found.");
      return null;
    }

    const response = await axios.get<FetchPastScoresResponse>(
      `${API_BASE_URL}/get-past-scores`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Fetched past scores successfully:", response.data.pastScores);
    return response.data;
  } catch (error) {
    console.error("Error fetching past scores:", error);
    return null;
  }
};
