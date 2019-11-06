/**
 * @description 公交线路查询
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview'
import NavigationBar from 'src/common/NavigationBar'//头部导航

export default function BusRoute(props) {
    function pageJS() {
        console.log('param---')
    }
    return (
        <View style={styles.container}>
            <NavigationBar title='公交线路查询' hide={false} navigator={props.navigation}
                popEnabled={true} />
            <WebView
                style={styles.container}
                injectedJavaScript={pageJS()}
                scrollEnabled={false}
                javaScriptEnabled={true}
                source={{ uri: 'http://m.doudou360.com/bus/index.aspx?area=guangzhou' }}
            ></WebView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    inputWrap: {
        marginTop: 15
    }
})