import React, { useEffect, useState } from "react";
import { 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { callTeams } from "../ApiScripts";

const API_BASE_URL = "https://project2cst438group9-70c9b7b662e0.herokuapp.com";

const Teams = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [favoriteTeamIds, setFavoriteTeamIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [teamStats, setTeamStats] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const navigation = useNavigation();

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

  // Refresh favorites whenever screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem("userID");
          if (storedUserId) {
            setUserId(parseInt(storedUserId));
            const favRes = await fetch(`${API_BASE_URL}/favs/user/${storedUserId}`);
            const favJson = await favRes.json();
            const favList = favJson._embedded?.favList || [];
            const favIds = new Set(favList.map((fav: any) => fav.teamID));
            setFavoriteTeamIds(favIds);
          }
        } catch (err) {
          console.error("Failed to load favorites:", err);
        }
      };

      loadFavorites();
      
      // Also listen for navigation state changes
      const unsubscribe = navigation.addListener('focus', () => {
        loadFavorites();
      });

      return unsubscribe;
    }, [navigation])
  );

  const handleTeamPress = async (team: any) => {
    setSelectedTeam(team);
    setModalVisible(true);
    setLoadingStats(true);
    
    try {
      const response = await fetch('https://project2cst438group9-70c9b7b662e0.herokuapp.com/stats');
      const data = await response.json();
      console.log("Stats API response:", data);
      
      // Extract stats list from the response structure
      const allStats = data._embedded?.statList || [];
      
      // Find stats for this specific team
      const stats = allStats.find((stat: any) => stat.teamID === team.teamID);
      console.log("Found stats for team:", stats);
      setTeamStats(stats);
    } catch (err) {
      console.error("Failed to fetch team stats:", err);
      setTeamStats(null);
    } finally {
      setLoadingStats(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTeam(null);
    setTeamStats(null);
  };

  const toggleFavorite = async (team: any, e: any) => {
    e.stopPropagation(); // Prevent opening the modal
    
    if (!userId) {
      Alert.alert("Error", "Please log in to favorite teams");
      return;
    }

    const isFavorited = favoriteTeamIds.has(team.teamID);

    try {
      if (isFavorited) {
        // Unfavorite, need to find the fav ID first might wait for oauth2 instead
        const favRes = await fetch(`${API_BASE_URL}/favs/user/${userId}`);
        const favJson = await favRes.json();
        const favList = favJson._embedded?.favList || [];
        const fav = favList.find((f: any) => f.teamID === team.teamID);
        
        if (fav) {
          await fetch(`${API_BASE_URL}/favs/${fav.fav}`, { method: "DELETE" });
          setFavoriteTeamIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(team.teamID);
            return newSet;
          });
        }
      } else {
        // Favorite 
        await fetch(`${API_BASE_URL}/favs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userID: userId,
            teamID: team.teamID,
            teamName: team.name
          })
        });
        setFavoriteTeamIds(prev => new Set(prev).add(team.teamID));
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      Alert.alert("Error", "Could not update favorite status");
    }
  };

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
          <TouchableOpacity 
            style={styles.teamItem}
            onPress={() => handleTeamPress(item)}
          >
            <View style={styles.teamContent}>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{item.name}</Text>
                <Text>{item.conference} Conference - {item.division} Division</Text>
              </View>
              {userId && (
                <TouchableOpacity 
                  onPress={(e) => toggleFavorite(item, e)}
                  style={styles.starButton}
                >
                  <Text style={styles.star}>
                    {favoriteTeamIds.has(item.teamID) ? "★" : "☆"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {selectedTeam?.name}
              </Text>
              
              <Text style={styles.sectionTitle}>Team Info</Text>
              <View style={styles.statsContainer}>
                <StatRow label="Conference" value={selectedTeam?.conference} />
                <StatRow label="Division" value={selectedTeam?.division} />
              </View>

              <Text style={styles.sectionTitle}>Season Stats</Text>
              {loadingStats ? (
                <View style={styles.statsContainer}>
                  <ActivityIndicator size="small" color="blue" />
                </View>
              ) : teamStats ? (
                <View style={styles.statsContainer}>
                  <StatRow 
                    label="Win Percentage" 
                    value={`${(teamStats.winPercent * 100).toFixed(1)}%`} 
                  />
                  <StatRow 
                    label="FG Percentage" 
                    value={`${teamStats.fgPercent}%`} 
                  />
                  <StatRow 
                    label="3P Percentage" 
                    value={`${teamStats.pgPercent}%`} 
                  />
                  <StatRow 
                    label="Assists" 
                    value={teamStats.assists} 
                  />
                  <StatRow 
                    label="Rebounds" 
                    value={teamStats.rebounds} 
                  />
                  <StatRow 
                    label="Turnovers" 
                    value={teamStats.turnovers} 
                  />
                </View>
              ) : (
                <View style={styles.statsContainer}>
                  <Text style={styles.noStatsText}>No stats available for this team</Text>
                </View>
              )}

              <TouchableOpacity 
                style={styles.closeButton}
                onPress={closeModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const StatRow = ({ label, value }: { label: string; value: any }) => (
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

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
    borderBottomWidth: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    marginBottom: 4
  },
  teamContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  teamInfo: {
    flex: 1
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600"
  },
  starButton: {
    padding: 8
  },
  star: {
    fontSize: 24,
    color: "#FFD700"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    maxHeight: "80%"
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
    color: "#666"
  },
  statsContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  statLabel: {
    fontSize: 15,
    color: "#555",
    fontWeight: "500"
  },
  statValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600"
  },
  closeButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center"
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  noStatsText: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic"
  }
});

export default Teams;