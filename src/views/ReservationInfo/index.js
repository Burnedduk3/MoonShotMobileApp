import { StackActions } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TopSimpleHeader } from '../../components/Header';

export const ReservationInfo = (props) => {
  const navigateRegister = () => {
    props.navigation.dispatch(StackActions.push('Login'));
  };

  console.log(props);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopSimpleHeader navigation={props.navigation} />
      <Text>Reservation Info</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    margin: 50,
  },
  button: {
    width: '40%',
    marginBottom: 20,
  },
});
