import React from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Icon, Input, Layout, Spinner} from '@ui-kitten/components';
import {StackActions} from '@react-navigation/native';

export const LoginScreen = (props) => {
	const [mail, setMail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);
	const [isLoading, setLoading] = React.useState(false);

	const navigateMainContent = () => {
		setLoading(false);
		props.navigation.dispatch(
			StackActions.replace('mainContent')
		);
	};

	const onLogin = async () => {
	};

	const goBack = () =>{
		props.navigation.dispatch(
			StackActions.replace('Home')
		);
	};

	const onForgetPassword = async () => {

	};

	const onIconPress = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderLoginButton = () => {
		return isLoading ? <Spinner status="info" size="giant"/> :
			<Button onPress={onLogin} style={styles.button}>Sign In</Button>;
	};

	const renderIcon = (style) => (
		<Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'}/>
	);

	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.layout}>

				<Input
					placeholder='Mail'
					value={mail}
					onChangeText={setMail}
					style={styles.input}
				/>

				<Input
					icon={renderIcon}
					value={password}
					placeholder='Password'
					secureTextEntry={secureTextEntry}
					onChangeText={setPassword}
					onIconPress={onIconPress}
					style={styles.input}
				/>
				{renderLoginButton()}
				<Button onPress={onForgetPassword} style={styles.button} appearance='ghost'>Olvide mi contraseña</Button>
				<Button onPress={goBack} style={styles.button} appearance='primary'>Back Home</Button>
				{/*<Button onPress={onRegister} style={styles.button} appearance='ghost'>Google Sign in</Button>*/}
			</Layout>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
	},
	layout: {
		backgroundColor:'#EA3F6A',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		marginTop: 10,
		width: '60%',
		borderColor:'#ffffff',
	},
	input: {
		margin: 10,
		width: '70%'
	}
});
