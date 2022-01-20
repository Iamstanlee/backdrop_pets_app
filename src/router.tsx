import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Heart, Cat} from 'phosphor-react-native';
import {Colors, kFontFamily} from './constants';
import Favourite from './ui/favourite';
import Home from './ui/home';

const Tab = createBottomTabNavigator();

const Router = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
      },
      headerTitleStyle: {
        fontFamily: kFontFamily,
        marginLeft: 12,
        fontWeight: '600',
      },
      tabBarLabelStyle: {
        fontFamily: kFontFamily,
      },
      tabBarStyle: {
        height: 64,
        paddingBottom: 10,
      },
      tabBarActiveTintColor: Colors.kBlack,
      tabBarInactiveTintColor: Colors.kGray,
    }}>
    <Tab.Screen
      name="All Dogs"
      options={{
        tabBarIcon: ({color, size, focused}) => (
          <Cat
            size={size}
            color={color}
            weight={focused ? 'fill' : 'regular'}
          />
        ),
      }}
      component={Home}
    />
    <Tab.Screen
      name="Dogs I Like"
      options={{
        tabBarIcon: ({color, size, focused}) => (
          <Heart
            size={size}
            color={color}
            weight={focused ? 'fill' : 'regular'}
          />
        ),
      }}
      component={Favourite}
    />
  </Tab.Navigator>
);

export default Router;
