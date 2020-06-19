import React, { Component } from 'react';
// eslint-disable-next-line sort-imports
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Icon, Layout, Text } from '@ui-kitten/components';
import { default as theme } from '../assets/themes/custom-theme.json';
// eslint-disable-next-line sort-imports
import { default as mapping } from './../mapping.json';

export class Landing extends Component {

	constructor() {
		super();
		this.state = {
			loading:true
		};
	}


	FacebookIcon(props) {
		return (
			<Icon name='facebook' {...props} />
		);
	}

	render() {
		return(
			<ApplicationProvider
				{...eva}
				theme={{ ...eva.light, ...theme }}
				customMapping={mapping}>
				<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Button accessoryLeft={this.FacebookIcon}>Login with Facebook</Button>
					<Text category='h1'>H1</Text>
					<Text category='h2'>H2</Text>
					<Text category='h3'>H3</Text>
					<Text category='h4'>H4</Text>
					<Text category='h5'>H5</Text>
				</Layout>
			</ApplicationProvider>
		);
	}
}
