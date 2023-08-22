import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthNavigator} from './src/navigation/AuthNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthNavigator />
    </SafeAreaProvider>
  );
};
export default App;
