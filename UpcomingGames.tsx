import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { callGamesByDate } from "../ApiScripts"; 
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navagation/types";

interface Game {
  id: string;
  date: Date;
  homeTeam: { name: string; nickname: string; logo: string };
  awayTeam: { name: string; nickname: string; logo: string };
}

const UpcomingGames = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "UpcomingGames">>();

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        process.env.RAPIDAPI_KEY = "f48a5921f5msh580809ba8c9e6cfp181a8ajsn545d715d6844";
        console.log(" API Key being used:", process.env.RAPIDAPI_KEY);
  
        const storedTeams = await AsyncStorage.getItem("favoriteTeams");
        if (!storedTeams) {
          console.warn("⚠ No favorite teams found in storage.");
          setLoading(false);
          return;
        }
  
        const teamIDs = JSON.parse(storedTeams);
        console.log(" Loaded favorite teams for fetching games:", teamIDs);
  
        let allGames: Game[] = [];
        for (const teamID of teamIDs) {
          console.log(`📡 Calling API for games of team: ${teamID}`);
          const teamGames = await callGamesByDate("2024-02-01", "2024-03-10", teamID);
  
          console.log(`📡 Full API Response for Team ${teamID}:`, teamGames); //  Log entire response
  
          if (teamGames.length === 0) {
            console.warn(` No games found for team ${teamID}`);
          } else {
            console.log(` Games fetched for team ${teamID}:`, teamGames);
          }
  
          allGames = [...allGames, ...teamGames];
        }
  
        if (allGames.length === 0) {
          console.warn(" No upcoming games found.");
        }
  
        setGames(allGames);
      } catch (error) {
        console.error(" Error fetching games:", error);
      }
      setLoading(false);
    };
  
    fetchGames();
  }, []);
  
  
  
  

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Games for Your Teams</Text>
      {games.length === 0 ? (
        <Text style={styles.errorText}>No upcoming games found.</Text>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.gameItem}>
              <Text style={styles.teamText}>
                {item.homeTeam.name} vs {item.awayTeam.name}
              </Text>
              <Text style={styles.dateText}>{item.date.toLocaleDateString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 16, color: "red", textAlign: "center" },
  gameItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  teamText: { fontSize: 18 },
  dateText: { fontSize: 16, color: "#666" },
});

export default UpcomingGames;
