/**
 * @description 设置
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet 
} from 'react-native';

import { 
    Button,
    List,
    InputItem,
    Popover,
    WhiteSpace,
 } from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from 'src/util/NavigationUtil'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'

const PhoneComponent = ({form, setForm, checked, codeText, onSendCode}) => {
    return (
        <>
            <Text style={styles.phoneText}>手机号  {form.phone}</Text>
            <List>
                <InputItem
                    style={styles.inputBox}
                    type="number"
                    maxLength={6}
                    value={form.shortCode}
                    textAlign='right'
                    extra={
                        <Button 
                            style={styles.codeBtn}
                            disabled={checked}
                            onPress={()=> onSendCode()}
                        >
                            <Text style={{fontSize: 14, color: '#92B5F5'}}>{codeText}</Text>
                        </Button>
                    }
                    onChange={(shortCode) => setForm({...form, shortCode}) }
                    placeholder="请输入验证码"
                >
                验证码
                </InputItem>
            </List>
        </>
    )
}


export default function PhoneValid(props) {
    const phone = props.navigation.getParam("phone")
    const type = props.navigation.getParam("type")||"0"
    console.log(type,44444444)
    
    const [checked, setChecked] = useState(false)
    const [codeText, setCodeText] = useState('点击获取')

    const [form, setForm] = useState({
        phone: phone,
        shortCode: ''
    })

    const onSendCode = () => {
        getCode();
        HttpUtil.post(API.SEND_CODE, {
            phone: phone
        }).then((responseJson) => {
            if(responseJson.code === 0){
                ToastUtil.toast('发送成功！')
            }else{
                LogUtil.debug('验证码:' + responseJson.msg);
            }
        })
     }

    let time = 60;
	function getCode(){
		time--;
		setChecked(true)
		setCodeText(time + 's后重新获取')
		setTimeout(function(){
			if(time <= 1){
				time = 60
				setChecked(false)
				setCodeText('发送验证码')
			}else{
				getCode()
			}
		}, 1000)
	}

    const onSubmitLogin = () => {
        const { phone, shortCode } = form
        
        if (validator.isEmpty(phone)) {
            ToastUtil.toast("未获取到手机号");
            return false;
		}
        if (validator.isEmpty(shortCode)) {
            ToastUtil.toast("验证码不能为空");
            return false;
		}
        HttpUtil.post(API.VERIFY_YZM, {
            phone: phone,
            shortCode: shortCode
        }).then((responseJson) => {
            const { data, code, msg } = responseJson.data;
            if(code === 0){
                if (type == 0) {
                    console.log(11111111)
                    NavigationUtil.navigate(props, "NewPhoneSet")
                } else if (type == 1) {
                    console.log(222222)
                    NavigationUtil.navigate(props, "PasswordSet")
                } 
            }else{
                ToastUtil.toast(msg)
            }
        })
     }

    return (
        <View style={styles.container}>
            <Popover>
                <NavigationBar
                    navigator={props.navigation}
                    popEnabled={true}
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                    title={type == 0? '更换手机号': '手机验证'}
                    hide={false}
                />
                <PhoneComponent form={form} setForm={setForm} checked={checked} codeText={codeText}  onSendCode={onSendCode} />
                <Button 
                    style={styles.btnBox}
                    type="primary" 
                    onPress={() => onSubmitLogin()}
                >
                    下一步
                </Button>
            </Popover>
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
    phoneText: {
        fontSize: 15,
        color: '#666',
        padding: 15,
        paddingBottom: 10
    },
    inputBox: {
        paddingRight: 20
    },
    btnBox: {
        margin: 20,
        marginTop: 30
    }
});