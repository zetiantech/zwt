/**
 * @description 个人信息
 * @author 择天团队 Jonne 
*/
import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    DeviceEventEmitter
} from 'react-native';

import { 
    List,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

import NavigationUtil from  'src/util/NavigationUtil'
import NavigationBar from 'src/common/NavigationBar'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil';
import LogUtil from 'src/util/LogUtil';

const Item = List.Item

const PersonalInfoComponent = ({info, props}) => {
    console.log(info,4444444)
    return (
        <List>
            <Item
                extra={
                    info.photoUrl ? 
                    <Image source={{uri: info.photoUrl}} style={{width: 50, height: 50}} /> :
                    <Image source={ require('src/res/images/me/header.png') } style={{width: 50, height: 50}} />
                }
                onPress={()=>{
                    NavigationUtil.navigate(props, 'HeadImgUpdate', {photoUrl: info.photoUrl})
                }}
            >
                <Text style={styles.listItemText}>头像</Text>
            </Item>
            <Item 
                arrow="horizontal"
                extra={
                    <Text style={styles.extraStyle}>{info.phone}</Text>
                }
                onPress={()=>{
                    NavigationUtil.navigate(props, 'Phone', {phone: info.phone})
                }}
            >
                <Text style={styles.listItemText}>手机号</Text>
            </Item>
            <Item 
                arrow="horizontal"
                extra={
                    <Text numberOfLines={1} style={styles.extraStyle}>{info.name}</Text>
                }
                    onPress={()=>{
                        NavigationUtil.navigate(props, "NicknameUpdate")
                    }}
            >  
                <Text style={styles.listItemText}>用户昵称</Text>
            </Item>
            <Item
                extra={
                    <Text style={styles.extraStyle}>{info.realName?'已实名':'未实名'}</Text>
                }
            >
                <Text style={styles.listItemText}>实名认证</Text>
            </Item>
            <Item 
                arrow="horizontal"
                extra={
                    <Text style={styles.extraStyle}></Text>
                }
                onPress={()=>{
                    NavigationUtil.navigate(props, 'UserAddRess',{id:info.id})

                }}
            >
                <Text style={styles.listItemText}>收货地址</Text>
            </Item>
            
        </List>
    );
}


export default function PersonalInfo(props) {
  
    const [info, setPersonalInfo] = useState({
        name: '',
        phone: ''
    })

    DeviceEventEmitter.addListener('refresh', ()=>{
        getUserInfo()
    });

    useEffect(() => {
       getUserInfo()
    }, [])

    const getUserInfo = () => {
        HttpUtil.post(API.QUERY_USER_INFO, {})
            .then(responseJson=>{
                const { code, data, msg } = responseJson.data
                if(code === 0){
                    setPersonalInfo(data)
                }
            }).catch(error=>{
                LogUtil.debug(error)
            });
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation} 
                    popEnabled={true} 
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    title='个人信息' 
                    hide={false}/>
                <WhiteSpace size='lg' />
                <PersonalInfoComponent props={props} info={info} />
            </View>
        </Provider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    extraStyle: {
       maxWidth: 150,
       fontSize: 14,
       color: '#ccc',
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    },
});