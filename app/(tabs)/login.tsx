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
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navagation/types";
import loginPic from "../../assets/images/loginPic2.jpg";
import { verifyUserLogin, getUserID, initializeDatabase } from "../../database/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from 'expo-auth-session';

// Initialize WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

// NOTE: You must register OAuth client IDs with Google and add the redirect URI that Expo uses.
const CLIENT_ID = process.env.EXPO_CLIENT_ID || "YOUR_EXPO_CLIENT_ID";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbInitialized, setDbInitialized] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    scopes: ['profile', 'email']
  });

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

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Authentication successful:', authentication);
      navigation.navigate("favoriteTeams", { username: "google-user" });
    }
  }, [response, navigation]);

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
          await AsyncStorage.setItem("username", username);
          Alert.alert("Welcome", "You are now logged in!");

          setTimeout(() => {
            navigation.navigate("favoriteTeams", { username });
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

  const handleGoogleSignIn = async () => {
    try {
      // Log the redirect URI that will be used
      const redirectUri = makeRedirectUri();
      console.log('Redirect URI:', redirectUri);

      const result = await promptAsync();
      console.log('Auth result:', JSON.stringify(result, null, 2));

      if (result.type === 'success') {
        // The useEffect above will handle the success case
        console.log('Sign in successful');
      } else {
        console.log('Sign in was cancelled or failed:', result);
        Alert.alert('Error', 'Google sign in was cancelled or failed.');
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      Alert.alert('Error', 'Failed to sign in with Google. ' + (error.message || 'Unknown error'));
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

        <View style={{ height: 20 }} />

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
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
  googleButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 8,
  },
  googleButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});