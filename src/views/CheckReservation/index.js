import { gql, useQuery } from '@apollo/client';
import { StackActions } from '@react-navigation/native';
import { Button, Input, Spinner, Text } from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { TokenContext } from '../../Contexts/TokenContext';
import { QueryConstants } from './TextConstants';

export const CheckReservation = ({ navigation }) => {
  const [reservationCode, setReservationCode] = useState('');
  const { tokens } = useContext(TokenContext);
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [searchReservation, setSearchReservation] = useState(false);
  const { loading, data } = useQuery(
    gql`
      ${QueryConstants.getReservation}
    `,
    {
      fetchPolicy: 'no-cache',
      variables: { reservationId: reservationCode },
      context: {
        headers: {
          authorization: `Bearer ${tokens.accessToken}`,
        },
      },
      skip: !searchReservation,
    },
  );
  const navigateRegister = () => {
    navigation.dispatch(StackActions.replace('CheckReservation', { reservation }));
  };

  const searchReservationQuery = async () => {
    setSearchReservation(true);
  };

  useEffect(() => {
    if (loading && data) {
      if (!data.user.getReservationById.error) {
        setReservation({ ...data.user.getReservationById.data });
        setError(false);
        setRedirect(true);
      } else {
        setError(true);
        setReservation(null);
      }
    }
    setSearchReservation(false);
  }, [loading]);

  if (redirect) {
    navigateRegister();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.inputsContainer}>
        <Input
          style={styles.input}
          status="primary"
          label="Codigo Reserva"
          placeholder="Primary"
          value={reservationCode}
          onChangeText={(value) => {
            setReservationCode(value.trim());
          }}
          autoCapitalize="none"
        />
        {!loading && (
          <Button style={styles.button} onPress={() => searchReservationQuery()}>
            Check-in
          </Button>
        )}
        {loading && <Spinner style={styles.spinner} size="giant" />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  inputsContainer: {
    height: '50%',
    width: '80%',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  spinner: {
    alignSelf: 'center',
  },
  button: {
    width: '100%',
  },
});
