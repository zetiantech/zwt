/**
 * @description 收货地址
 * @author 择天团队 ct 
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet 
} from 'react-native';
import { 
    Button,
    List,
    Picker,
    Provider,Toast,WingBlank,Modal,TextareaItem,InputItem
 } from '@ant-design/react-native';

 import HttpUtil from 'src/util/HttpUtil' //接口请求
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'

const dataSource = require('@bang88/china-city-data');



/*** 
 * 收货地址
 * 
*/ 
export default function CarInformation (props) {
    const [formData,setFormData] = useState({
        name:'',phone:"",targetAreaId:"",addressText:""
    })
    
    const [cityval, setcityval] = useState({})//转入市名称-比如-东莞市


    function onChange () {
    }
    //市名称
    function onChangecity (val) {
        // console.log(val,88)
        // let arr = []
        // let att = []
        // for( const V of dataSource ){
        //     arr.push(V)
        // }
        // for (var i=0;i < arr.length;i++){
        //     if(val[0]=== arr[i].value){
        //         for(var j=0;j<arr[i].children.length;j++){
        //             att.push(arr[i].children[j])
        //         }
        //     }
        // } 
        // for (const A of att){
        //     if(val[1]==A.value){
        //         setcityval(A.label)
        //     }
        // }
    }
    useEffect(() => {
    }, [])
    //提交
    function onClickbtn () {
       
        // NavigationUtil.navigate(props)
    }
        return ( 
            <View style={styles.container}>     
                        <NavigationBar title='添加收货地址' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
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
                            value={formData.targetAreaId}
                            onChange={(val)=>setFormData({...formData, targetAreaId: val})}
                            onOk={onChangecity}
                        >
                                            <List.Item arrow="horizontal">证件类型</List.Item>

                        </Picker>  
                        <TextareaItem  placeholder="详细地址" count={50} style={{height:80,marginLeft:8,fontSize:18}}>                         
                        </TextareaItem>                                                                                                                 
                        </List>
                            
                        <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onClickbtn} >下一步</Button>
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
    }
});

