import { ImageBackground, } from 'expo-image';
import React from 'react';

export default function teamSelectionScreen() {
  return (
    <ImageBackground style={styles.background} source={require('../../assets/images/teamCountry.jpg')}></ImageBackground>
  );
}

