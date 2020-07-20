import React from 'react';
import { SafeAreaView } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const CalendarIcon = (style) => <Icon {...style} name="calendar" />;

const HomeIcon = (style) => <Icon {...style} name="home-outline" />;

const ProfileIcon = (style) => <Icon {...style} name="person-outline" />;

const BottomTabBar = ({ navigation, state }) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title="Chekear" icon={HomeIcon} />
        <BottomNavigationTab title="Horario" icon={CalendarIcon} />
        <BottomNavigationTab title="Perfil" icon={ProfileIcon} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

export default BottomTabBar;
