// NOTE: This file previously used external API calls to RapidAPI's NBA endpoint.
// These calls have been removed in preparation for switching to our own backend.

// ✅ REPLACED localhost with local IP address
const BACKEND_BASE_URL = "http://10.11.140.56:8080/api";

/**
 * Placeholder for calling our backend API.
 */
export const apiCall = async (endpoint) => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // TODO: Add Authorization header here if using Firebase/Google OAuth
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("API call failed:", error);
    return null;
  }
};

/**
 * ✅ Updated to use local IP instead of localhost
 * This calls the /teams route from the backend.
 */
export const callTeams = async () => {
  try {
    const response = await fetch("http://10.11.116.214:8080/teams"); // updated
    const data = await response.json();
    console.log("Teams API response:", data);
    return data._embedded.teamList;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

/**
 * Calls backend endpoint to get games by date and team ID.
 */
export const callGamesByDate = async (startDate, endDate, teamID) => {
  try {
    const json = await apiCall(
      `${BACKEND_BASE_URL}/games?start=${startDate}&end=${endDate}&teamId=${teamID}`
    );
    if (!json) throw new Error("Invalid response");

    const gameData = json.map((game) => ({
      id: game.id,
      date: new Date(game.date),
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
    }));

    return gameData;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
