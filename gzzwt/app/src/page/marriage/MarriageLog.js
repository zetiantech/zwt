/**
 * @description 预约查询
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

import dayjs from 'dayjs'
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import Form from 'src/component/FormComponent'
import NavigationUtil from 'src/util/NavigationUtil';

export default function MarriageLog(props) {
    const [params, setParams] = useState({
        id: '',
        maleIdCard: '',
        femaleIdCard: '',
        startTime: ''
    })

    const labelData = {
        maleIdCard: {
            label: '身份证号码(男)',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
            }
        },
        femaleIdCard: {
            label: '身份证号码(女)',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
            }
        },
        id: {
            label: '预约登记号',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
            }
        },
        startTime: {
            label: '登记日期',
            type: 'DatePicker'
        }
    }
    console.log(params,888888)
    function searchProveApply () {
        if (params.maleIdCard==""||params.maleIdCard==undefined) {
            ToastUtil.toast('请填写正确身份号码(男)')
            return
        }
        if (params.femaleIdCard==""||params.femaleIdCard==undefined) {
            ToastUtil.toast('请填写正确身份号码(女)')
            return
        }
        if (params.id==""||params.id==undefined) {
            ToastUtil.toast('请填写预约登记号')
            return
        }
        if (params.startTime==""||params.startTime==undefined) {
            ToastUtil.toast('请选择登记日期')
            return
        }
        
        const data = {...params, startTime: dayjs(params.startTime).format('YYYY-MM-DD hh:mm:ss')}
        HttpUtil.get(API.MARRIEDAPPLY_LIST, data)
        .then(responseJson => {
            const { code, data, msg } = responseJson.data
            if(code === 0){
                NavigationUtil.navigate(props, 'MarriageLogResult', {data: data[0]})
            }
        })
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar navigator={props.navigation} statusBar={{backgroundColor: '#FFFFFF'}} popEnabled={true} title='预约查询' hide={false}/>
                <WhiteSpace size="lg" />
                <Form data={params} showData={labelData} setData={setParams} popEnabled ={true}  navigator={props.navigation} />
                <Button style={styles.btnBox} type="primary" onPress={()=>searchProveApply()}>下一步</Button>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    buttonBox: {
        height: 48,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30
    },
    buttonStyles: {
        color: '#ffffff',
        backgroundColor: '#2F74ED'
    },
    btnBox: {
        marginVertical: 30,
        marginHorizontal: 15,
    }
});

