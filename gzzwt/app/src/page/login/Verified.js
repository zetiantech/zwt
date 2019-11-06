/**
 * @description 实名认证
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Checkbox,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from 'src/util/NavigationUtil'
import ToastUtil from 'src/util/ToastUtil'
const AgreeItem = Checkbox.AgreeItem;

const VerifiedComponent = ({form, isAgree, setIsAgree, setForm}) => {
    return (
        <View>
            <List>
                <InputItem
                    type="text"
                    labelNumber="5"
                    textAlign='right'
                    value={form.realName}
                    onChange={(value) => setForm({...form, realName: value })}
                    placeholder="请输入真实姓名"
                >
                真实姓名
                </InputItem>
                <InputItem
                    type="number"
                    labelNumber="5"
                    textAlign='right'
                    maxLength={18}
                    value={form.idCard}
                    onChange={(value) => setForm({...form, idCard: value })}
                    placeholder="请输入身份证号"
                >
                身份证号
                </InputItem>
            </List>
            <View style={styles.checkboxStyle}>
                <AgreeItem
                    checked={isAgree}
                    checkboxStyle={{ color: '#2F74ED' }}
                    onChange={event => setIsAgree(event.target.checked)}
                >
                    <View style={styles.agreenBox}>
                        <Text style={{color: '#999999'}}>已阅读并同意</Text>
                        <TouchableOpacity>
                            <Text style={{color: '#2F74ED'}}>《广州政务通协议》</Text>
                        </TouchableOpacity>
                    </View>
                </AgreeItem>
            </View>
        </View>
    )
}

export default function Verified(props){
    const [form, setForm] = useState({
        realName: "",
        idCard: "",
        isAgree: true
    })
    const [isAgree, setIsAgree] = useState(false)

    useEffect(() => {
        
    }, [])

    const onButtonClick = () => {
        const { realName, idCard } = form

        if (validator.isEmpty(realName)) {
            ToastUtil.toast("真实姓名不能为空");
            return;
        }
        
        if (validator.isEmpty(idCard)) {
            ToastUtil.toast("身份证号码不能为空");
            return;
        }
        if(!isAgree) {
            ToastUtil.toast("请阅读政务通协议");
            return;
        }
        NavigationUtil.navigate(props, 'FaceRecognition', {form: form})
    };

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    title='实名认证' 
                    hide={false} 
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                    popEnabled={true}  
                    navigator={props.navigation}
                />
                <WhiteSpace size="lg" />
                <VerifiedComponent form={form} setForm={setForm} isAgree={isAgree} setIsAgree={setIsAgree} />
                <Button style={styles.btnBox} type="primary" onPress={() => onButtonClick()}>开始认证</Button>
            </View>
        </Provider>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    checkboxStyle: {
        paddingTop: 15,
    },
    agreenBox: {
        flexDirection: 'row'
    },
    btnBox: {
        marginVertical: 30,
        marginHorizontal: 20
    }
});

