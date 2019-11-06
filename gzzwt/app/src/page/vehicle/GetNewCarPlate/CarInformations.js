/**
 * @description 车辆基本信息1   补领机动车号牌
 * @author 择天团队
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet 
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Switch,
    Provider,
    Modal,
    Card,
    DatePicker,
    Checkbox
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'

const dataSource = require('@bang88/china-city-data');



    
/*** 
 * 机动车业务-补领机动车号牌
 * plateNumber-号码号牌 modelKindName-车辆类型 validDate-检验有效期
*/    
export default function CarInformations (props) {
    const [formData,setFormData] = useState({
        belongName:'',plateNumber:'', modelKindName:'',validDate:''
    })

    const [type,settype]=useState(false)//Checkbox
    const [modelKindName,setmodelKindName]=useState(false)//车辆类型
    const [carData,setcarData]=useState(false)//车辆信息

    const [bustypes, setBusTypes] = useState({})//车辆类型文本数据
    const [bustypetwo, setBusTypetwo] = useState({})//车辆类型文本数据


        function onChange () {

        }
        function onButtonClick () {
            if (formData.modelKindName==undefined) {
                ToastUtil.toast('车辆类型不能为空')
                return
            }
            NavigationUtil.navigate(props,'CarInformationTwo',{formData:formData,carData:carData,bustypetwo:bustypetwo})
    
        }
        function onclick () { 
            settype(!type)
        } 
        function onChangemodel (val) {
            const key = val[0]
            setBusTypetwo(bustypes[key],333333)
        }
        
    useEffect (()=>{
        //车辆类型
        HttpUtil.get(API.KeyValueList, {kindId:1})  
        .then(responseJson=>{   
            const { code, data, msg } = responseJson.data   
            if(code === 0){  
                let arr = [];
                let  bustype = {} //传入车辆类型
                for (const v of data) {
                    arr.push({ 
                        value: v.id,
                        label: v.name
                    })
                    bustype[v.id] = v.name    
                }
                setBusTypes(bustype)
                setmodelKindName(arr)   
            }  
            }).catch(error=>{
            console.log(error,'error')
            });
        //获取车主信息
        HttpUtil.get(API.VehicleApplyGetOne, {id:1})  
        .then(responseJson=>{   
            const { code, data, msg } = responseJson.data   
            if(code === 0){                
                const a = data.validDate
                let  b = a.substr(0,10)
                data.dateTime = b
                setcarData({...data})
                setFormData({
                    belongName:data.belongName,
                    plateNumber:data.plateNumber,
                    validDate:data.dateTime
                }) 
            }  
            }).catch(error=>{
            console.log(error,'error11')
            });    
        },[])
        return (
            <View style={styles.container}>
                <NavigationBar title='车辆基本信息' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <Provider>         
                <List style={{marginTop: 15}}>
                        <InputItem
                            type="text"
                            labelNumber="8"
                            textAlign='right'
                            value={formData.belongName}
                            onChange={onChange}
                        >
                        所有人
                        </InputItem>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={modelKindName}
                            value={formData.modelKindName}
                            onChange={(val)=>setFormData({...formData, modelKindName: val})}
                            onOk={onChangemodel}
                        >
                            <List.Item arrow="horizontal">车辆类型</List.Item>
                        </Picker>
                        <InputItem
                            type="phone"
                            labelNumber="8"
                            textAlign='right'
                            value={formData.plateNumber}
                            onChange={onChange}
                        >
                        号牌号码
                        </InputItem>
                        <InputItem
                            type="phone"
                            labelNumber="8"
                            textAlign='right'
                            value={formData.validDate}
                            onChange={onChange}
                        >
                        检验有效期止
                        </InputItem>
                    </List> 
                   
                
                    <View style={{ marginTop:10,marginLeft:15 }}>

                    <Checkbox style={{color: type == 0 ? '#979797': '#2F74ED'}} onChange={onclick} >
                    <Text style={{color:'#2F74ED',marginLeft:10}}>阅读须知</Text>
                    </Checkbox>
                            
                    </View>  
                    <List style={styles.buttonStyles}>
                        <Button type="primary" onPress={onButtonClick}>下一步</Button>
                    </List>                
            </Provider>
            </View>
        );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F0F0F0'
    },
    buttonBox: {
        height: 48,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30
    },
    buttonStyles: {
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15
    },
    courierContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,  
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    courierText: {
        color: '#999',
        fontSize: 14
    },
    courierText1: {
        color: '#333',
        fontSize: 16
    }
});

