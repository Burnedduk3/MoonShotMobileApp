import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Header } from '../../components/Header';

export const CheckReservation = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Text category="h2">Check</Text>
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
