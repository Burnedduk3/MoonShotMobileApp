import { AppLoading } from 'expo';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from './src/components/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts } from '@use-expo/font';
import { default as theme } from './src/assets/themes/custom-theme.json';
import { default as mapping } from './mapping.json';
import * as eva from '@eva-design/eva';




export default function App() {
	let [fontsLoaded] = useFonts( {
		// eslint-disable-next-line no-undef
		'OpenSans-Regular': require( './src/assets/fonts/Open_Sans/OpenSans-Regular.ttf' ),
		// eslint-disable-next-line no-undef
		'OpenSans-SemiBold': require( './src/assets/fonts/Open_Sans/OpenSans-SemiBold.ttf' ),
		// eslint-disable-next-line no-undef
		'OleoScript': require( './src/assets/fonts/Oleo_Script/OleoScript-Regular.ttf' ),
		// eslint-disable-next-line no-undef
		'Karla-regular': require( './src/assets/fonts/Karla/Karla-Regular.ttf' )
	} );

	if ( !fontsLoaded ) {
		return <AppLoading/>;
	} else {
		return (
			<>
				<NavigationContainer>
					<ApplicationProvider
						{...eva}
						theme={{ ...eva.light, ...theme }}
						customMapping={mapping}>
						<StatusBar hidden={true} />
						<IconRegistry icons={EvaIconsPack}/>
						<AppNavigator/>
					</ApplicationProvider>
				</NavigationContainer>
			</>
		);
	}
}
