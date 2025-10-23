import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../src/types/types";

type LogoutScreenNavigationProp = StackNavigationProp<RootStackParamList, "Logout">;

const LogoutScreen = () => {
  const navigation = useNavigation<LogoutScreenNavigationProp>();
  const [username, setUsername] = useState<string | null>(null);

  // Load username from AsyncStorage
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedName = await AsyncStorage.getItem("username");
        if (storedName) {
          try {
            const parsed = JSON.parse(storedName);
            setUsername(parsed.name || parsed.userName || parsed);
          } catch {
            setUsername(storedName);
          }
        } else {
          setUsername(null);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();

    // Also listen for navigation focus — refresh if coming back
    const unsubscribe = navigation.addListener("focus", fetchUsername);
    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("userID");
      await AsyncStorage.clear();

      // Immediately clear the local state too
      setUsername(null);
      console.log("AsyncStorage cleared completely");

      // Small delay to ensure navigation refreshes cleanly
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "login" }],
        });
      }, 200);
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      {username ? (
        <Text style={styles.usernameText}>
          Logged in as <Text style={styles.usernameHighlight}>{username}</Text>
        </Text>
      ) : (
        <Text style={styles.usernameText}>No active user session</Text>
      )}
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  usernameText: {
    fontSize: 18,
    marginBottom: 10,
  },
  usernameHighlight: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default LogoutScreen;
