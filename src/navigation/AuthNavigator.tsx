import React from 'react';
import {NAVIGATION} from '../constants/index';
import {Home, List} from '../screen/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StackParamList} from './Navigator';

const Stack = createNativeStackNavigator<StackParamList>();

// const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'List'}
          component={List}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
