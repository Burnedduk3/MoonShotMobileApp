import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { ErrorPopUp } from '../../components/ErrorPopUp';
import { TokenContext } from '../../Contexts/TokenContext';
import { UserContext } from '../../Contexts/UserContext';
import { TextConstants, queryConstants } from './QueryConstants';
import { gql, useLazyQuery } from '@apollo/client';
import { Button, Icon, Input, Layout, Spinner } from '@ui-kitten/components';

export const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const [getLogin, { loading, data }] = useLazyQuery(
    gql`
      ${queryConstants.loginUsernamePassword}
    `,
    { fetchPolicy: 'network-only' },
  );
  const { tokens, setTokens } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  const navigateMainContent = () => {
    props.navigation.dispatch(StackActions.replace('mainContent'));
  };

  const goBack = () => {
    props.navigation.dispatch(StackActions.replace('Home'));
  };

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onLogin = async () => {
    getLogin({ variables: { username, password } });
  };

  useEffect(() => {
    if (!loading && data) {
      if (!data.auth || !data.auth.login || !data.auth.login.loginWithUsernameAndPassword) {
        setError(true);
      } else {
        if (data.auth.login.loginWithUsernameAndPassword.error) {
          setError(true);
        } else {
          if (
            data.auth.login.loginWithUsernameAndPassword.user.role.name === 'business' ||
            data.auth.login.loginWithUsernameAndPassword.user.role.name === 'admin'
          ) {
            setTokens({
              accessToken: data.auth.login.loginWithUsernameAndPassword.data.accessToken,
              refreshToken: data.auth.login.loginWithUsernameAndPassword.data.refreshToken,
            });
            setUser(data.auth.login.loginWithUsernameAndPassword.user);
            if (!error && user && tokens) {
              navigateMainContent();
            }
          } else {
            setWrongUser(true);
          }
        }
      }
    }
  }, [loading]);

  const onModalPressed = () => {
    setError(false);
    setWrongUser(false);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={() => onIconPress()}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Layout style={styles.layout}>
        <Input
          placeholder={TextConstants.inputs.inputUser.placeholder}
          value={username}
          onChangeText={(value) => {
            setUsername(value.trim());
          }}
          style={styles.input}
        />

        <Input
          value={password}
          onChangeText={setPassword}
          placeholder={TextConstants.inputs.inputPassword.placeholder}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          style={styles.input}
        />
        {error && (
          <ErrorPopUp
            text={TextConstants.modal.text}
            buttonText={TextConstants.modal.button}
            onModalPressed={onModalPressed}
          />
        )}
        {wrongUser && (
          <ErrorPopUp
            text={TextConstants.wrongUser.text}
            buttonText={TextConstants.wrongUser.button}
            onModalPressed={onModalPressed}
          />
        )}
        {loading ? (
          <Spinner status="info" size="giant" />
        ) : (
          <Button onPress={() => onLogin()} style={styles.button}>
            {TextConstants.buttons.loginButton}
          </Button>
        )}
        {/*<Button onPress= style={styles.button} appearance="primary">*/}
        {/*  {TextConstants.buttons.forgotPassword}*/}
        {/*</Button>*/}
        <Button onPress={goBack} style={styles.button} appearance="primary">
          {TextConstants.buttons.backHome}
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  layout: {
    backgroundColor: '#EA3F6A',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    width: '60%',
    borderColor: '#ffffff',
  },
  input: {
    margin: 10,
    width: '70%',
  },

  modalText: {
    margin: 10,
    fontSize: 15,
  },
});
