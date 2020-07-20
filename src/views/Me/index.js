import { Button } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { UserInfo } from '../../components/UserInfo';
import { TokenContext } from '../../Contexts/TokenContext';
import { UserContext } from '../../Contexts/UserContext';

export const Me = (props) => {
  const { setTokens } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);

  const navigateRegister = () => {
    props.navigation.dispatch(StackActions.replace('Home'));
  };

  const onLogOut = () => {
    setTokens({ accessToken: '', refreshToken: '' });
    setUser({});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <Header />
      <UserInfo />
      <Button style={styles.button} onPress={onLogOut}>
        Desconectarse
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginBottom: 50,
    width: '70%',
  },
});
