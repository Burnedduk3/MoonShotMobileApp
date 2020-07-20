import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { StackActions } from '@react-navigation/native';
import { TextConstants } from './constants';

export const HomeScreen = ({ navigation }) => {
  const navigateRegister = () => {
    navigation.dispatch(StackActions.replace('Login'));
  };

  const navigateLogin = () => {
    navigation.dispatch(StackActions.replace('Register'));
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Layout style={styles.layout}>
        {/*<Image*/}
        {/*	style={styles.headerImage}*/}
        {/*	source={iconTop}*/}
        {/*/>*/}
        <Text style={styles.title} category="h3">
          {TextConstants.title}
        </Text>
        <Button style={styles.button} onPress={navigateRegister}>
          {'Login'}
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  layout: {
    backgroundColor: '#EA3F6A',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    margin: 50,
  },
  title: {
    color: '#ffffff',
    marginBottom: '10%',
  },
  button: {
    marginTop: 10,
    width: '60%',
    borderColor: '#ffffff',
  },
});
