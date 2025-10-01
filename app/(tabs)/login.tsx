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

// Google OAuth Client IDs
// Get these from: https://console.cloud.google.com/apis/credentials
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_EXPO_CLIENT_ID || "235409881865-ib1ic7akumtkb50bkt2crnr4r9brun35.apps.googleusercontent.com";
const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_EXPO_ANDRIOD_ID || "235409881865-1jggrffjk7vkoiejp54cdklb53bh20ut.apps.googleusercontent.com";
const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID; // Add iOS client ID later if needed

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbInitialized, setDbInitialized] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
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
      
      // You can fetch user info here with the access token
      // fetchUserInfo(authentication?.accessToken);
      
      navigation.navigate("favoriteTeams", { username: "google-user" });
    } else if (response?.type === 'error') {
      console.error('OAuth error:', response.error);
      Alert.alert('Error', `Authentication failed: ${response.error?.message || 'Unknown error'}`);
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
      console.log('Request config:', request);

      const result = await promptAsync();
      console.log('Auth result:', JSON.stringify(result, null, 2));
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

        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={handleGoogleSignIn}
          disabled={!request}
        >
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