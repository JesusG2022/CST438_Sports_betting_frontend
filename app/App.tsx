
// App.tsx (or wherever your navigation is set up)
// ANDROID: 903290334581-9rqa6mf7il4rbndgckl86js5hk86ie9h.apps.googleusercontent.com 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../app/(tabs)/index'; // Your main screen
import LoginScreen from './(tabs)/login';
import AccountCreation from './AccountCreation'; // The account creation screen
import { RootStackParamList } from '../src/types/types'; // Navigation types
import FavoriteTeamsList from './(tabs)/FavoriteTeams';
import LogoutScreen from './(tabs)/logout';

const Stack = createStackNavigator<RootStackParamList>(); // Typing the navigator

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name ="AccountCreation" component={AccountCreation} /> {/* Ensure this is the correct screen name */}
        <Stack.Screen name ="FavoriteTeams" component ={FavoriteTeamsList}/>
        <Stack.Screen name="Logout" component={LogoutScreen} /> {/* Add LogoutScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
