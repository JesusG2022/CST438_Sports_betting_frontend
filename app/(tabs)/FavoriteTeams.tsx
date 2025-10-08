import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navagation/types";

interface Fav {
  fav: number;
  userID: number;
  teamID: number;
  teamName: string;
}

interface Team {
  teamID: number;
  name: string;
  conference: string;
  division: string;
}

const API_BASE_URL = "http://192.168.0.32:8080";

const FavoriteTeamsList = () => {
  const route = useRoute<RouteProp<RootStackParamList, "favoriteTeams">>();
  const userId = route.params?.userId;

  const [favTeams, setFavTeams] = useState<Fav[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user's favorite teams
        const favRes = await fetch(`${API_BASE_URL}/favs/user/${userId}`);
        const favJson = await favRes.json();
        const favList: Fav[] = favJson._embedded?.favList || [];
        setFavTeams(favList);

        // Fetch all teams
        const teamRes = await fetch(`${API_BASE_URL}/teams`);
        const teamJson = await teamRes.json();
        const teamList: Team[] = teamJson._embedded?.teamList || [];
        setTeams(teamList);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Could not load favorite teams.");
      }
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const unfavoriteTeam = async (fav: Fav) => {
    try {
      await fetch(`${API_BASE_URL}/favs/${fav.fav}`, { method: "DELETE" });
      // Remove from local state
      setFavTeams(prev => prev.filter(f => f.fav !== fav.fav));
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not remove favorite team.");
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (favTeams.length === 0) {
    return <Text style={styles.noFavs}>You have no favorite teams yet.</Text>;
  }

  // Map favorites to actual team info
  const favoriteTeamsWithDetails = favTeams.map(fav => {
    const team = teams.find(t => t.teamID === fav.teamID);
    return {
      ...fav,
      name: team?.name || fav.teamName,
      conference: team?.conference || "",
      division: team?.division || "",
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Teams</Text>
      <FlatList
        data={favoriteTeamsWithDetails}
        keyExtractor={item => item.fav.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.teamName}>{item.name}</Text>
            <Text style={styles.info}>{item.conference} / {item.division}</Text>
            <TouchableOpacity onPress={() => unfavoriteTeam(item)}>
              <Text style={styles.star}>★</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noFavs: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center"
  },
  rank: {
    fontSize: 16,
    fontWeight: "bold",
    width: 30
  },
  teamName: {
    fontSize: 16,
    flex: 1
  },
  info: {
    fontSize: 14,
    color: "#555",
    width: 120,
    textAlign: "right"
  },
  star: {
    fontSize: 20,
    color: "#FFD700",
    marginLeft: 10
  },
});

export default FavoriteTeamsList;
