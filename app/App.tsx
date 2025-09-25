
// App.tsx (or wherever your navigation is set up)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../app/(tabs)/index'; // Your main screen
import LoginScreen from './(tabs)/login';
import AccountCreation from './AccountCreation'; // The account creation screen
import { RootStackParamList } from '../app/navagation/types'; // Navigation types
import FavoriteTeams from './(tabs)/favoriteTeams';
import LogoutScreen from './(tabs)/logout';

const Stack = createStackNavigator<RootStackParamList>(); // Typing the navigator

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name ="AccountCreation" component={AccountCreation} /> {/* Ensure this is the correct screen name */}
        <Stack.Screen name ="FavoriteTeams" component ={favoriteTeams}/>
        <Stack.Screen name="Logout" component={LogoutScreen} /> {/* Add LogoutScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
