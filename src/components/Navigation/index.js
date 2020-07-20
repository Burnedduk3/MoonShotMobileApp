import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TokenContext } from '../../Contexts/TokenContext';
import { UserContext } from '../../Contexts/UserContext';
import { useTokens, useUser } from '../../hooks/useLogin';
import { CheckReservation } from '../../views/CheckReservation';
import { HomeScreen } from '../../views/Home';
import { LoginScreen } from '../../views/Login';
import { Me } from '../../views/Me';
import { SeeCalendar } from '../../views/ReservationPanel';
import BottomTabBar from '../TabBar';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="CheckReservation" component={CheckReservation} />
    <BottomTab.Screen name="SeeReservations" component={SeeCalendar} />
    <BottomTab.Screen name="Profile" component={Me} />
  </BottomTab.Navigator>
);
const HomeNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="mainContent" component={TabNavigator} />
  </Stack.Navigator>
);
export const AppNavigator = () => {
  const [tokens, setTokens] = useTokens();
  const [user, setUser] = useUser();
  return (
    <TokenContext.Provider value={{ tokens, setTokens }}>
      <UserContext.Provider value={{ user, setUser }}>
        <HomeNavigator />
      </UserContext.Provider>
    </TokenContext.Provider>
  );
};
