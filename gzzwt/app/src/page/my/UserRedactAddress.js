/**
 * @description 编辑收货地址
 * @author 择天团队 ct 
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,Switch,AsyncStorage,TouchableOpacity,DeviceEventEmitter
} from 'react-native';
import { 
    Button,
    List,
    Picker,
    Provider,Toast,WingBlank,Modal,TextareaItem,InputItem,
 } from '@ant-design/react-native';

 import HttpUtil from 'src/util/HttpUtil' //接口请求
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'
 import AsyncStorageUtil from "src/util/AsyncStorageUtil";

const dataSource = require('@bang88/china-city-data');



const citySource = {}

function getCityLabel(list) {
    list.map((item, i)=>{
        citySource[item.value] = item
        if(item.children && item.children){
            getCityLabel(item.children)
        }
    })   
}
getCityLabel(dataSource)

//
const RightBtnView = ({onClickbtn}) => {
    return (
        <View style={styles.rightBtnBox}>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={onClickbtn}>
                <View style={{paddingRight: 15}}>
                    <Text style={styles.rightBtn}>保存</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

/*** 
 * 收货地址
 * 
*/ 
export default function CarInformation (props) {
    let userId = props.navigation.getParam('id')


    const [formData,setFormData] = useState({
        name:'',phone:"",areaId:"",completeAddr:""
    })   
    const [checked, setchecked] = useState(false)
    console.log(formData.areaId,888888)

    useEffect(() => {
        //获取收货地址
        HttpUtil.get(
            'http://192.168.10.57:8762/user/address/getOne',
            // API.AddressGetOne,
        {
            id:userId,
        }).then(responseJson => { 
            const { code, data, msg } = responseJson.data 
                if(code == 0) {
                    setFormData({
                        name:data.name,
                        phone:data.phone,
                        areaId:["44", "4401", "440111"],
                        completeAddr:data.completeAddr
                    })
                }else{
                    ToastUtil.toast(msg)
                }                                                                               
            }).catch(error => console.log('添加用户地址--', error));      
    }, [])

    function onSwitchChange (value) {
        setchecked(value)
      };  
    //编辑收货地址
    function onClickbtn (){
        let maleRegistAreaName = [citySource[formData.areaId[0]].label, citySource[formData.areaId[1]].label, citySource[formData.areaId[2]].label].join(" ")||""    
        HttpUtil.post(
            // API.AddressSave, 
            'http://192.168.10.57:8762/user/address/save',
        {
            areaId:parseInt(formData.areaId),
            id:userId,
            address:maleRegistAreaName,
            completeAddr:formData.completeAddr,
            phone:formData.phone,
            name:formData.name
        }).then(responseJson => { 
            const { code, data, msg } = responseJson.data 
                if(code == 0) {    
                    console.log(data,1111111111)
                    if (checked==true) {
                        let ADDRESS_ID = JSON.stringify(data.id)
                        AsyncStorageUtil.setItem('ADDRESS_ID', ADDRESS_ID)
                        DeviceEventEmitter.emit("shuaxin", 2);
                    }
                // NavigationUtil.goBack(props)
                DeviceEventEmitter.emit("shuaxin", 2);
                NavigationUtil.navigate(props, 'UserAddRess')
                }else{
                    ToastUtil.toast(msg)
                }                                                                               
            }).catch(error => console.log('编辑收货地址--', error));
    }
    //删除收货地址
    function onClickDetail () {
        Modal.alert('提示', '确认要删除吗', [
            { text: '取消', color: '#999' },
            { text: '确认', onPress: () => {
                detailAddress()
            }},
        ]);
    }
    //删除收货地址
    function detailAddress () {
        HttpUtil.get(API.AddressDelete, {
            id:userId
        }).then(responseJson => { 
            const { code, data, msg } = responseJson.data 
                if(code == 0) { 
                    DeviceEventEmitter.emit("shuaxin", 2);
                    NavigationUtil.navigate(props, 'UserAddRess')
                }else{
                    ToastUtil.toast(msg)
                }                                                                               
            }).catch(error => console.log('添加用户地址--', error));
    }
    console.log(checked,666666666666)
    
        return ( 
            <View style={styles.container}>     
                        <NavigationBar title='编辑收货地址' hide={false} popEnabled = {true}  navigator ={props.navigation}
                        statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                        rightButton={
                            <RightBtnView onClickbtn={onClickbtn} />
                        }
                        />
                <Provider>
                    <List>               
                        <InputItem
                            type="text"
                            textAlign='right'
                            value={formData.name}
                            onChange={(value) => setFormData({...formData, name: value}) }
                            placeholder="请输入"
                        >
                        姓名
                        </InputItem>
                        <InputItem
                            type="text"
                            textAlign='right'
                            value={formData.phone}
                            onChange={(value) => setFormData({...formData, phone: value}) }
                            placeholder="请输入"
                        >
                        手机号码
                        </InputItem>
                        <Picker
                            cols={3}
                            data={dataSource}
                            value={formData.areaId}
                            onChange={(val)=>setFormData({...formData, areaId: val})}
                            // onOk={onChangecity}
                        >
                        <List.Item arrow="horizontal">收货地址</List.Item>
                        </Picker> 
                        <TextareaItem  
                            value={formData.completeAddr}
                            onChange={(val)=>setFormData({...formData, completeAddr: val})}
                            placeholder="详细地址" 
                            count={50} 
                            style={{height:120,marginLeft:8,fontSize:18}}>                                                   
                        </TextareaItem>                                                                                                                 
                    </List>
                    <List.Item 
                        extra={
                            <Switch
                            onTintColor='#2F74ED'  //开关打开时的背景颜色
                            thumbColor='#fff' //开关上原形按钮的颜色
                            trackColor='#999' //关闭时背景颜色
                            onValueChange={(e) => onSwitchChange(e)} 
                            value={checked}//默认状态
                        /> 
                    }
                    >
                    设为默认地址
                    </List.Item>                      
                    <List style={{margin: 20,}}>
                        <Button  type="warning" onPress={()=> onClickDetail()}>删除收货地址</Button>
                    </List>                 
                </Provider>       
            </View>
        )
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
    textinput:{
        backgroundColor:'#fff',
        marginLeft:15,
        borderBottomWidth:0.5,
        fontSize:18,
        borderColor:"#E5E5E5"
    },
    rightBtn:{
        color:'#2F74ED'
    } 
}); 

