/**
 * @description 聚合导航栏
 * @author caroline
*/
import React from 'react';
import { Text, View, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import GlobalStyles from 'src/res/styles/GlobalStyles'
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

/**
 * 
 * @param {*} title 导航名 
 * @param {*} image 图片地址
 * @param {*} opacityPercent 透明度
 */
export default function ComplexNavigationBar ({ title, props, image }) {
    return (
        <>
            <StatusBar barStyle="light-content" translucent={true} backgroundColor="rgba(0,0,0,0)" />
            <View style={styles.NavigationBox}>
                <View style={styles.NavigationBar}>
                    <Image
                        resizeMode="cover"
                        style={styles.image}
                        source={image}
                    />
                </View>
                <View style={styles.fontBox} >
                    <Text style={{ fontSize: 16, color: '#fff' }}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.icon}>
                    <Icon name="left" size="md" onPress={() => { NavigationUtil.goBack(props); }} />
                </TouchableOpacity>
            </View >
        </>
    )
}
const styles = StyleSheet.create({
    NavigationBox: {

    },
    NavigationBar: {
        height: 160,
    },
    fontBox: {
        width: GlobalStyles.window_width,
        position: 'absolute',
        textAlign: "center",
        lineHeight: 38,
        top: 38,
        height: 30,
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: 10,
        top: 38,
        color: "#fff"
    },
    image: {
        flex: 1,
        width: 375,
        height: 100,
    }
})