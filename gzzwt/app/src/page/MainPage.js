

import React, { Component } from 'react'

import {
	Image,
	Text,
	View,
	StyleSheet
} from 'react-native'

import BottomNavigationBar from '../component/BottomNavigator'

export default class MainPage extends Component {
	 constructor(props) {
        super(props);
        // const theme = this.props.navigation.state.params ? this.props.navigation.state.params.theme : null
        // this.state = {
        //     theme: theme
		// }
	}
	render() {
		return (
			<View style={styles.container}>
				<BottomNavigationBar {...this.props}/>
			</View>
		);
	}
} 

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});