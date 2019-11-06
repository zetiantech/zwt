/**
 * @description 场地详情
 * @author 择天团队
 * 
 * **/

import React, { Component,useState,useEffect, useRef } from 'react'
import  {
    StyleSheet,
    View,
    Text,
    ScrollView,Image,TouchableOpacity
 } from 'react-native'
 import {
    Button,
    Modal,
    Provider
   
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'
 import  GlobalStyles from '../../../res/styles/GlobalStyles'
 import WeChatPays from '../../../component/WeChatPay/WeChatPays'
 import JSBridge from 'src/bridge/JSBridge'
 


 const ActivityIntroduction = ({data}) => {
     return (
    <View style={{marginTop:15}}>
         {data && 
            <View style={{backgroundColor:'#fff'}}>
                <View >
                    <View style={styles.leftName}>
                        <Text style={styles.lefttext1}>活动名称</Text>
                        <Text>{data.name}</Text>
                    </View>
                </View>
                <View >
                    <View style={styles.leftName}>
                        <Text style={styles.lefttext1}>活动时间</Text>
                        <Text style={{width:200}}>{data.startTime} 至{data.endTime}</Text>
                    </View>
                </View>
                <View >
                    <View style={styles.leftName}>
                        <Text style={styles.lefttext1}>活动地点</Text>
                        <Text>{data.address}</Text>
                    </View>
                </View>  
                <View >
                    <View style={styles.leftName}>
                        <Text style={styles.lefttext1}>报名费用</Text>
                        <Text>{data.price}元</Text>
                    </View>
                </View> 
                
            </View>  
              } 
        </View>

     )
 }


 const PeopleInfo = ({info}) => {
     return (
        <View>
        {info && 
             <View style={{backgroundColor:'#fff',marginTop:15}}>
                <View >
                 <View style={styles.peoView}>
                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.peoname}>报名人</Text>
                         <Text>{info.name}</Text>
                     </View>                      
                     {/* <TouchableOpacity style={{flexDirection:'row',}}>
                         <Image  style={{marginTop:-3,width:24,height:24}}  source={require('../../../res/images/common/xiougai.png')}></Image>
                         <Text style={{color:'#2F74ED'}}>修改</Text>
                     </TouchableOpacity> */}
                 </View>
                 <View style={styles.peoiphon}>
                     <Text style={styles.peoname}>手机号</Text>
                     <Text>{info.phone}</Text>
                 </View>
             </View>
         
         </View>
       
        } 
        </View>
     )
 }




export default function Confirmation (props) {
    
        const data = props.navigation.getParam('data')
        const [orderdata,setorderdata] = useState ()
        const amount = {amount:data.price} //获取支付价格
        const [showTypePop,setshowTypePop] = useState(false)//支付   
        console.log(orderdata,'订单号')
        const [info, setPersonalInfo] = useState({
            name: '测试账号',
            phone: "13088870731"
        })
        useEffect(() => {
            getUserInfo()
         }, [])
         //获取个人信息
         const getUserInfo = () => {
             HttpUtil.post(API.QUERY_USER_INFO, {})
                 .then(responseJson=>{   
                     const { code, data, msg } = responseJson.data
                     if(code === 0){
                         setPersonalInfo(data)
                     }
                 }).catch(error=>{
                     LogUtil.debug(error)
                 });  
         }
       
        //拉起支付
        function onClickPay () {
            console.log(111)
            // Modal.alert('', '确认报名吗！', [    
            //     { text: '取消', onPress: () => {}},          
            //     { text: '确认', onPress: () => {} }
            // ]);
            let name = info.name
            let phone =info.phone
            const bridge = new JSBridge(props);
            HttpUtil.post(API.MatchApplyAdd, {
                amount:data.price,
                matchId:data.id,
                phone:phone,          
            }).then((res) => {
                res = res.data;
                console.log(res,555555)
                if (res.code === 0) {
                    setorderdata(res.data)
                    // bridge.pay('alipay',res.data.orderNo)
                    setshowTypePop(!showTypePop)                          
                } else {
                    ToastUtil.toast(data.msg || '获取数据失败', 'center');
                }
            }).catch((err) => {
                console.log(err,111111)
            }) 

        }
    
       return (
           <Provider style={styles.container} >
               <View >
               <NavigationBar title='报名确认'  hide={false} popEnabled = {true} 
               navigator ={props.navigation}
               statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}             
               />
                <ActivityIntroduction data={data}/>  
                <PeopleInfo info={info}  />               
            
                <Button  type="primary" style={styles.btnque} onPress={onClickPay}>确认</Button>
                {orderdata && 
                    <WeChatPays  show={showTypePop}  state={orderdata}  closeModal={(show) => {
                        setshowTypePop(show)
                    }}/> 
                }                       
                 
                </View>
           </Provider>
       );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f0f0'
    },
    searchInputBox: {
        height: (Platform.OS === 'ios') ? 30:40,
        lineHeight: (Platform.OS === 'ios') ? 30:30,
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderRadius: (Platform.OS === 'ios') ? 15:20,
        borderWidth: 1,
        width:300,
        backgroundColor:'#fff'

    },
    searchIcon: {
        position: "absolute",
        top: 7,
        left: 12,
        width: 20,
        height: 20,
        tintColor:'#ccc'
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 30:40,
        lineHeight: (Platform.OS === 'ios') ? 30:40,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 3,
        opacity: 0.8,
        fontSize: 12,
        color: '#999',
    },
    WorksContentBox: {
        // flex:1,
        backgroundColor: '#ffffff'
    },
    textTow:{
        marginBottom: 2,
        marginRight: 2,
        backgroundColor:'#fff',
        // flex:1,
        height:50
      },
    click:{
        marginBottom: 2,
        marginRight: 2,
        backgroundColor:'#F4F5FF',
        // flex:1,
        height:50,
    },
    textClick:{
        textAlign:'center',
        lineHeight:25,  
        marginHorizontal:15,
        color:'#2F74ED'
    },
    leftName:{
        flexDirection:'row',
        marginHorizontal:15,
        marginVertical:20
    },
    lefttext1:{
        color:'#999999',
        marginRight:50
    },
    peoView:{
        flexDirection:'row',
        marginHorizontal:15,
        marginVertical:20,
        justifyContent:'space-between'
    },
    peoname:{
        color:'#999999',
        marginRight:50
    },
    peoiphon:{
        flexDirection:'row',
        marginHorizontal:15,
        marginVertical:20
    },
    btnque:{
        marginHorizontal:20,
        marginTop:50
    }  

});