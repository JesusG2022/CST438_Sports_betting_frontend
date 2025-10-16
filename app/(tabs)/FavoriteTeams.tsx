import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const API_BASE_URL = "https://project2cst438group9-70c9b7b662e0.herokuapp.com";

const FavoriteTeamsList = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [favTeams, setFavTeams] = useState<Fav[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamRes = await fetch(`${API_BASE_URL}/teams`);
        const teamJson = await teamRes.json();
        const teamList: Team[] = teamJson._embedded?.teamList || [];
        setTeams(teamList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeams();
  }, []);

  // Refresh favorites whenever screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Get userId from AsyncStorage - This works
          const storedUserId = await AsyncStorage.getItem("userID");
          if (!storedUserId) {
            setLoading(false);
            return;
          }
          
          setUserId(parseInt(storedUserId));

          const favRes = await fetch(`${API_BASE_URL}/favs/user/${storedUserId}`);
          const favJson = await favRes.json();
          const favList: Fav[] = favJson._embedded?.favList || [];
          setFavTeams(favList);
        } catch (err) {
          console.error(err);
          Alert.alert("Error", "Could not load favorite teams.");
        }
        setLoading(false);
      };

      fetchData();
    }, [])
  );

  const unfavoriteTeam = async (fav: Fav) => {
    try {
      await fetch(`${API_BASE_URL}/favs/${fav.fav}`, { method: "DELETE" });
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
    return (
      <View style={styles.container}>
        <Text style={styles.noFavs}>You have no favorite teams yet.</Text>
      </View>
    );
  }

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
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{item.name}</Text>
              <Text style={styles.info}>{item.conference} / {item.division}</Text>
            </View>
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
  teamInfo: {
    flex: 1,
    marginLeft: 8
  },
  teamName: {
    fontSize: 16,
    fontWeight: "600"
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginTop: 2
  },
  star: {
    fontSize: 20,
    color: "#FFD700",
    marginLeft: 10
  },
});

export default FavoriteTeamsList;