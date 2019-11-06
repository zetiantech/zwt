/**
 * @description 缴费详情
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
import WeChatPays from '../../../component/WeChatPay/WeChatPays'



const AddLivePayLog = ({})=> {
    return (
        <>
        <TouchableOpacity style={styles.warp}>
            <Image style={styles.payimg} source={require('../../../res/images/livepay/icon_water_small.png')}></Image>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                <Text style={styles.text1}>￥150.00</Text>           
                <Text style={styles.text}>水费</Text>           
            </View>
            <Text style={{color:'#ccc'}} >应缴金额</Text>    
        </TouchableOpacity>
        </>
    )
}
const AddView = ({data,setsedata,sedata})=> {
    return (
        <View >  
            <View style={{flexDirection:'row',backgroundColor:'#fff'}}>           
                <View style={styles.cardwarp}>
                    <Text style={styles.cardtext}>缴费单位</Text>
                    <Text style={styles.cardtext}>缴费户号</Text>
                    <Text style={styles.cardtext}>缴费户名</Text>
                    <Text style={styles.cardtext}>地址信息</Text>
                </View>  
                <View style={styles.cardwarp}>
                    <Text style={styles.cardtext1}>广州自来水公司</Text>
                    <Text style={styles.cardtext1}>545412</Text>
                    <Text style={styles.cardtext1}>*小米</Text>
                    <Text style={styles.cardtext1}>*****2栋2204室</Text>
                </View> 
            </View>     
        </View>
    )
}

export default function LivePay (props) {
    const [data,setdata] = useState ([
        { label: '广州市自来水有限公司', value: '0' }
    ])
    const [sedata,setsedata] = useState ([
        { part1Value:1 }
    ])
    function startpay () {

    }

    const [showTypePop,setshowTypePop] = useState(false)
    function onClickPay () {
        ToastUtil.toast('暂无数据','center')
        // setshowTypePop(!showTypePop)
    }
    
    let amount = {amount:150}
    return (
        <View style={styles.container}>
            <NavigationBar
                popEnabled={true}
                title='缴费详情'  
                hide={false}
                navigator={props.navigation}
                popEnabled={true} statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}/>
            <AddLivePayLog/>
            <AddView data={data} sedata={sedata} setsedata={setsedata}/>
            <View style={styles.bonview}>
                <Button type="primary"  showTypePop={showTypePop}   onPress={onClickPay}>立即缴费</Button>
                <WeChatPays  show={showTypePop}  state={amount}   closeModal={(show) => {
                    setshowTypePop(show)
                }}/>
            </View>     
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
        paddingVertical:30,
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
        fontSize:16,
        marginLeft:10
    },
    text1:{
        paddingVertical:10,
        color:'#333',
        fontSize:24
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
    }, 
    cardwarp:{
        flexDirection:'column',
        backgroundColor:'#fff',
        paddingTop:10,
        justifyContent:'flex-start',
        paddingBottom:10      
    },
    cardtext:{
        color:'#999',
        marginLeft:10,
        paddingVertical:5
    },
    cardtext1:{
        marginLeft:30,
        paddingVertical:5,
        color:'#333',
    },
    bonview:{
        marginHorizontal:10,
        marginTop:20
    }
});