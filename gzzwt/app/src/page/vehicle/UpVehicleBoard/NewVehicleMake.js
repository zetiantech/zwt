/**
 * @description 检查预约车辆信息 //新车上牌预约
 * @author 择天团队 ct
*/
import React, { Component,useState,useEffect, useRef } from 'react'

import {
    ScrollView,
    View,
    Text,
    StyleSheet 
} from 'react-native';
import { 
    Button,
    InputItem,
    List,
    Picker,
    Switch,
    Provider,Toast,WingBlank,Modal
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'


/*** 
 * 机动车业务-新车上牌预约
 * idTypeId-证件类型，idCode-证件号码，indicatorscode-指标编号，engineno-发动机号
 * modelTyPeId-车辆类型，productplaceid-车辆产地
*/
export default function NewVehicleMake (props)  {
    const [formData,setFormData] = useState({
        idTypeId:'',idCode:'',indicatorscode:'',engineno:'',modelTyPeId:"",
        productplaceids:"",
    })
    const [idTypeId,setidTypeId] = useState()//证件类型
    const [modelTyPeId,setmodelTyPeId] = useState()//车辆类型
    const [productplaceids,setproductplaceids] = useState()//车辆产地
    const [userData,setuserData] = useState()//个人信息

    function onChange () {

    }
    //提交
    function onButtonClick () { 
        if (formData.idTypeId=='') {
            ToastUtil.toast('请选择证件类型','center')
            return
        }
        if (formData.idCode=='') {
            ToastUtil.toast('请填写证件号码','center')
            return
        }
        if (formData.indicatorscode=='') {
            ToastUtil.toast('请填写指标编号','center')
            return
        }
        if (formData.engineno=='') {
            ToastUtil.toast('请填写发动机号','center')
            return
        }
        if (formData.modelTyPeId=='') {
            ToastUtil.toast('请选择机动车类型','center')
            return
        }
        if (formData.productplaceids=='') {
            ToastUtil.toast('请选择车辆产地','center')
            return
        }
        //获取个人信息
        HttpUtil.get(API.VehicleApplyGetOne, {
            // idCardTypeId:formData.idTypeId.join(''),//证件类型
            // idCode:formData.idCode,//证件号码
            // indicatorsCode:formData.indicatorscode,//指标编号
            // engineNo:formData.engineno,
            // modelKindId:formData.modelTyPeId.join(''),
            // productPlaceId:formData.productplaceids.join(''),
        })  
            .then(responseJson=>{   
                console.log(responseJson,'个人信息')          
                const { code, data, msg } = responseJson.data  
                if(code === 0){     
                    // setuserData(data)                   
                    NavigationUtil.navigate(props,'ConfirmationInformation',{data:data})
                }if (code==-1&&!code) {
                    Modal.alert('提示', '车辆信息不存在', [                
                    { text: '知道了', onPress: () => 
                        console.log(11) 
                    },
                    ]);
                } 
            }).catch(error=>{    
                console.log(error,'个人信息')
        });    
    }
    useEffect(() => {  
        //证件类型
        HttpUtil.get(API.KeyValueList, {kindId:3})  
            .then(responseJson=>{   
                // console.log(responseJson,'证件类型')          
                const { code, data, msg } = responseJson.data  
                if(code === 0){     
                    let arr = [];   
                    for (const v of data) {
                        arr.push({ 
                            value: v.id,
                            label: v.name
                        })  
                    }
                    setidTypeId(arr) 
                }  
            }).catch(error=>{    
                console.log(error,'证件类型')
        });
        //车辆类型
        HttpUtil.get(API.KeyValueList, {kindId:1})  
        .then(responseJson=>{   
            // console.log(responseJson,'车辆类型')          
            const { code, data, msg } = responseJson.data  
            if(code === 0){     
                let arr = [];   
                for (const v of data) {
                    arr.push({ 
                        value: v.id,
                        label: v.name
                    })  
                }
                setmodelTyPeId(arr) 
            }  
        }).catch(error=>{
            console.log(error,'证件类型')
    });
    //车辆产地
    HttpUtil.get(API.KeyValueList, {kindId:11})  
    .then(responseJson=>{   
        // console.log(responseJson,'车辆产地')          
        const { code, data, msg } = responseJson.data  
        if(code === 0){     
            let arr = [];   
            for (const v of data) {
                arr.push({ 
                    value: v.id,
                    label: v.name
                })  
            }
            setproductplaceids(arr) 
        }  
    }).catch(error=>{
        console.log(error,'车辆产地')
});
    
    },[])
    console.log(userData,333333)
        return (
            <View style={styles.container}>
                <NavigationBar title='基本信息'  hide={false} popEnabled = {true} navigator ={props.navigation}/>
                <Provider>
                <ScrollView
                    style={{ flex: 1, marginTop: 20 }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <List>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={idTypeId}
                            value={formData.idTypeId}
                            onChange={(val)=>setFormData({...formData, idTypeId: val})}
                            onOk={onChange}
                        >
                            <List.Item arrow="horizontal">证件选择</List.Item>
                        </Picker>
                        <InputItem
                             type="text"
                             value={formData.idCode}
                             onChange={(val)=>setFormData({...formData, idCode: val})}
                             onOk={onChange}
                             textAlign='right'
                             placeholder="请输入"
                        >
                        证件号码
                        </InputItem>
                        <InputItem
                             type="text"
                             value={formData.indicatorscode}
                             onChange={(val)=>setFormData({...formData, indicatorscode: val})}
                             onOk={onChange}
                             textAlign='right'
                             placeholder="请输入"
                        >
                        指标编号
                        </InputItem>
                        <InputItem  
                              type="text"
                              value={formData.engineno}
                              onChange={(val)=>setFormData({...formData, engineno: val})}
                              onOk={onChange}
                              textAlign='right'
                              placeholder="请输入"
                        >
                        <Text style={styles.input}>发动机号</Text>
                        </InputItem>
                    </List>
                    <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={modelTyPeId}
                            value={formData.modelTyPeId}
                            onChange={(val)=>setFormData({...formData, modelTyPeId: val})}
                            onOk={onChange}
                        >
                            <List.Item arrow="horizontal">机动车类型</List.Item>
                    </Picker>
                    <Picker  
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={productplaceids}
                            value={formData.productplaceids}
                            onChange={(val)=>setFormData({...formData, productplaceids: val})}
                            onOk={onChange}
                        >
                            <List.Item arrow="horizontal">车辆产地</List.Item>
                    </Picker>                  
                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onButtonClick}>提交</Button>
                    </List>
                    <View>
                        <Text style={styles.msgTip}>注：该业务预约后，须前往现场办理</Text>
                    </View>
                </ScrollView>
            </Provider>
            </View>
        );
    
}

const styles = StyleSheet.create({
    input: {
        width:200,
        fontSize:16,
        marginRight: 100,
    },
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
    msgTip: {
        textAlign: 'center',
        color: '#999'
    }
});

