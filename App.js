import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';

import MainNavigation from './navigation/MainNavigation';
import { getFontFamily } from './assets/fonts/helper';
import { NavigationContainer } from '@react-navigation/native';

const App = () =>{

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}

export default App;
