import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, ScrollView } from 'react-native';

// Import the updated apiCall function
import { apiCall } from '../ApiScripts';

const ApiCallView = () => {
  const [isLoading, setLoading] = useState(true);
  const [jsonResponse, setJsonResponse] = useState(null);

  useEffect(() => {
    // TODO: Replace this with your own backend endpoint
    // Example: `${API_BASE_URL}/games?teamId=1&season=2024`
    const endpoint = 'http://localhost:8080/api/games?teamId=1&season=2024';

    const fetchData = async () => {
      try {
        console.log('Making API call...');
        const data = await apiCall(endpoint); // Changed to capture return value
        setJsonResponse(data); // Set response manually
        console.log('API call completed.');
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        setLoading(false);
        console.log('Loading set to false');
      }
    };

    fetchData();
  }, []);

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
