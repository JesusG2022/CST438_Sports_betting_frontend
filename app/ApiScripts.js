// NOTE: This file previously used external API calls to RapidAPI's NBA endpoint.
// These calls have been removed in preparation for switching to our own backend.

// TODO: Replace this with backend's API base URL.
// Example: "http://localhost:8080/api" 
const BACKEND_BASE_URL = "http://localhost:8080/api";

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
 * TODO: Replace with call to our backend endpoint to get teams.
 * Example: GET /api/teams
 */
export const callTeams = async () => {
  try {
    const json = await apiCall(`${BACKEND_BASE_URL}/teams`);
    if (!json) throw new Error("Invalid response");

    // TODO: Adjust this mapping based on how our backend sends team data
    const teamData = json.map((team) => ({
      id: team.id,
      name: team.name,
      nickname: team.nickname,
      logo: team.logo,
    }));

    return teamData;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
};

/**
 * TODO: Replace with call to our backend endpoint to get games.
 * Example: GET /api/games?start=YYYY-MM-DD&end=YYYY-MM-DD&teamId=XXX
 */
export const callGamesByDate = async (startDate, endDate, teamID) => {
  try {
    const json = await apiCall(
      `${BACKEND_BASE_URL}/games?start=${startDate}&end=${endDate}&teamId=${teamID}`
    );
    if (!json) throw new Error("Invalid response");

    // TODO: Adjust this mapping to match your backend's game data format
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
