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
  Platform,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../src/types/navigation";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from "@react-native-async-storage/async-storage";

// Safe alert function that waits for activity to be ready
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'android') {
    // Delay alert on Android to ensure Activity is attached
    setTimeout(() => {
      Alert.alert(title, message);
    }, 500);
  } else {
    Alert.alert(title, message);
  }
};

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Configure redirect URI for native builds
  const redirectUri = AuthSession.makeRedirectUri({
    native: 'com.example.gambleapp://',
  });

  console.log('Redirect URI:', redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "903290334581-9rqa6mf7il4rbndgckl86js5hk86ie9h.apps.googleusercontent.com",
    redirectUri: redirectUri,
  });

  // Handle Google OAuth response
  useEffect(() => {
    console.log('OAuth Response:', response);
    
    if (response?.type === "success") {
      console.log('OAuth Success - Access Token:', response.authentication?.accessToken);
      handleSignInWithGoogle();
    } else if (response?.type === "error") {
      console.error("Google sign-in error:", response.error);
      showAlert("Error", "Failed to sign in with Google");
    } else if (response?.type === "cancel") {
      console.log("User cancelled Google sign-in");
    }
  }, [response]);

  async function handleSignInWithGoogle() {
    try {
      setLoading(true);
      
      if (response?.type === "success" && response.authentication?.accessToken) {
        const user = await getUserInfo(response.authentication.accessToken);
        
        if (user) {
          await AsyncStorage.setItem("username", JSON.stringify(user));
          await AsyncStorage.setItem("userID", user.id || "");
          setUserInfo(user);
          
          // Navigate first, then show alert
          navigation.navigate("FavoriteTeams");
          
          // Show welcome message after navigation
          setTimeout(() => {
            showAlert("Success", `Welcome ${user.name}!`);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      showAlert("Error", "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  }

  const getUserInfo = async (token: string) => {
    if (!token) return null;
    
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      
      const user = await response.json();
      console.log("User info:", user);
      return user;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      throw error;
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      showAlert("Error", "Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://project2cst438group9-70c9b7b662e0.herokuapp.com/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          userPassword: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userID", data.id.toString());
        await AsyncStorage.setItem("username", data.userName);

        // Navigate first
        navigation.navigate("FavoriteTeams", { username: data.userName, userId: data.id });
        
        // Show alert after navigation
        setTimeout(() => {
          showAlert("Welcome", `Hello, ${data.userName}!`);
        }, 500);
      } else {
        showAlert("Error", data.message || "Login failed.");
      }
    } catch (error) {
      showAlert("Error", "An error occurred while verifying login.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require("../../assets/images/loginPic2.jpg")} 
      style={styles.backgroundImage}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!loading}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Login" onPress={handleLogin} disabled={loading} />
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.buttonContainer}>
              <Button 
                title="Sign in with Google" 
                onPress={() => promptAsync()} 
                disabled={!request || loading}
                color="#4285F4"
              />
            </View>
          </>
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
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
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
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});