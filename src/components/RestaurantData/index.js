import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const DataContainer = (props) => (
  <View style={styles.dataContainer}>
    <Text category="p1" style={styles.dataTitle}>
      {props.title}
    </Text>
    <Text category="p1" style={styles.dataText}>
      {props.data}
    </Text>
  </View>
);

const styles = StyleSheet.create({
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
