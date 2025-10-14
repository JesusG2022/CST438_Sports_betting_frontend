import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { callTeams } from "../ApiScripts";

const Teams = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await callTeams();
        setTeams(teamsData);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
        setError("Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.title}>Teams</Text>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.teamID.toString()}
        renderItem={({ item }) => (
          <View style={styles.teamItem}>
            <Text style={styles.teamName}>{item.name}</Text>
            <Text>{item.conference} Conference - {item.division} Division</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16
  },
  teamItem: {
    padding: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600"
  }
});

export default Teams;
