import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { callGamesByDate } from "../ApiScripts"; // Assuming the function is in ApiScripts

const GameFetcher = () => {
  const startDate = "2025-01-01";
  const endDate = "2025-01-31";
  const teamID = "1"; 

  const testFetchGames = async () => {
    try {
      console.log("Calling API...");
      const gameData = await callGamesByDate(startDate, endDate, teamID);
      console.log("Fetched games:", gameData);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    testFetchGames();
  }, []);

  return (
    <View>
      <Text>Check the console for fetched games!</Text>
      <Button title="Test API Call" onPress={testFetchGames} />
    </View>
  );
};

export default GameFetcher;
