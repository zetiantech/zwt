/**
 * @description 羊城通充值
 * @author 择天团队
 * 
 * **/

import React, { useState, useEffect, } from 'react';
import  {
    StyleSheet,
    View,
    Text,
    ScrollView,ImageBackground,Image,TextInput,TouchableOpacity
 } from 'react-native'
 import { 
    Button,
    InputItem
   
 } from '@ant-design/react-native';

 import NavigationBar from 'src/common/NavigationBar'//头部导航
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import HttpUtil from 'src/util/HttpUtil'
import { API } from 'src/api/Api'
import Utils from 'src/util/Utils'






export default function recharge (props) {


        const [cutType,setcutType] = useState(1)

        function onclick (index) {
            setcutType(index)                  
        }           
        const data = [
            {id:1,price:50},
            {id:2,price:100},
            {id:3,price:150},
            {id:4,price:200},
            {id:5,price:250},
            {id:6,price:300}
        ]      
        function onMakeWorks () {
            ToastUtil.toast('暂未开通','center')
        }
        function onRightBtn () {
            // ToastUtil.toast('暂未开通','center')
        }
        const ListView = ( {item} ) =>{
            return (
                <>  
                    {item&& item.id==cutType?  
                    <TouchableOpacity  style={styles.payView1} >
                        <Text style={styles.textpay1}>{item.price}元</Text>
                     </TouchableOpacity>: 
                    <TouchableOpacity  style={styles.payView} onPress={()=> onclick(item.id)} >
                        <Text style={styles.textpay}>{item.price}元</Text>
                    </TouchableOpacity>    
                    } 
                </>
            )
        }
        const RightBtnView = ({onRightBtn}) => {
            return (
                <View style={styles.rightBtnBox}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={onRightBtn}>
                        <View style={{paddingRight: 15}}>
                            <Text style={styles.rightBtn}>充值记录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
           <View style={styles.container} >
               <NavigationBar
                popEnabled={true}
                title='羊城通充值'
                hide={false}
                navigator={props.navigation}
                popEnabled={true} statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                rightButton={
                    <RightBtnView onRightBtn={onRightBtn} />
                }
                />          
            <View style={{flex:1}}>
                <View style={{marginVertical:20,marginLeft:20}}>
                    <Text style={{color:'#999'}}>请输入羊城通卡号</Text>
                </View>
            <View style={{backgroundColor:'#fff'}}>
                <InputItem 
                clear
                type="bankCard"
                // value={bankcard}
                onChange={value => {}}
                placeholder="8-10位数字"
                >
                卡号
            </InputItem>
            </View>
            <View style={{marginVertical:20,marginLeft:20}}>
                <Text style={{color:'#999'}}>请选择充值金额</Text>
            </View>
            <View style={styles.paywrap}>
                {data&&data.map((item,i)=>(
                    <View style={styles.payTouchView}>
                        <ListView item={item}/>
                    </View>
                    ))
                }                                                                           
            </View>
            <Button style={styles.btnBox} type="primary" onPress={onMakeWorks}>立即办理</Button>
        </View> 
    </View>
       );
   }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f0f0',
        borderWidth:0
    },
    paywrap:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        backgroundColor:'#fff',
        paddingVertical:10

    },
    payView:{
        height:45,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#2F74ED',
        borderRadius:5,
        marginVertical:10,
        // backgroundColor:'red'
    },
    payTouchView:{
        width:"30%",

    },
    payView1:{     
        height:45,
        justifyContent:'center',
        alignItems:'center',
        // borderWidth:1,
        backgroundColor:'#2F74ED',
        borderRadius:5,
        marginVertical:10,
        // backgroundColor:'red'
    },
    textpay:{
        color:'#2F74ED',fontSize:18
    },
    textpay1:{
        color:'#fff',fontSize:18
    },
    btnBox:{
        marginTop:40,
        marginHorizontal:10,
    },
    rightBtnBox: {
        // flexDirection: 'row',

    },
    rightBtn:{
        color:'#2F74ED',

    }
});