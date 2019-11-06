/**
 * @description 换领机车东登记证书
 * @author 择天团队 
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
    Provider,Modal,DatePicker
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航  
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'
 import GeolocationUtil from 'src/util/GeolocationUtil'; // 轻提示

const  dataSource = [
    {
        value: '1',
        label: '转移登记'
    },
    
]



   
    
/*** 
 * 机动车业务
 * name-姓名，idTypeId-证件类型，applyWayId-预约方式，idCode-证件号码，plateNo-车辆号码
 * modelTyPeId-车辆类型，operatingTypeId-营运类型，vin-车架号，takeBranchId-预约地点，applyDate-预约日期，applytime-预约时间
*/

export default function ExchangeCarRegister (props) {
    const [takeBranchId,settakeBranchId] = useState([
        {value: '1',label: '越秀区车管所'}
    ]
        
    )//预约地点
    const [applydate,setapplydate] = useState() //预约日期
    const [applytime,setapplytime] = useState() //预约时间
    const [formData,setFormData] = useState({
        name: '', idTypeId:'',applyWayId:'',idCode:"",plateNo:"",modelTyPeId:'',operatingTypeId:'',
        vin:'',takeBranchId:'',applyDate:'',applytime:""
    })
    const [idTypeId,setidTypeId] = useState() //证件类型
    const [applyWayId,setapplyWayId] = useState() //预约方式
    const [modelTyPeId,setmodelTyPeId] = useState() //车辆类型
    const [operatingTypeId,setoperatingTypeId] = useState() //营运类型
    const [minDate,setminDate] = useState() //当前时间
    const [maxDate,setmaxDate] = useState() //最大时间
    
    //获取手机定位
    function citys () {
        let a = GeolocationUtil.Geolocation
        console.log(a,9999999)
    }

    function onChange () {

    }
    function onButtonClick () {
        if (formData.idTypeId=='') {
            ToastUtil.toast('请选择证件类型','center')
            return
        }
        if (formData.applyWayId=='') {
            ToastUtil.toast('请选择预约方式','center')
            return
        }
        if (formData.idCode=='') {
            ToastUtil.toast('请填写证件号码','center')
            return
        }
        if (formData.plateNo=='') {
            ToastUtil.toast('请填写车辆号码','center')
            return
        }
        if (formData.modelTyPeId=='') {
            ToastUtil.toast('请选择车辆类型','center')
            return
        }
        if (formData.operatingTypeId=='') {
            ToastUtil.toast('请选择营运类型','center')
            return
        }
        if (formData.vin=='') {
            ToastUtil.toast('车架号不能为空','center')
            return
        }
        if (formData.takeBranchId=='') {
            ToastUtil.toast('请选择预约地点','center')
            return
        }
        if (formData.applyDate=='') {
            ToastUtil.toast('请选择日期','center')
            return
        }
        if (formData.applytime=='') {
            ToastUtil.toast('请选择预约时间','center')
            return
        } 
        var d = formData.applyDate;
        var  myDate = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate()
        console.log(myDate,3333)
        let params = {
            vehicleId:1,
            idTypeId:formData.idTypeId.join(''),
            idCode:formData.idCode,
            applyWayId:formData.applyWayId.join(''),
            plateNo:formData.plateNo,
            operatingTypeId:formData.operatingTypeId.join(''),
            modelTyPeId:formData.modelTyPeId.join(''),
            vin:formData.vin,
            takeBranchId:formData.takeBranchId.join(''),
            // applyDate:myDate,       
            // applyDate:2019-10-16,       
        }
        console.log(params,'参数')
        //提交
        HttpUtil.post(API.AddRptRegistCertApply,
            params   
        )    
        .then(responseJson=>{ 
            const { code, data, msg } = responseJson.data 
            if(code === 0){    
                console.log('成功') 
                NavigationUtil.navigate(props,'ResultPage',{type:3})
            }else{
                Modal.alert('提示', '车辆信息不存在' , [
                    { text: 'OK', onPress: () => console.log('ok') },
                ]);
            }
        }).catch(error=>{
            // console.log(error,'error')
    });  
  

    }
    //获取当前日期
    function myDate () {    
        var d = new Date();
        var  myDate = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate()
        setminDate(myDate)  
    }   
    useEffect(() => {
        myDate()  
        citys() 
        //证件类型
        HttpUtil.get(API.KeyValueList, {kindId:3})  
            .then(responseJson=>{              
                const { code, data, msg } = responseJson.data  
                // console.log(data,'证件类型') 
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
                console.log(error,'error')
        });
        //预约方式
        HttpUtil.get(API.KeyValueList, {kindId:8})  
            .then(responseJson=>{     
                const { code, data, msg } = responseJson.data  
                // console.log(data,'预约方式')          
                if(code === 0){     
                    let arr = [];  
                    for (const v of data) {
                        arr.push({ 
                            value: v.id,
                            label: v.name
                        })  
                    }
                    setapplyWayId(arr) 
                }  
            }).catch(error=>{
                console.log(error,'error')
        });
        //车辆类型
        HttpUtil.get(API.KeyValueList, {kindId:1})  
            .then(responseJson=>{     
                const { code, data, msg } = responseJson.data  
                // console.log(data,'车辆类型')          
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
                console.log(error,'error')
        });
        //营运类型
        HttpUtil.get(API.KeyValueList, {kindId:9})  
            .then(responseJson=>{     
                const { code, data, msg } = responseJson.data  
                // console.log(data,'营运类型')          
                if(code === 0){     
                    let arr = [];  
                    for (const v of data) {
                        arr.push({ 
                            value: v.id,
                            label: v.name
                        })  
                    }
                    setoperatingTypeId(arr) 
                }  
            }).catch(error=>{
                console.log(error,'error')
        });    
        //预约地点
        HttpUtil.get(API.VaoBranchSelectList,{areaId:4401} )  
            .then(responseJson=>{     
                console.log(responseJson,22)
                const { code, data, msg } = responseJson.data  
                console.log(data,'车管所')          
                if(code === 0){     
                    let arr = [];  
                    for (const v of data) {
                        arr.push({ 
                            value: v.id,
                            label: v.name
                        })  
                    }
                    settakeBranchId(arr) 
                }  
            }).catch(error=>{
                console.log(error,'error')
        });   
            
    }, [])
        return (
            <View style={styles.container}>
                <NavigationBar title='换领机动车登记证书' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <Provider>
                <ScrollView
                    style={{ flex: 1, marginTop: 20 }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <List>
                          <InputItem
                            clear
                            type="text"
                            value={formData.name}
                            onChange={(val)=>setFormData({...formData, name: val})}
                            onOk={onChange}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            车主姓名
                        </InputItem>
                        <List>
                            <Picker
                                cols={1}
                                itemStyle={{padding: 10}}
                                data={idTypeId}
                                value={formData.idTypeId}
                            onChange={(val)=>setFormData({...formData, idTypeId: val})}
                            onOk={onChange}
                            >
                                <List.Item >证件类型</List.Item>
                            </Picker>
                        </List>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={applyWayId}
                            value={formData.applyWayId}
                            onChange={(val)=>setFormData({...formData, applyWayId: val})}
                            onOk={onChange}
                        >
                            <List.Item >预约方式</List.Item>
                        </Picker>
                        <InputItem        
                            type="number"
                            value={formData.idCode}
                            onChange={(val)=>setFormData({...formData, idCode: val})}
                            onOk={onChange}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            证件号码
                        </InputItem>
                        <InputItem
                            type="number"
                            value={formData.plateNo}
                            onChange={(val)=>setFormData({...formData, plateNo: val})}
                            onOk={onChange}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            车辆号码
                        </InputItem>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={modelTyPeId}
                            value={formData.modelTyPeId}
                            onChange={(val)=>setFormData({...formData, modelTyPeId: val})}
                            onOk={onChange}
                        >
                            <List.Item >车辆类型</List.Item>
                        </Picker>
                        
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={operatingTypeId}
                            value={formData.operatingTypeId}
                            onChange={(val)=>setFormData({...formData, operatingTypeId: val})}
                            onOk={onChange}
                        >
                            <List.Item >营业类型</List.Item>
                        </Picker>
                        <InputItem
                            type="number"
                            value={formData.vin}
                            onChange={(val)=>setFormData({...formData, vin: val})}
                            onOk={onChange}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            车架号
                        </InputItem> 
                        <Picker
                            cols={1}  
                            itemStyle={{padding: 10}}
                            data={takeBranchId}
                            value={formData.takeBranchId}
                            onChange={(val)=>setFormData({...formData, takeBranchId: val})}
                            onOk={onChange}
                        >
                            <List.Item >预约地点</List.Item>
                        </Picker>
                        <DatePicker
                            cols={3}
                            itemStyle={{padding: 10}}
                            mode="date"
                            value={formData.applyDate}
                            onChange={(val)=>setFormData({...formData, applyDate: val})}
                            onOk={onChange}
                            format="YYYY-MM-DD"
                            defaultDate={new Date()}
                            minDate={new Date(minDate)}
                            maxDate={new Date(2019, 12, 31)}
                        >
                            <List.Item >预约日期</List.Item>
                        </DatePicker>
                        <DatePicker
                            mode="time"
                            itemStyle={{padding: 10}}
                            data={applytime}
                            value={formData.applytime}
                            onChange={(val)=>setFormData({...formData, applytime: val})}
                            onOk={onChange}                    
                        >
                            <List.Item >预约时间</List.Item>
                        </DatePicker>
                    </List>
                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onButtonClick}>提交</Button>
                    </List>            
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
});

