import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import loginPic from "../../assets/images/loginPic2.jpg";
import { verifyUserLogin, getUserID, initializeDatabase } from "../../database/db";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbInitialized, setDbInitialized] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const initializeDb = async () => {
      try {
        await initializeDatabase();
        setDbInitialized(true);
      } catch (error) {
        console.error("Database initialization error:", error);
        Alert.alert("Error", "An error occurred while initializing the database.");
      }
    };

    initializeDb();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const isValidUser = await verifyUserLogin(username, password);
      setLoading(false);

      if (isValidUser) {
        const userID = await getUserID(username);

        if (userID) {
          //await AsyncStorage.setItem("userID", userID.toString()); // Store userID
          await AsyncStorage.setItem("username", username);  // Store username
          Alert.alert("Welcome", "You are now logged in!");

          setTimeout(() => {
            navigation.navigate("favoriteTeams", { username }); // Pass username via favoriteTeams
          }, 500);
        } else {
          Alert.alert("Error", "User not found.");
        }
      } else {
        Alert.alert("Error", "Incorrect username or password.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "An error occurred while verifying login.");
      console.error(error);
    }
  };

  if (!dbInitialized) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ImageBackground source={loginPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Login" onPress={handleLogin} />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "80%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
});