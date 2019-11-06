/**
 * @description 添加缴费账户
 * @author ct
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,TouchableOpacity,Image,Text,

} from 'react-native';

import {
    Button,
    WhiteSpace,InputItem,List,Picker,Provider,Radio,Checkbox
} from '@ant-design/react-native';

import Form from 'src/component/FormComponent'
import GlobalStyles from '../../../res/styles/GlobalStyles'

import NavigationBar from '../../../common/NavigationBar'
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

const AddLivePayLog = ({})=> {
    return (
        <>
        <TouchableOpacity style={styles.warp}>
            <Image style={styles.payimg} source={require('../../../res/images/livepay/icon_fir_big.png')}></Image>
            <View >
                <Text style={styles.text}>燃气费</Text>           
            </View>     
        </TouchableOpacity>
        </>
    )
}


export default function AddFuelPay (props) {
    const [data,setdata] = useState ([
        { label: '广州市燃气集团有限公司', value: '0' }
    ])
    const [sedata,setsedata] = useState ([
        { part1Value:1 }
    ])
    const [formData,setFormData] = useState({
        payCompany:''
    })
    function onClick () {
        ToastUtil.toast('暂无数据','center')
    }
    return (
        <View style={styles.container}>
            <NavigationBar
                popEnabled={true}
                title='添加缴费账户'
                hide={false}
                navigator={props.navigation}
                popEnabled={true} statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}/>
            <AddLivePayLog/>
            <Provider>    
            <WhiteSpace size="lg" />
            <List>
                <Picker
                data={data}
                cols={1}
                labelNumber='10'
                value={formData.payCompany}
                onChange={(val)=>setFormData({...formData, payCompany: val})}
                    >
                    <List.Item 
                    arrow="horizontal" >
                        缴费单位
                    </List.Item>
                </Picker>
                <InputItem
                    type="number"
                    labelNumber={8}
                    textAlign='right'
                    placeholder="请输入"
                >
                用户编号
                </InputItem>
                
            </List>    
            <View style={styles.btnwarp}>
                <Button type="primary" onPress={()=>onClick()}>下一步</Button>  
            </View>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Checkbox >已同意</Checkbox>  
                <Text style={{color:'#2F74ED'}}>《生活缴费服务协议》</Text>      
            </View>     
        </Provider>
           
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    warp:{
        backgroundColor:'#fff',
        marginTop:15,
        paddingVertical:20,
        alignItems:'center',
        justifyContent:'center',
        
    },
    payimg:{
        width:70,
        height:70,
        marginLeft:20,
        marginRight: 20,
    },
    text:{
        paddingVertical:10,
        color:'#333',
        fontSize:16
    },
    text2:{
        marginLeft:10,
        color:'#999'
    },
    btnwarp:{
        paddingVertical:20,
        marginTop:10,
        marginHorizontal: 10,
    },
    btnview:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    btntext:{
        fontSize:16,
        marginLeft:10
    }

});