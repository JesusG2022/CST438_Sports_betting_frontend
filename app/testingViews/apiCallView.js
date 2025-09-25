import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, ScrollView } from 'react-native';

// Make sure the apiCall function is imported properly
import { apiCall } from '../ApiScripts';

const ApiCallView = () => {
  const [isLoading, setLoading] = useState(true);
  const [jsonResponse, setJsonResponse] = useState(null);

  useEffect(() => {
    const endpoint = 'https://api-nba-v1.p.rapidapi.com/games?season=2024&team=1';

    // Had some bugs with infinite wrote asynch function to log if there is an error in the api call
    // or if loading is never set to false
    const fetchData = async () => {
      try {
        console.log('Making API call...');
        await apiCall(endpoint, setJsonResponse);
        console.log('API call completed.');
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        setLoading(false);
        console.log('Loading set to false');
      }
    };

    fetchData();
  }, []); //

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Text>{JSON.stringify(jsonResponse, null, 2)}</Text>
        </ScrollView>
      )}
    </View>
  );
};

export default ApiCallView;

//-------------------------Useful Endpoints --------------------------------------

    // // API Documentation = https://api-sports.io/documentation/nba/v2

    // // Endpoint to show the current standings of Nba Teams
    // const endpointStandings = 'https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2024';

    // // Schedule Endpoint (A LOT OF GOOD INFORMATION)
    // const endpointSchedule = 'https://api-nba-v1.p.rapidapi.com/games?season=2024&team=1' ;

    // //endpoint for games betewen teams
    // const endpointGamesBetweenTeams = 'https://api-nba-v1.p.rapidapi.com/games?h2h=1-2';

    // //endpoint for Searching Team
    // const endpointSearchTeams = 'https://api-nba-v1.p.rapidapi.com/teams?search=atl';

    // //endpoint for Games per Date (Note the format of date)

    // const endpointGamesByDate = 'https://api-nba-v2.p.rapidapi.com/games?date=2022-02-12';

    // //endpoint for Teams by ID (If we log all team ID's that would be helpful)
    // const endpointTeamsByID = 'https://api-nba-v2.p.rapidapi.com/teams?id=1';

    // //endpoint for team stats
    // const endpointTeamStats = "https://v2.nba.api-sports.io/teams/statistics?season=2024&id=1"
 //--------------------------------------------------------------------------------
  