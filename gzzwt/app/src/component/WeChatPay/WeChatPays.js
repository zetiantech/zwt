/**
 * @description 支付
 * @author 择天团队
 * 
 * **/
import {
    Button, Provider,List,Picker
 } from '@ant-design/react-native';

 import React, { Component,useState,useEffect, useRef } from 'react'
 import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View,alert,Image} from 'react-native';
import Alipay from './Alipay'
import {API} from '../../api/Api'
import HttpUtil from  '../../util/HttpUtil'
import NavigationUtil from  '../../util/NavigationUtil'
import ToastUtil from 'src/util/ToastUtil'; // 轻提示

import * as WeChat from 'react-native-wechat'; // 微信支付


const {width} = Dimensions.get('window');
const areaData = [
    {label: '支付宝支付',value: '1'},
    {label: '微信支付',value: '2'},
]
export default class CustomAlertDialogSS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            payStr:'',
            payshow:false,
            value:''      
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({isVisible: nextProps.show});
    }
    closeModal() {
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }
    _onsuccess(){
        NavigationUtil.navigation(this.props,'ResultPage',{type:4})
        
    }
    //拉起支付框-支付宝
    aliPayAction(payStr) {
         Alipay.pay(payStr).then((data) =>{
            let resultDic = {};
             if (Platform.OS === 'ios'){
                 resultDic = data[0];
             } else {
                 resultDic = data;
             }
             if (resultDic.resultStatus == '9000'){
                 console.log(resultDic,111111)
                    {this. _onsuccess()}
                    
             }else {
                 //支付失败
             }
         }).catch((err) => {
             console.log('err='+err);
             this.refs.toast.show('支付失败');
         });
     }
     //获取支付
     onView(){
        let _this=this
        if (_this.state.value==='') {
            // ToastUtil.toast('请选择支付方式', 'center');         
        }else{
            let  amount = _this.props.state.amount + ""
            let orderNo = _this.props.state.orderNo 
            let  payid = _this.state.value.join("")||''
            console.log(payid,'支付类型')
            console.log(orderNo,'订单号')
            console.log(amount,'价格')
            const payStr = {
                amount: amount,
                orderNo: orderNo,
                // name: _this.props.state.name,
                payTypeId:payid
            }
        if (payid==1) {  
            console.log(payStr)  
            HttpUtil.get(API.PayOrder,payStr).then(responseJson => {
                console.log(responseJson,'调用支付宝接口')
                const { code, data, msg } = responseJson.data
                    if (code == 0) { 
                        this.aliPayAction(data.payStr)                       
                    }else{
                ToastUtil.toast(msg, 'top');         
        }  
                }).catch(error => {
                console.log(error)
            });      
        }if (payid==2) {
            console.log('微信支付')  
            
            } 
        }
                
     }
    onChange = value => {
        console.log(value,44444444)
        this.setState({ value });
    };
    renderDialog() {
        const payStr = this.state.payStr 
        console.log(payStr,'payStr')
        return (
            <View style={styles.modalStyle}>
                <View style={styles.optArea}>
                        <TouchableOpacity onPress={() => this.closeModal()} style={styles.closePay}>
                            <Image source={require('../../res/images/common/guanbi.png')}></Image>
                            <Text>确认支付</Text>
                            <Text></Text>
                        </TouchableOpacity>             
                    <View style={styles.dalogPrice}>
                        <Text style={styles.dalogPriceText}>{this.props.state.amount}元</Text>
                    </View>
                    <Provider style={{flex:1}}>
                            <Picker
                            cols={1} 
                            data={areaData}
                            value={this.state.value}
                            onChange={this.onChange}        
                            >
                            <List.Item  >
                                支付方式
                            </List.Item>
                            </Picker>
                    </Provider>

                    <View style={{marginVertical:40}}>
                        <Button style={{marginHorizontal:20,}} onPress={() => {this.onView()}} type={'primary'}>立即付款</Button>
                    </View>
                </View> 
                <View>
                </View>           
            </View>  
        )
    }    
    render() {
        return (
            <Provider style={{flex: 1}}> 
                <Modal
                    transparent={true} 
                    animationType="slide"
                    visible={this.state.isVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}>
                    <TouchableOpacity style={styles.container} activeOpacity={1}
                                      >
                        {this.renderDialog()}
                    </TouchableOpacity>
                </Modal>
            </Provider>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalStyle: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: width,
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ffffff',
    },
    optArea: {
        flex: 1,   
    },
    closePay:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingHorizontal:20,
        backgroundColor:'#F4F5FF',
        paddingVertical:10,
        alignItems:'center'
    },
    dalogPrice:{
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:50,
        backgroundColor:'#fff'
    },
    dalogPriceText:{
        fontSize:36,
        color:'#333333'
    },
    paywayView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20
    },
    payway:{
        color:'#999999',
        fontSize:16
    }

});