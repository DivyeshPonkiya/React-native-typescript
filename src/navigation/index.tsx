import {navigationRef} from '@/navigation/NavigationRef';
// import {session} from '@/selectors/LoginSelector';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {AppNavigator} from './AppNavigator';
import {AuthNavigator} from './AuthNavigator';

export function RootNavigator() {
  // const Session = useSelector(session);

  return (
    <NavigationContainer ref={navigationRef}>
      {/* {Session == false ? <AuthNavigator /> : <AppNavigator />} */}
      <AuthNavigator />
    </NavigationContainer>
  );
}
