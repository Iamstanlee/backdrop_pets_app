import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './src/router';
import {FavouriteContextProvider} from './src/context/favourite_context';

const App = () => (
  <FavouriteContextProvider>
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  </FavouriteContextProvider>
);

export default App;
