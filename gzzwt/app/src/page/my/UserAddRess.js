/**
 * @description 我的收货地址
 * @author 择天团队 ct 
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView ,DeviceEventEmitter,
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

 import GlobalStyles from '../../res/styles/GlobalStyles'
 import AsyncStorageUtil from "src/util/AsyncStorageUtil";


const ListView = ({myAddress,onClickRedact,defaultId}) => {
     return (
         <List>
             {myAddress&&myAddress.map((item,i)=>(
                <View style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
                            <View style={styles.borwrap}>
                                <Text style={styles.borderText}>{item.name.slice(0,1)}</Text>
                            </View>
                            <View style={{width:(GlobalStyles.window_width)/2}}>
                                <View style={styles.text}>
                                    <Text style={{fontSize:16}}>{item.name}</Text>
                                    <Text style={styles.textphone}>{item.phone}</Text>
                                </View>
                                <View style={styles.textresswrap}>
                                    {item.id== defaultId&&
                                        <View style={styles.onView}>
                                            <Text style={styles.onText}>默认</Text>
                                        </View>
                                    }
                                    <Text style={styles.textaddress}>{item.address} {item.completeAddr}</Text>
                                </View>
                            </View>
                            <View style={styles.border}/>
                            <TouchableOpacity style={{marginLeft:30}} onPress={()=> onClickRedact(item.id)}>
                                <Text style={{color:'#999'}}>编辑</Text>
                            </TouchableOpacity>
                    </View>
             ))}              
         </List>
     )
 }
 const ListViewClick = ({myAddress,onClickRedact,defaultId,onGoBackClick}) => {
    return (
        <List>
            {myAddress&&myAddress.map((item,i)=>(
               <TouchableOpacity 
               onPress={()=> onGoBackClick(item)}          
               style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
                           <View style={styles.borwrap}>
                               <Text style={styles.borderText}>{item.name.slice(0,1)}</Text>
                           </View>
                           <View style={{width:(GlobalStyles.window_width)/2}}>
                               <View style={styles.text}>
                                   <Text style={{fontSize:16}}>{item.name}</Text>
                                   <Text style={styles.textphone}>{item.phone}</Text>
                               </View>
                               <View style={styles.textresswrap}>
                                   {item.id== defaultId&&
                                       <View style={styles.onView}>
                                           <Text style={styles.onText}>默认</Text>
                                       </View>
                                   }
                                   <Text style={styles.textaddress}>{item.address} {item.completeAddr}</Text>
                               </View>
                           </View>
                           <View style={styles.border}/>
                           <TouchableOpacity style={{marginLeft:30}} onPress={()=> onClickRedact(item.id)}>
                               <Text style={{color:'#999'}}>编辑</Text>
                           </TouchableOpacity>
                   </TouchableOpacity>
            ))}              
        </List>
    )
}
const RightBtnView = ({onClickbtn}) => {
    return (
        <View style={styles.rightBtnBox}>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={onClickbtn}>
                <View style={{paddingRight: 15}}>
                    <Text style={styles.rightBtn}>添加新地址</Text>
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
    /*** 
    * 是否个人信息页面进入 默认为 1
    * ressType:2,其他页面进入
    */ 
    let ressType = props.navigation.getParam('type')||"1" 
    const [myAddress,setMyAddress] = useState()
    const [defaultId,setdefaultId] = useState()||""

    const [userId,setuserId] = useState()||""

    function getUserAddress () {
        //获取用户地址   
        HttpUtil.get(API.AddressList,{
            userId:userId
        }).then(responseJson => { 
            const { code, data, msg } = responseJson.data 
                if(code == 0) {
                    console.log('刷新列表')
                    setMyAddress(data)
                    // ToastUtil.toast(msg)
                }else{
                    ToastUtil.toast(msg)
                }                                                                               
            }).catch(error => console.log('获取地址列表--', error)); 
    }
    // 读取本地
    function readData () {
        AsyncStorageUtil.getItem('ADDRESS_ID', result => {
            console.log(result,'本地存储')
            setdefaultId(result)
        })  
    }
    //编辑
    function onClickRedact (itemId) {
        NavigationUtil.navigate(props, 'UserRedactAddress',{id:itemId})
    }
    //添加新地址 
    function onClickbtn (){
        NavigationUtil.navigate(props, 'UserAddAddRess',{id:userId})
    }
    //返回传值
    function onGoBackClick (item) {
        NavigationUtil.goBack(props)
        DeviceEventEmitter.emit('info',{item:item})
    }
    useEffect(() => {   
        //获取用户信息
        HttpUtil.post(API.QUERY_USER_INFO, {})
            .then(responseJson=>{
                const { code, data, msg } = responseJson.data
                if(code === 0){
                    setuserId(data.id)
                }
            }).catch(error=>{
                LogUtil.debug(error)
        }); 
        readData()   
        getUserAddress()    
    }, [])  
    const DeviScr = DeviceEventEmitter.addListener('shuaxin',()=>{        
        getUserAddress()      
        }
    );  
    useEffect(() => {
        DeviScr.remove()
    }, [myAddress])

    return ( 
        <View style={styles.container}>     
            <NavigationBar title='我的收货地址' hide={false} popEnabled = {true}  navigator ={props.navigation}
            statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
            rightButton={
                <RightBtnView onClickbtn={onClickbtn} />
            }
            />
            <ScrollView>
                {ressType==1&&
                <ListView myAddress={myAddress} onClickRedact={onClickRedact} defaultId={defaultId}/>              
                }
                {ressType==2&&         
                <ListViewClick myAddress={myAddress} onClickRedact={onClickRedact} defaultId={defaultId} onGoBackClick={onGoBackClick}/>              

                }
            </ScrollView>       
        </View>
        )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    borwrap:{
        width:'12%',
        height:45,
        backgroundColor:'#ccc',
        borderRadius:50,
        alignItems:'center',       
        justifyContent:'center',
        marginLeft:10,
        marginRight:10
    },
    borderText:{
        fontSize:20,
        color:'#fff'
    },
    text:{
        flexDirection:'row',
        marginTop:5,
        alignItems:'center'
    },
    textphone:{
        color:'#999',
        marginLeft:10
    },
    textresswrap:{
        flexDirection:'row',
        marginTop:5,
        marginRight:10
    },
    textaddress:{
        fontSize:12,
        marginLeft:5
    },
    onView:{
        backgroundColor:'#ccc',
        height:20,
        justifyContent:'center',
        alignItems:'center'
    },
    border:{
        borderRightWidth:1,
        height:25,
        marginLeft:40,
        borderColor:'#e5e5e5'
    },
    onText:{
        fontSize:10,
        paddingHorizontal:4,
        color:"#fff"
    }
  
});

