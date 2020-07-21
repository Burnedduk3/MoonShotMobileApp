import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TextConstants } from './Constants';

export const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.text} category="h1">
        {TextConstants.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EA3F6A',
    flexDirection: 'row',
    height: '10%',
  },
  text: {
    color: '#ffffff',
  },
});

export const RestaurantHeader = (props) => {
  return (
    <View style={restaurantStyles.headerContainer}>
      <Text style={restaurantStyles.text} category="h1">
        {props.RestaurantName}
      </Text>
    </View>
  );
};

const restaurantStyles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EA3F6A',
    flexDirection: 'row',
    height: '10%',
    alignSelf: 'center',
  },
  text: {
    color: '#ffffff',
  },
});
