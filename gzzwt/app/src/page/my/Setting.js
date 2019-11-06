/**
 * @description 设置
 * @author 择天团队 Jonne 
*/
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet 
} from 'react-native';

import { 
    Button,
    List,
    WhiteSpace
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import AsyncStorageUtil from 'src/util/AsyncStorageUtil'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';


const  SettingList = ({setList}) => {
    return (
        <List>
            {
                setList && setList.map((item, index) => (
                    <List.Item 
                        key={index}
                        arrow={item.arrow ? item.arrow : 'horizontal'}
                        extra={
                            <Text style={styles.extraStyle}>{item.text}</Text>
                        }
                        onPress={item.onPress}
                    >
                        <Text style={styles.listItemText}>{item.name}</Text>
                    </List.Item>
                ))
            }
        </List>
    )
}


export default function Setting(props) {

    const setList = [
        {
            name: '意见反馈',    
            onPress: () => {
                
            }
        },
        {
            name: '清除缓存',
            text: '0M',
            onPress: () => {
                
            }
        },
        {
            name: '当前版本 1.0.17',
            text: '检查更新',
            onPress: () => {
                
            }
        }
    ];

    const onLogout = () => {
        AsyncStorageUtil.removeItem("USER_PHONE", ()=>{ console.log('清除成功') })
        AsyncStorageUtil.removeItem("GESTURE_PASSWORD", ()=>{ console.log('清除成功')});
        AsyncStorageUtil.removeItem("ACCESS_TOKEN", ()=>{
            global.accessToken = ''
            global.isLogin=''
            NavigationUtil.navigate(props, "Main")
        })
        // HttpUtil.get(API.LOGOUT, {})
        // .then((responseJson => {
        //     const { code, data, msg } = responseJson.data;
        //     if (code == 0){
        //         ToastUtil.toast("退出成功")
        //         AsyncStorageUtil.removeItem("ACCESS_TOKEN")
        //         AsyncStorageUtil.removeItem("USER_PHONE")
        //         global.accessToken = ''
        //         NavigationUtil.navigation(props, "Main")
        //     }
        // }))
    }

    return (
        <View style={styles.container}>
            <NavigationBar
                navigator={props.navigation}
                popEnabled={true}
                title='设置'
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                hide={false}/>
            <WhiteSpace size="xl" />
            <SettingList setList={setList} />
            <WhiteSpace size="xl" />
            <Button 
                style={{borderWidth: 0}}
                onPress={()=> onLogout() }
            >
                <Text style={{color: '#FF0000'}}>退出登录</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    extraStyle: {
       fontSize: 14,
       color: '#ccc'
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    },
});