import { gql, useQuery } from '@apollo/client';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { RestaurantHeader } from '../../components/Header';
import { RestaurantContext } from '../../Contexts/RestaurantContext';
import { TokenContext } from '../../Contexts/TokenContext';
import { ViewText, getRestaurant } from './TextConstants';

export const ManageRestaurant = (props) => {
  const { tokens } = useContext(TokenContext);
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  const [error, setError] = useState(false);
  const { loading, data } = useQuery(
    gql`
      ${getRestaurant}
    `,
    {
      fetchPolicy: 'network-only',
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
    }
  }, [loading]);

  return (
    <>
      {!loading && !error && restaurant && (
        <>
          <RestaurantHeader RestaurantName={restaurant.name} />
          <SafeAreaView style={styles.container}>
            <View style={styles.dataContainer}>
              <Text category="p1" style={styles.dataTitle}>
                {ViewText.emptyPlaces.title}
              </Text>
              <Text category="p1" style={styles.dataText}>
                {(restaurant.maxCapacity - restaurant.capacity).toString() + ViewText.emptyPlaces.postfix}
              </Text>
            </View>
            <View style={styles.dataContainer}>
              <Text category="p1" style={styles.dataTitle}>
                {ViewText.capacity.title}
              </Text>
              <Text category="p1" style={styles.dataText}>
                {restaurant.capacity.toString() + '/' + restaurant.maxCapacity.toString()}
              </Text>
            </View>
          </SafeAreaView>
        </>
      )}
      {loading && <Spinner size="giant" />}
      {error && <Text category="h2">Something Has happened</Text>}
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
  dataContainer: {
    flexDirection: 'column',
    width: '80%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EA3F6A',
    borderRadius: 20,
    marginBottom: 20,
  },
  dataTitle: {
    color: '#EA3F6A',
    marginBottom: 5,
    fontSize: 20,
  },
  dataText: {
    color: '#EA3F6A',
    fontSize: 20,
  },
});
