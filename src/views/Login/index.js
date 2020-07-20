import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { TokenContext } from '../../Contexts/TokenContext';
import { UserContext } from '../../Contexts/UserContext';
import { TextConstants, queryConstants } from './QueryConstants';
import { gql, useApolloClient } from '@apollo/client';
import { Button, Card, Icon, Input, Layout, Modal, Spinner, Text } from '@ui-kitten/components';

export const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const apolloClient = useApolloClient();
  const { tokens, setTokens } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  const navigateMainContent = () => {
    props.navigation.dispatch(StackActions.replace('mainContent'));
  };

  const goBack = () => {
    props.navigation.dispatch(StackActions.replace('Home'));
  };

  const onForgetPassword = async () => {};

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onLogin = async () => {
    setLoading(true);
    try {
      const { data } = await apolloClient.query({
        query: gql`
          ${queryConstants.loginUsernamePassword}
        `,
        variables: { username, password },
      });
      setLoading(false);
      if (!data || !data.auth || !data.auth.login || !data.auth.login.loginWithUsernameAndPassword)
        throw new Error('Something Happened');
      if (!data.auth.login.loginWithUsernameAndPassword.error) {
        setError(false);
        setTokens({
          accessToken: data.auth.login.loginWithUsernameAndPassword.data.accessToken,
          refreshToken: data.auth.login.loginWithUsernameAndPassword.data.refreshToken,
        });
        setUser(data.auth.login.loginWithUsernameAndPassword.user);
        if (!error && user && tokens) {
          navigateMainContent();
        }
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  const renderLoginButton = () => {
    return isloading ? (
      <Spinner status="info" size="giant" />
    ) : (
      <Button onPress={onLogin} style={styles.button}>
        {TextConstants.buttons.loginButton}
      </Button>
    );
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={onIconPress}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderErrorAtLogin = () => {
    return error ? (
      <Modal visible={error} backdropStyle={styles.backdrop} onBackdropPress={() => setError(false)}>
        <Card disabled={true}>
          <Text style={styles.modalText} category="h2">
            {TextConstants.modal.text}
          </Text>
          <Button onPress={() => setError(false)}>{TextConstants.modal.button}</Button>
        </Card>
      </Modal>
    ) : (
      <></>
    );
  };

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
        {renderErrorAtLogin()}
        {renderLoginButton()}
        <Button onPress={onForgetPassword} style={styles.button} appearance="primary">
          {TextConstants.buttons.forgotPassword}
        </Button>
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    margin: 10,
    fontSize: 15,
  },
});
