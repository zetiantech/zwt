



import React, { useState, useEffect } from 'react'
import  {
   StyleSheet,
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity,Dimensions
} from 'react-native'
import { WebView } from "react-native-webview";
import { 
    Flex,
    List,
    Tabs
 } from '@ant-design/react-native';

import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';
import WebViewComponent from 'src/component/WebViewComponent'


export default function NewsDetail(props){
    const newId = props.navigation.getParam("id")
    const { width, height } = Dimensions.get("window");

    return (
        <View style={styles.container} >
                <NavigationBar 
                    title='资讯详情'  
                    statusBar={{barStyle: 'dark-content'}}
                    hide={false} 
                    popEnabled={true} 
                    navigator ={props.navigation}
                />
                <WebView
                style={{ width: width, height: height }}
                scrollEnabled={false}  
                javaScriptEnabled={true}  
                injectedJavaScript={'插入到h5页面中的js代码'}
                onMessage={event => {'接收h5页面传过来的消息'}}
                source={{uri: "http://www.baidu/com?id="+newId}}
                ></WebView> 
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 60
    },
})