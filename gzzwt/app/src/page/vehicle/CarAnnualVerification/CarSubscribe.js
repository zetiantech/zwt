/**
 * @description 车辆基本信息1   机动车年审预约
 * @author 择天团队 ct
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
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'

const dataSource = require('@bang88/china-city-data');



    
/*** 
 * 机动车业务-补领机动车号牌
 *  belongName-姓名  modelKindName-车辆类型 plateNumber-号码号牌  
 * drivingType-驱动类型   modelKindProp-车辆属性        fuelType-燃油类型  
*/    
export default function CarSubscribe (props) {
    const [formData,setFormData] = useState({
        belongName:'', modelKindName:'',plateNumber:'', drivingType:'',
        modelKindProp:'',fuelType:''
    })
    const [carData,setcarData]=useState()//车辆详情信息

    const [modelKindName,setmodelKindName]=useState()//车辆类型  
    const [modelKindProp,setmodelKindProp]=useState()//车辆属性  
    const [drivingType,setdrivingType]=useState()//驱动类型  
    const [fuelType,setfuelType]=useState()//燃油类型

    const [bustypes, setBusTypes] = useState({})//车辆类型文本数据
    const [bustypetwo, setBusTypetwo] = useState({})//车辆类型文本数据


        function onChange () {

        }
        function onButtonClick () {
            if (formData.modelKindName==undefined) {
                ToastUtil.toast('车辆类型不能为空')
                return
            }
            if (formData.drivingType==undefined) {
                ToastUtil.toast('请选择驱动类型')
                return
            }
            if (formData.modelKindProp==undefined) {
                ToastUtil.toast('请选择车辆属性')
                return
            }
            if (formData.fuelType==undefined) {
                ToastUtil.toast('请选择燃油类型')
                return
            }
            NavigationUtil.navigate(props,'CarSubscribe2',{formData:formData,bustypetwo:bustypetwo,carData:carData})
    
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
         //驱动类型
         HttpUtil.get(API.KeyValueList, {kindId:5})  
         .then(responseJson=>{   
             const { code, data, msg } = responseJson.data   
             if(code === 0){  
                 let arr = [];
                 for (const v of data) {
                     arr.push({ 
                         value: v.id,
                         label: v.name
                     })
                 }
                 setdrivingType(arr)   
             }  
             }).catch(error=>{
             console.log(error,'error')
             });
        //车辆属性
        HttpUtil.get(API.KeyValueList, {kindId:13})  
        .then(responseJson=>{   
            const { code, data, msg } = responseJson.data   
            if(code === 0){  
                let arr = [];
                for (const v of data) {
                    arr.push({ 
                        value: v.id,
                        label: v.name
                    })
                }
                setmodelKindProp(arr)   
            }  
            }).catch(error=>{
            console.log(error,'error')
            });
        //燃油类型
        HttpUtil.get(API.KeyValueList, {kindId:6})  
         .then(responseJson=>{   
             const { code, data, msg } = responseJson.data   
             if(code === 0){  
                 let arr = [];
                 for (const v of data) {
                     arr.push({ 
                         value: v.id,
                         label: v.name
                     })
                 }
                 setfuelType(arr)   
             }  
             }).catch(error=>{
             console.log(error,'error')
             });      
        //获取车主信息
        HttpUtil.get(API.VehicleApplyGetOne, {id:1})  
        .then(responseJson=>{   
            const { code, data, msg } = responseJson.data   
            if(code === 0){                
                setcarData({...data})
                setFormData({
                    belongName:data.belongName,
                    plateNumber:data.plateNumber
                }) 
            }  
            }).catch(error=>{
            console.log(error,'error11')
            });    
        },[])
        console.log(bustypetwo,555)      
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
                            labelNumber="8"      
                            textAlign='right'
                            value={formData.plateNumber}
                            onChange={(val)=>setFormData({...formData, plateNumber: val})}
                        >
                        号牌编号
                        </InputItem>
                        <Picker
                            cols={1}  
                            itemStyle={{padding: 10}}
                            data={drivingType}
                            value={formData.drivingType}
                            onChange={(val)=>setFormData({...formData, drivingType: val})}
                        >
                            <List.Item arrow="horizontal">请选择驱动类型</List.Item>
                        </Picker>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={modelKindProp}
                            value={formData.modelKindProp}
                            onChange={(val)=>setFormData({...formData, modelKindProp: val})}
                        >
                            <List.Item arrow="horizontal">请选择车辆属性</List.Item>
                        </Picker>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={fuelType}
                            value={formData.fuelType}
                            onChange={(val)=>setFormData({...formData, fuelType: val})}
                        >
                            <List.Item arrow="horizontal">请选择燃油类型</List.Item>
                        </Picker>
                    </List> 
                   
                
                    <View style={{ marginTop:10,marginLeft:15 }}>                        
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

