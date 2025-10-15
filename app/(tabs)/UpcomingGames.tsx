import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface Game {
  gameID: number;
  date: string;
  hometeamName: string;
  awayteamName: string;
}

const UpcomingGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://project2cst438group9-70c9b7b662e0.herokuapp.com/games");
      const json = await res.json();
      const gameList: Game[] = json._embedded?.gameList || [];
      setGames(gameList);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  if (loading)
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Games</Text>
      {games.length === 0 ? (
        <Text style={styles.errorText}>No upcoming games found.</Text>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.gameID.toString()}
          renderItem={({ item }) => (
            <View style={styles.gameItem}>
              <Text style={styles.teamText}>
                {item.hometeamName} vs {item.awayteamName}
              </Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          )}
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
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
});

export default UpcomingGames;
