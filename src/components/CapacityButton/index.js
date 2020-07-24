import { gql, useApolloClient } from '@apollo/client';
import { Button } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { RestaurantContext } from '../../Contexts/RestaurantContext';

export const ManageCapacity = (props) => {
  const client = useApolloClient();
  const { restaurant, setRestaurant } = useContext(RestaurantContext);

  const onClick = async () => {
    const response = await client.mutate({
      mutation: gql`
        ${props.mutation}
      `,
      variables: {
        action: props.action,
        restaurantId: props.restaurantId,
      },
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          authorization: `Bearer ${props.accessToken}`,
        },
      },
    });
    if (
      response &&
      response.data &&
      response.data.business &&
      response.data.business.updateCapacity &&
      response.data.business.updateCapacity.data &&
      !response.data.business.updateCapacity.error
    ) {
      setRestaurant({ ...restaurant, capacity: response.data.business.updateCapacity.data.capacity });
    }
  };
  return (
    <Button style={props.StyleButton} onPress={onClick}>
      {props.text}
    </Button>
  );
};
