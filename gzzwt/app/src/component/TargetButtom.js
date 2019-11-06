


import React, { Component } from 'react';
import { 
    StyleSheet,
    TouchableHighlight,
    View,
    Text
} from 'react-native';

import GlobalStyles from '../res/styles/GlobalStyles'


class TargetButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { style, title, handler } = this.props
        return (
            <TouchableHighlight onPress={handler} underlayColor='transparent'>
                <View style={[styles.barButtonBox, style]}>
                    <Text style={[styles.title, {fontSize: style && style.fontSize}]}>{title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    barButtonBox: {
        marginBottom: 15,
        marginLeft: 5,
        marginRight: 5,
        width: (GlobalStyles.window_width-60)/3,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#D5E3FB',
        borderRadius: 4
    },
    title: {
        fontSize: 16,
        color: '#333333'
    }
});

export default TargetButton;
