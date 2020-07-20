import { Button, Card, Modal, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

export const ErrorPopUp = (props) => {
  const [error, setError] = useState(true);
  return (
    <Modal visible={error} backdropStyle={styles.backdrop}>
      <Card disabled={true}>
        <Text style={styles.modalText} category="h2">
          {props.text}
        </Text>
        <Button
          onPress={() => {
            setError(false);
            props.onModalPressed();
          }}
        >
          {props.buttonText}
        </Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalText: {
    margin: 10,
    fontSize: 15,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
