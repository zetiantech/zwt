/**
 * @description 生活缴费首页
 * @author ct
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,TouchableOpacity,Image,Text,

} from 'react-native';

import {
    Button,
    WhiteSpace
} from '@ant-design/react-native';

import Form from 'src/component/FormComponent'
import GlobalStyles from '../../../res/styles/GlobalStyles'

import NavigationBar from '../../../common/NavigationBar'
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转



const LivePayView = ({ontabDetail})=> {
    return (
        <>
        <TouchableOpacity style={styles.warp} onPress={ontabDetail}>
            <Image style={styles.payimg} source={require('../../../res/images/livepay/icon_water_small.png')}></Image>
            <View >
                <Text style={styles.text}>水费</Text>
                <Text style={styles.text2}>521543112  *小米</Text>                
            </View>
            <View style={{marginLeft:60,}}>
                <Image style={{tintColor:'#ccc',height:24,width:24}} source={require('../../../res/images/ic_tiaozhuan.png')}></Image>
            </View>
        </TouchableOpacity>
        </>
    )
}
const LivePayButton = ({onClickAdd})=> {
    return (
        <>
        <TouchableOpacity style={styles.btnwarp} onPress={onClickAdd}>
            <View style={styles.btnview}>
                <Image style={{width:16,height:16}} source={require('../../../res/images/livepay/btn_add.png')}></Image>
                <Text style={styles.btntext}>添加缴费账户</Text>
            </View>     
        </TouchableOpacity>
        </>
    )
}

export default function LivePay (props) {
    const [data,serdata] = useState ()

   function onClickAdd(){
        NavigationUtil.navigate(props,'AddLivePay')
    }
    function ontabDetail () {
        NavigationUtil.navigate(props,'ConfirmPay')
    }
    return (
        <View style={styles.container}>
            <NavigationBar
                popEnabled={true}
                title='生活缴费'
                hide={false}
                navigator={props.navigation}
                popEnabled={true} statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}} />
           <LivePayView ontabDetail={ontabDetail}/>
            <LivePayButton onClickAdd={onClickAdd}/>
           
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    warp:{
        flexDirection:'row',
        backgroundColor:'#fff',
        marginTop:15,
        paddingVertical:20,
        alignItems:'center',
        justifyContent:'space-evenly'
        
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
        color:'#999'
    },
    btnwarp:{
        paddingVertical:20,
        backgroundColor:'#fff',
        marginTop:10
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