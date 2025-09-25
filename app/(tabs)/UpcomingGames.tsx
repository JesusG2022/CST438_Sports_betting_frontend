import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { callGamesByDate } from "../ApiScripts";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navagation/types";
import { getAllFavTeamInfo, logDatabaseContents } from "../../database/db";
import { useFocusEffect } from "@react-navigation/native";

interface Game {
  id: string;
  date: Date;
  homeTeam: { name: string; nickname: string; logo: string };
  awayTeam: { name: string; nickname: string; logo: string };
}

const UpcomingGames = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string | null>(null);

  // Fetch username from AsyncStorage
  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserName = await AsyncStorage.getItem("username");
      if (storedUserName) {
        setUserName(storedUserName);
        console.log("Fetched Username: ", storedUserName);
      } else {
        console.warn("⚠ No username found in AsyncStorage");
      }
    };
    fetchUserName();
  }, []);

  // Reusable fetchGames function (Made Reusable for focus effect)
  const fetchGames = useCallback(async () => {
    if (!userName) return;
    setLoading(true);

    try {
      // Log the database contents after the update (Full check)
      await logDatabaseContents();

      // Fetch favorite teams directly from the database using the username
      const favTeams = await getAllFavTeamInfo(userName);
      const favTeamNames = favTeams.map((team) => team[0]);
      if (favTeamNames.length === 0) {
        console.warn("No favorite teams found.");
        setGames([]);
        return;
      }

      // Get current date and calculate the end date (14 days ahead)
      const currentDate = new Date();
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 14);

      const startDateString = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      const endDateString = endDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      console.log(
        "Fetching games from:",
        startDateString,
        "to:",
        endDateString
      );
 
      // Fetch games for each of the selected teams using callGamesByDate
      let allGames: Game[] = [];
      for (const teamID of favTeamNames) {
        console.log(`📡 Fetching games for team: ${teamID}`);
        const teamGames = await callGamesByDate(
          startDateString,
          endDateString,
          teamID
        );

        if (teamGames.length === 0) {
          console.warn(`No games found for team ${teamID}`);
        } else {
          allGames = [...allGames, ...teamGames];
        }
      }

      if (allGames.length === 0) {
        console.warn("No upcoming games found.");
      }
      setGames(allGames);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  }, [userName]);

  // Fetch games whenever userName changes
  useEffect(() => {
    fetchGames();
  }, [userName, fetchGames]);

  // This allows the view to update when doing tab navigation.
  useFocusEffect(
    useCallback(() => {
      console.log("re-fetching games...");
      fetchGames();
    }, [fetchGames])
  );

  if (loading)
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Games for Your Teams</Text>
      {games.length === 0 ? (
        <Text style={styles.errorText}>No upcoming games found.</Text>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isHomeTeam = item.homeTeam.name === "The home team from list";
            const winRate = isHomeTeam ? 0.51 : 0.49;

            return (
              <View style={styles.gameItem}>
                {/* Logos */}
                <View style={styles.teamLogoContainer}>
                  <Image
                    source={{ uri: item.homeTeam.logo }}
                    style={styles.teamLogo}
                  />
                  <Text style={styles.teamText}>
                    {item.homeTeam.name} vs {item.awayTeam.name}
                  </Text>
                  <Image
                    source={{ uri: item.awayTeam.logo }}
                    style={styles.teamLogo}
                  />
                </View>

                <Text style={styles.dateText}>
                  {item.date.toLocaleDateString()}
                </Text>
                <Text style={styles.winRateText}>
                  Win Rate: {winRate * 100}%
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22, // Adjusted font size for better fit
    fontWeight: "bold",
    marginBottom: 12, // Reduced margin for better fit on smaller screens
    textAlign: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  gameItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 12,
  },
  teamText: {
    fontSize: 16, 
    textAlign: "center", 
  },
  dateText: {
    fontSize: 14, 
    color: "#666",
    textAlign: "center", 
  },
  winRateText: {
    fontSize: 14, 
    color: "#4CAF50",
    marginTop: 6, 
    textAlign: "center",
  },
  teamLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    marginBottom: 8,  
  },
  teamLogo: {
    width: 30,
    height: 30,
    marginHorizontal: 8,
  },
});
export default UpcomingGames;
