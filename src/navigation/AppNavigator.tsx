import {NAVIGATION} from '@/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DrawerNavigator} from './DrawerNavigator';

const RootStack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        options={{headerShown: false}}
        name={NAVIGATION.home}
        // component={TabNavigator}
        component={DrawerNavigator}
      />
    </RootStack.Navigator>
  );
}
