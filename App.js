import React from 'react';
import { Landing } from './views/Landing';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IconRegistry } from '@ui-kitten/components';



export default function App() {
	let [fontsLoaded] = useFonts( {
		// eslint-disable-next-line no-undef
		'OpenSans-Regular': require( './assets/fonts/Open_Sans/OpenSans-Regular.ttf' ),
		// eslint-disable-next-line no-undef
		'OpenSans-SemiBold': require( './assets/fonts/Open_Sans/OpenSans-SemiBold.ttf' ),
		// eslint-disable-next-line no-undef
		'OleoScript': require( './assets/fonts/Oleo_Script/OleoScript-Regular.ttf' ),
		// eslint-disable-next-line no-undef
		'Karla-regular': require( './assets/fonts/Karla/Karla-Regular.ttf' )
	} );

	if ( !fontsLoaded ) {
		return <AppLoading/>;
	} else {
		return (
			<>
				<IconRegistry icons={EvaIconsPack} />
				<Landing/>
			</>
		);
	}
}
