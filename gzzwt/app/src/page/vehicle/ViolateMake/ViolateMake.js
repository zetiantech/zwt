/**
 * @description 违法办理预约
 * @author  ct
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,ScrollView
} from 'react-native';
import {
    Provider,
    List,
    InputItem,
    Button,
    Toast
} from '@ant-design/react-native';
import Form from 'src/component/FormComponent'
import HttpUtil from '../../../util/HttpUtil' //接口请求
import NavigationBar from '../../../common/NavigationBar'//头部导航
import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import { API } from 'src/api/Api'

export default function ViolateMake(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [Data, setData] = useState();//业务类型
    const [selectData, setSelectData] = useState();//号牌种类
    useEffect(() => {
        //业务类型
        HttpUtil.get(API.KeyValueList,{kindId:10})  
            .then(responseJson=>{   
            const { code, data, msg } = responseJson.data    
            if(code === 0){    
                console.log(data,88888)  
                let arr = [];
                for (const v of data) {
                    arr.push({ 
                        value: v.id,    
                        label: v.name
                    })
                }
                setData(arr) 

            }   
            }).catch(error=>{
            console.log(error,'error')
        });
        //号牌种类
        HttpUtil.get(API.KeyValueList,{kindId:4})  
            .then(responseJson=>{   
            const { code, data, msg } = responseJson.data    
            if(code === 0){    
                console.log(data,88888)  
                let arr = [];
                for (const v of data) {
                    arr.push({ 
                        value: v.id,    
                        label: v.name
                    })
                }
                setSelectData(arr) 

            }   
            }).catch(error=>{
            console.log(error,'error')
        });
    }, [])


    const [params, setParams] = useState({
        busTypeId: '',
        PlateKindId: '',
        plateNo: '',
        vin: '',
        engineNo:'',
        idCard:'',
        phone:'',
        applyDate:''
    })
    const labelData = {
        busTypeId: {
            label: '业务类型',
            height: 50,
            type: 'Picker',
            data:Data,
        },
        PlateKindId: {
            label: '号牌种类',
            type: 'Picker',
            height: 50,
            data: selectData
        },
        plateNo: {
            label: '号牌号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder: '请输入',
            }
        },
        vin: {       
            label: '车架号',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:'7',
                placeholder: '请输入车架号后六位',
            }
        },
        engineNo: {       
            label: '发动机号',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:'7',
                placeholder: '请输入发动机号后四位',
            }
        },
        idCard: {       
            label: '办理人身份证',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:'7',
                placeholder: '请输入',
            }
        },     
        phone: {       
            label: '手机号码',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:'7',
                placeholder: '请输入',

            }
        },
        applyDate: {       
            label: '预约时间',
            height: 50,
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:'7',
                placeholder: '输入格式：2019-10-20',
            }
        },       
    }
    /**
     * 
     * @param {*} params 
     */
    // console.log(params,77777777)
    function onSubmitLogin() {
        NavigationUtil.navigate(props, 'informationOwn',{params:params});
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='违法办理预约' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <ScrollView>
                    <List style={styles.inputWrap}>
                        <Form data={params} showData={labelData} setData={setParams} popEnabled = {true}  navigator ={props.navigation} />
                    </List>
                    <View style={styles.btnWrap}>
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>下一步</Button>
                </View>
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
    inputWrap: {
        marginTop: 15
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 20
    },
    inputBox: {
        height: 50
    },
    btnWrap: {
        marginTop: 30,
        paddingRight: 15,
        paddingLeft: 15
    },
    btnBox: {
        height: 48,
        backgroundColor: '#2F74ED'
    },
    toastText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 30,
        flex: 1,
        textAlign: 'center'
    }
})