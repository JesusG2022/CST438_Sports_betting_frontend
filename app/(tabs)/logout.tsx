import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navagation/types";

// Define the type for navigation in LogoutScreen
type LogoutScreenNavigationProp = StackNavigationProp<RootStackParamList, "Logout">;

const LogoutScreen = () => {
  const navigation = useNavigation<LogoutScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared");

      // Navigate to Home screen after logout (ok for some reason u have to go to file name not component name)
      navigation.navigate("index");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
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
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default LogoutScreen;


