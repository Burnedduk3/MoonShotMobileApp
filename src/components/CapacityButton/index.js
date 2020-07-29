import { gql, useApolloClient } from '@apollo/client';
import { Button, Layout, Popover, Text } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { RestaurantContext } from '../../Contexts/RestaurantContext';
import { ErrorConstants } from './constants';

export const ManageCapacity = (props) => {
  const client = useApolloClient();
  const { restaurant, setRestaurant } = useContext(RestaurantContext);
  const [visible, setVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const onClick = async () => {
    props.buttonLoading(true);
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
      props.buttonLoading(false);
    } else {
      setVisible(true);
      if (response.data.business.updateCapacity.message === 'Max capacity reached') {
        setErrorMessage(ErrorConstants.maxCapacity);
      }

      if (response.data.business.updateCapacity.message === 'Capacity can not be below 0') {
        setErrorMessage(ErrorConstants.below0);
      }
      props.buttonLoading(false);
    }
  };

  const renderToggleButton = () => (
    <Button style={props.StyleButton} onPress={onClick} disabled={props.disabled}>
      {props.text}
    </Button>
  );

  return (
    <>
      <Popover
        anchor={renderToggleButton}
        visible={visible}
        placement={'top'}
        onBackdropPress={() => setVisible(false)}
      >
        <Layout style={styles.content}>
          <Text>{errorMessage}</Text>
        </Layout>
      </Popover>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 64,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    maxWidth: 200,
  },
});
