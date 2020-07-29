import { gql, useQuery } from '@apollo/client';
import { Spinner, Text } from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { RestaurantHeader } from '../../components/Header';
import { RestaurantContext } from '../../Contexts/RestaurantContext';
import { TokenContext } from '../../Contexts/TokenContext';
import { UserContext } from '../../Contexts/UserContext';
import { ViewText, getRestaurant, updateRestaurantCapacity } from './TextConstants';
import { DataContainer } from '../../components/RestaurantData';
import { ManageCapacity } from '../../components/CapacityButton';

export const ManageRestaurant = () => {
  const { tokens } = useContext(TokenContext);
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  const [errors, setErrors] = useState(false);
  const { user } = useContext(UserContext);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { loading, data } = useQuery(
    gql`
      ${getRestaurant}
    `,
    {
      fetchPolicy: 'network-only',
      variables: { username: user.username },
      context: {
        headers: {
          authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    },
  );

  useEffect(() => {
    if (!loading && data) {
      setRestaurant({
        address: data.Business.getMyRestaurant.data.address,
        capacity: parseInt(data.Business.getMyRestaurant.data.capacity),
        maxCapacity: parseInt(data.Business.getMyRestaurant.data.maxCapacity),
        name: data.Business.getMyRestaurant.data.name,
        phoneNumber: data.Business.getMyRestaurant.data.phoneNumber,
        restaurantIdentifier: data.Business.getMyRestaurant.data.restaurantIdentifier,
      });
      setErrors(false);
    } else {
      setErrors(true);
    }
  }, [loading]);
  return (
    <>
      {!loading && !errors && (
        <>
          <RestaurantHeader RestaurantName={restaurant.name} />
          <SafeAreaView style={styles.container}>
            <DataContainer
              title={ViewText.emptyPlaces.title}
              data={(restaurant.maxCapacity - restaurant.capacity).toString() + ViewText.emptyPlaces.postfix}
            />
            <DataContainer
              title={ViewText.capacity.title}
              data={restaurant.capacity + '/' + restaurant.maxCapacity.toString()}
            />
            <View style={styles.buttons}>
              <>
                <ManageCapacity
                  StyleButton={styles.button}
                  text="-"
                  action="substraction"
                  restaurantId={restaurant.restaurantIdentifier}
                  mutation={updateRestaurantCapacity}
                  accessToken={tokens.accessToken}
                  buttonLoading={setButtonLoading}
                  disabled={buttonLoading}
                />
                <ManageCapacity
                  StyleButton={styles.button}
                  text="+"
                  action="add"
                  restaurantId={restaurant.restaurantIdentifier}
                  mutation={updateRestaurantCapacity}
                  accessToken={tokens.accessToken}
                  buttonLoading={setButtonLoading}
                  disabled={buttonLoading}
                />
              </>
            </View>
          </SafeAreaView>
        </>
      )}
      {loading && (
        <>
          <RestaurantHeader RestaurantName="loading" />
          <Spinner size="giant" />
        </>
      )}
      {errors && !loading && <Text category="h2">Something Has happened</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 70,
    height: 70,
  },
});
