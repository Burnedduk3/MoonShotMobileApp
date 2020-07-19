import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {StackActions} from '@react-navigation/native';

export const Me = ({navigation}) => {
	const navigateRegister = () => {
		navigation.dispatch(
			StackActions.replace('Login')
		);
	};

	const navigateLogin = () => {
		navigation.dispatch(
			StackActions.replace('Register')
		);
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<h1>Me</h1>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerImage: {
		margin: 50
	},
	button: {
		width: '40%',
		marginBottom: 20
	},
});
