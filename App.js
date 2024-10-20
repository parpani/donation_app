import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';

import MainNavigation from './navigation/MainNavigation';
import { getFontFamily } from './assets/fonts/helper';
import { NavigationContainer } from '@react-navigation/native';

// Importing the Provider component from the React Redux library
// The Provider component is a higher-order component that provides the Redux store to all components in the app
import {Provider} from 'react-redux';
import store from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './redux/store';

const App = () =>{

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
