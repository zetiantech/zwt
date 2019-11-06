/**
 * @description 基本信息
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';

import {
    Provider,
    WhiteSpace,
 } from '@ant-design/react-native';

import dayjs from 'dayjs'
import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil'
import Utils from 'src/util/Utils'
import Form from 'src/component/FormComponent'

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

export default function SocialSecurityBaseInfo(props) {

    const idCard = props.navigation.getParam("idCard")
    const [params, setParams] = useState({
        id: '',
        name: '',
        certificateType: [],
        idCard: '',
        birthday: '',
        registration: '',
        countries: '',
        notional: [],
        phone: '',
        address: ''
    })
    
    /**
     * @description 获取个人基本信息 
     **/
    function getPersonal() {
        HttpUtil.get(API.GET_PERSONAL, {
            idCard: idCard
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                setParams({
                    id: data.id,
                    name: data.name,
                    certificateType: [data.certificateType],
                    idCard: data.idCard,
                    birthday: data.birthday,
                    registration: data.registration,
                    countries: data.countries,
                    notional: [data.notional],
                    phone: data.phone,
                    address: data.address
                })
            }
        })
    }

    useEffect(() => {
        getPersonal()
    }, [idCard])

    /**
     * @description 获取民族列表 
     **/
    function getNationals() {
        HttpUtil.get(API.GET_NATIONALS, {}).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                const list = data.map((item)=>({label: item.name, value: item.id}))
                setNationSource(list)
            }
        })
    }
    /**
     * @description 获取证件类型列表 
     **/
    function getCertificates() {
        HttpUtil.get(API.GET_CERTIFICATES, {}).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                const list = data.map((item)=>({label: item.name, value: item.id}))
                setIdTypeSource(list)
            }else{
                ToastUtil.toast(msg || '获取数据失败')
            }
        })
    }

    const [nationSource, setNationSource] = useState([])
    const [idTypeSource, setIdTypeSource] = useState([])

    const labelName = {
        name: {
            label: '姓名',
            height: 50,
            type: 'InputItem',
            attr: {
                value: params.name,
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        certificateType: {
            label: '证件类型',
            type: 'Picker',
            data: idTypeSource,
            attr: {
                title: '证件类型',
            }
        },
        idCard: {
            label: '证件号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        birthday: {
            label: '出生日期',
            type: 'DatePicker'
        },
        registration: {
            label: '户籍',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        countries: {
            label: '国家/地区',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        notional: {
            label: '民族',
            type: 'Picker',
            data: nationSource,
            attr: {
                title: '民族',
            }
        },
        phone: {
            label: '手机号',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        },
        address: {
            label: '通讯住址',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber: 7,
                placeholder: '请输入',
            }
        }
    }

    useEffect(() => {
        // 获取民族
        getNationals()
        // 获取证件类型
        getCertificates() 
    }, [])

    function isValid(){
        const birthday = dayjs(params.birthday).format('YYYY-MM-DD');
        if(validator.isEmpty(params.name)){
            ToastUtil.toast("请输入姓名")
            return false;
        }else if(validator.isEmpty(params.certificateType.join(""))){
            ToastUtil.toast("请输入证件类型")
            return false;
        }else if(validator.isEmpty(params.idCard)){
            ToastUtil.toast("请输入证件号码")
            return false;
        }else if(validator.isEmpty(birthday)){
            ToastUtil.toast("请输入出生日期")
            return false;
        }else if(validator.isEmpty(params.registration)){
            ToastUtil.toast("请输入户籍")
            return false;
        }else if(validator.isEmpty(params.countries)){
            ToastUtil.toast("请输入国家/地区")
            return false;
        }else if(validator.isEmpty(params.notional.join(""))){
            ToastUtil.toast("请输入民族")
            return false;
        }else if(!validator.isMobilePhone(params.phone)){
            ToastUtil.toast("请输入正确的手机号码")
            return false;
        }else if(validator.isEmpty(params.address)){
            ToastUtil.toast("请输入通讯地址")
            return false;
        }
        return true
    }

    const onRightBtn = () => {

        if(!isValid()){
            return;
        }
        const data = {
            ...params,
            birthday: dayjs(params.birthday).format('YYYY-MM-DD hh:mm:ss'),
            certificateType: params.certificateType.join(""),
            notional: params.notional.join("")
        }
        HttpUtil.post(API.INSURANCE_ACCOUNT_SAVE, data)
            .then(responseJson=>{
                const { code, data, msg } = responseJson.data
                if(code === 0){
                    ToastUtil.toast(msg, 'center', 'short', ()=>{
                        DeviceEventEmitter.emit("refresh", '1');
                        NavigationUtil.navigate(props, 'SocialSecurityInfo')
                    })
                }else{
                    ToastUtil.toast(msg)
                }
            })
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation} 
                    popEnabled={true} 
                    title='基本信息修改'
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                    hide={false}
                    rightButton={
                        <RightBtnView onRightBtn={onRightBtn} />
                    }
                />
                <WhiteSpace size='lg'/>
                <ScrollView>
                    <Form data={params} showData={labelName} setData={setParams} />
                </ScrollView>
            </View>
        </Provider> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    btnBox: {
        marginVertical: 30,
        marginHorizontal: 20
    },
    rightBtnBox: {
        flexDirection: 'row'
    },
    rightBtn: {
        color: '#2F74ED'
    }
});

