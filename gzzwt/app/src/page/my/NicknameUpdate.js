/**
 * @description 设置
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';

import { 
    List,
    InputItem,
    Popover,
    WhiteSpace,
    Toast
 } from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import NavigationUtil from  'src/util/NavigationUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil';
import LogUtil from 'src/util/LogUtil';



const Nickname = ({name, setName}) => {
    return (
        <List>
            <InputItem
                clear
                type="text"
                value={name}
                onChange={setName}
                placeholder="请输入昵称至少2个字符"
            />
        </List>
    );
}

const RightBtnView = ({onRightBtn}) => {
    return (
        <View style={styles.rightBtnBox}>
            <TouchableHighlight
                underlayColor='transparent'
                onPress={onRightBtn}>
                <View style={{paddingRight: 15}}>
                    <Text style={styles.rightBtn}>完成</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

export default function NicknameUpdate(props){

    const [name, setName] = useState()

    const updateUserInfo = () => {
        if (validator.isEmpty(name)) {
            ToastUtil.toast("昵称不能为空");
            return false;
		}
        HttpUtil.post(API.UPDATE_USER_INFO, {
            name: name
        }).then(responseJson => {
            const { code, msg , data } = responseJson.data
            if(code == 0){
                ToastUtil.toast(msg, 'center', 'short', ()=>{
                    DeviceEventEmitter.emit("refresh", true);
                    NavigationUtil.goBack(props, {type: 1})
                });
            }
        });
    } 

    const onRightBtn = () => {
        updateUserInfo();
    }

    return (
        <View style={styles.container}>
            <Popover>
                <NavigationBar
                    navigator={props.navigation}
                    popEnabled={true}
                    rightButton={
                        <RightBtnView onRightBtn={onRightBtn} />
                    }
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                    title='更改昵称'
                    hide={false}/>
                <WhiteSpace size="xl" />
                <Nickname name={name} setName={setName} />
            </Popover>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    rightBtnBox: {
        flexDirection: 'row'
    },
    rightBtn: {
        color: '#2F74ED'
    }
});