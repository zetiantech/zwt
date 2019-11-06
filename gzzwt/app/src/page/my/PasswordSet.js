/**
 * @description 设置新手机号码
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import {
    List,
    InputItem,
    WhiteSpace,
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from 'src/util/NavigationUtil';
import AsyncStorageUtil from 'src/util/AsyncStorageUtil';

import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import Utils from 'src/util/Utils'



const Password = ({password, rePassword, setPassword, setRePassword}) =>{
    return (
        <>
            <Text style={styles.headTitle}>密码至少为八位字符，必须包含字母与数字</Text>
            <List>
                <InputItem
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="请输入密码"
                />
                <InputItem
                    style={styles.inputBox}
                    type="password"
                    value={rePassword}
                    onChange={setRePassword}
                    placeholder="请再次输入密码"
                />
            </List>
        </>
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

export default function PasswordSet(props) {
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()

    const isValid = (password, rePassword) => {
        if (!password || password == '') { ToastUtil.toast("请输入密码"); return false} else
        if (!password || password == '') { ToastUtil.toast("请输入密码"); return false} else
        if (!Utils.validPwd(password)) { ToastUtil.toast("密码八位包含字母和数字"); return false } else
        if (!rePassword || rePassword == '') { ToastUtil.toast("请再次输入密码"); return false} else
        if (password != rePassword) { ToastUtil.toast("两次密码不一致"); return false}
        return true;
    }

    const passwordSet = () => {
        HttpUtil.post(API.ADD_PASSWORD, {
            password: password
        })
        .then(responseJson => {
            const { code, data, msg } = responseJson.data
            if(code == 0){
                console.log(11111111)
                AsyncStorageUtil.removeItem("ACCESS_TOKEN", ()=>{
                    global.accessToken = ''
                    global.isLogin=''
                    NavigationUtil.dispatch(props, "Login")
                    console.log(11111111)
                })
            }else{
                ToastUtil.toast(msg || '修改失败')
            }
        })
    }
    const onRightBtn = () => {
        if (!isValid(password, rePassword)) {
            return;
        }
        passwordSet();
        
    }

    return (
        <View style={styles.container}>
            <NavigationBar
                navigator={props.navigation}
                popEnabled={true}
                rightButton={
                    <RightBtnView onRightBtn={onRightBtn} />
                }
                title='设置密码'
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                hide={false}/>
            <WhiteSpace size="sm" />
            <Password  password={password} setPassword={setPassword} rePassword={rePassword} setRePassword={setRePassword} />
        </View>
        
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    codeBtn: {
        height: 32,
        borderColor: '#92B5F5',
    },
    inputBox: {
        paddingRight: 20
    },
    headTitle: {
        padding: 10,
        fontSize: 14,
        color: '#999'
    },
    rightBtnBox: {
        flexDirection: 'row'
    },
    rightBtn: {
        color: '#2F74ED'
    }
});