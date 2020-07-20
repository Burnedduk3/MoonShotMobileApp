import { StackActions } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Header } from '../../components/Header';

export const CheckReservation = ({ navigation }) => {
  const [componentLoading, setComponentLoading] = useState(true);

  useEffect(() => {
    setComponentLoading(false);
  }, []);

  const navigateRegister = () => {
    navigation.dispatch(StackActions.replace('useLogin'));
  };

  const navigateLogin = () => {
    navigation.dispatch(StackActions.replace('Register'));
  };

  return componentLoading ? (
    <></>
  ) : (
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
