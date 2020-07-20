import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {StackActions} from '@react-navigation/native';

export const addCompanion = ({navigation}) => {
	const navigateRegister = () => {
		navigation.dispatch(
			StackActions.replace('useLogin')
		);
	};

	const navigateLogin = () => {
		navigation.dispatch(
			StackActions.replace('Register')
		);
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<h1>Companion</h1>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerImage: {
		margin: 50
	},
	button: {
		width: '40%',
		borderColor:'#ffffff',
		marginBottom: 20
	},
});
