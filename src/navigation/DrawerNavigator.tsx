import {DrawerComponent} from '@/components';
import {NAVIGATION} from '@/constants';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Home} from '@/screen';

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NAVIGATION.home}
      drawerContent={props => <DrawerComponent {...props} />}>
      <Drawer.Screen name={NAVIGATION.home} component={Home} />
    </Drawer.Navigator>
  );
}
