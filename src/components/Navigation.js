import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ChekReservation } from '../views/CheckReservation';
import { HomeScreen } from '../views/Home';
import { LoginScreen } from '../views/Login';
import { Me } from '../views/Me';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();


const TabNavigator = () => (
	<BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
		<BottomTab.Screen name='News' component={ChekReservation}/>
		<BottomTab.Screen name='Events' component={Me}/>
	</BottomTab.Navigator>
);
const HomeNavigator = () => (
	<Stack.Navigator headerMode='none'>
		<Stack.Screen name='Home' component={HomeScreen}/>
		<Stack.Screen name='Login' component={LoginScreen}/>
		<Stack.Screen name='mainContent' component={TabNavigator}/>
	</Stack.Navigator>
);
export const AppNavigator = () => (
	<HomeNavigator/>
);
