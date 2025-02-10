import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

interface FetchScoreResponse {
  score: { [activity: string]: number };
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
