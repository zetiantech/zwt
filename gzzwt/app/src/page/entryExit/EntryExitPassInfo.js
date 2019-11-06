/**
 * @description 基本信息
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    StyleSheet, 
} from 'react-native';

import { 
    Provider,
    WhiteSpace,
    Button,Modal
 } from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import Form from 'src/component/FormComponent'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import NavigationUtil from 'src/util/NavigationUtil'
import { CurentTime } from 'src/util/DateUtil'

const dataSource = require('@bang88/china-city-data');

export default function EntryExitPassInfo(props) {
    const types = props.navigation.getParam("type")
    const [type, setType] = useState(1)
    useEffect(() => {
        setType(types)
    }, [types])

    const [signCatogry, setSignCatogry] = useState([])
    const [getType, setGetType] = useState([])
    const [signType, setSignType] = useState([])

    const [params, setParams] = useState({
        certificateTypeId: type || 1,
        phone: '',
        registerAreaId: [],
        applyTypeId: [],
        cardId: '',
        brithDay: '',
        signCatogryId: [],
        takeType: []
    })

    const labelData1 = {
        phone: {
            label: '手机号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
            }
        },
        registerAreaId: {
            label: '户口所在地',
            cols: 3,
            type: 'Picker',
            data: dataSource
        },
        applyTypeId: {
            label: '出境事由',
            type: 'Picker',
            data: signType
        },
        cardId: {
            label: '通行证号',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:7,
                placeholder:'请输入',
            }
        },
        brithDay: {
            label: '出生日期',
            type: 'DatePicker'
        },
    }

    const labelData2 = {
        signCatogryId: {
            label: '签注种类',
            type: 'Picker',
            data: signCatogry
        },
    }

    const labelData3 = {
        takeType: {
            label: '取证方式',
            type: 'Picker',
            data: getType
        },
    }

    useEffect(() => {
        if(type==1){
            getSelectValue(3)
        }else{
            getSelectValue(15)
        }
        getSelectValue(4)
        getSelectValue(5)
    }, [])

    function getSelectValue(kindId) {
        HttpUtil.get(API.KEYVALUE_LIST, {
            kindId: kindId
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                let list = Object.keys(data).map((item, i)=>({label: data[item], value: item}))
                switch(kindId) {
                    case 3:
                    case 15:
                        setSignType(list)
                    break;
                    case 4:
                        setSignCatogry(list)
                    break;
                    case 5:
                        setGetType(list)
                    break;
                }
            }else{
                ToastUtil.toast(msg)
            }
        })
    }


    const onSumbitData = () => {
        
        const param = {
            ...params,
            brithDay: CurentTime(new Date(params.brithDay)),
            registerAreaId: params.registerAreaId[2],
            applyTypeId: params.applyTypeId.join(""),
            signCatogryId: params.signCatogryId.join(""),
            takeType: params.takeType.join("")
        }       
        Modal.alert('', '确认要提交吗？', [
            { text: '取消' },
            { text: '确认', onPress: () => {
                NavigationUtil.navigate(props, 'EntryExitService')
                // HttpUtil.post(API.AGAINSIGN_ADD, param)
                //     .then(responseJson=>{
                //         const { code, data, msg } = responseJson.data
                //         if(code == 0){

                //         }else{
                //             ToastUtil.toast(msg)
                //         }
                //     })
            }},
        ]);
        
    }

    


    return (
        <Provider>
             <View style={styles.container}>
             <NavigationBar
                title={type==1?'填写港澳签注信息':'填写台湾签注信息'}
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <ScrollView>
                    <WhiteSpace size='lg' />
                    <Form data={params} showData={labelData1} setData={setParams} />
                    <WhiteSpace size='lg' />
                    <Form data={params} showData={labelData2} setData={setParams} />
                    <WhiteSpace size='lg' />
                    <Form data={params} showData={labelData3} setData={setParams} />
                    <Button type="primary" style={styles.btnBox} onPress={()=>onSumbitData()}>提交</Button>
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
    }
});

