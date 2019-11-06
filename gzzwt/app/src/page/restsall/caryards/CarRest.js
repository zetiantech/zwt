/**
 * @description 羊城通乘车码
 * @author 择天团队
 * 
 * **/

import React, { useState, useEffect, } from 'react';
import  {
    StyleSheet,
    View,
    Text,
    ScrollView,TouchableHighlight,ImageBackground,Image,TextInput,TouchableOpacity
 } from 'react-native'
 import { 
    Button
   
 } from '@ant-design/react-native';

 import NavigationBar from '../../../common/NavigationBar'
 import GlobalStyles from 'src/res/styles/GlobalStyles'

 import NavigationUtil from '../../../util/NavigationUtil'








export default function CarRest (props) {
    const [statusss, setstatusss] = useState(0);

    function onButtonClick (id) {
        setstatusss(id)
    }
    function onclick () {
        NavigationUtil.navigate(props,'DrivingRecord')
    }
       return (
    <View style={styles.container} >
        <NavigationBar title='乘车码' hide={false}  popEnabled = {true}  navigator ={props.navigation}/>
        <View>
            <ImageBackground style={styles.bgimg}source={require('../../../res/images/bg_yct.png')}></ImageBackground> 
            <View>
                {statusss===0&&
                <View style={styles.headerContent}>
                    <View style={{margin:5}}>
                        <Text style={{color:'#999'}}>羊城通乘车码</Text>
                    </View>  
                    <View style={{marginTop:50, alignItems:'center'}}>
                        <Image source={require('../../../res/images/home/icon_all.png')}></Image>
                        <Text style={{paddingVertical:10}}>尚未开通</Text>
                        <Text>请先领卡并激活乘车码</Text>
                    </View>             
                        <Button type="primary" style={styles.btn} onPress={()=> onButtonClick(1)}>领卡并激活</Button>                    
                </View> 
                }
                {statusss === 1 && 
                <View style={styles.headerContent}>
                    <View style={{margin:20}}>
                        <Text style={{color:'#999'}}>羊城通乘车码</Text>
                    </View>  
                    <TouchableOpacity style={{marginTop:40, alignItems:'center'}}>
                        <Image style={{width:160,height:160}} source={require('../../../res/images/weixin.png')}></Image>
                        <View style={{flexDirection:'row',marginTop:15}}> 
                            <Image  style={{width:14,height:14,marginTop:2,marginRight:5,marginBottom: 15,}} source={require('../../../res/images/loading.gif')} ></Image>
                            <Text style={{color:'#2F74ED'}}>刷新</Text>
                        </View>
                    </TouchableOpacity>  
                    <Text style={{color:'#666',marginLeft:70}}>如遇刷码失效，请刷新乘车码</Text>

                </View> 
                }     
            </View>
            <View style={styles.bottCard}>
                    <TouchableOpacity style={{marginVertical:20}}>
                        <View style={{alignItems:'center',marginLeft:20}}>
                            <Image style={{width:14,height:14,marginBottom: 10,}} source={require('../../../res/images/tab4.png')}></Image>
                            <Text style={{color:'#666'}}>公交查询</Text>
                        </View>                       
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginVertical:20}} onPress={onclick} >
                        <View style={{alignItems:'center',marginLeft:20}}>
                            <Image style={{width:14,height:14,marginBottom: 10,}} source={require('../../../res/images/tab4.png')}></Image>
                            <Text style={{color:'#666'}}>乘车记录</Text>
                        </View>                       
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginVertical:20}} onPress={()=>{NavigationUtil.navigate(props,'RestAccount')}}>
                        <View style={{alignItems:'center',marginRight:20}}>
                            <Image style={{width:14,height:14,marginBottom: 10,}} source={require('../../../res/images/tab4.png')}></Image>
                            <Text style={{color:'#666'}}>我的账户</Text>
                        </View>                      
                    </TouchableOpacity>
                   
                </View>     
        </View> 
    </View>
    );
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f0f0'
    },
    headerContent: {
        // position: 'absolute',
        // zIndex: 9,
        // top: 0,
        // left: 0,
        padding: 10,
        height:350 ,
        width: GlobalStyles.window_width - 40,
        // height: 120,
        backgroundColor: '#fff',
        marginTop:70,
        marginLeft:20,
        // borderRadius:5     
     },
     btn:{
        marginHorizontal:20,
        marginTop:30,
        marginBottom:50,
        zIndex:30
     },
     image:{
         position: 'absolute',
         zIndex: 0,
         width: GlobalStyles.window_width,
    },
    bgimg:{
        flex: 1,width: GlobalStyles.window_width,
        height: 250
    },
    bottCard:{
        backgroundColor:'#fff',marginTop:15,marginHorizontal:30,borderRadius:5,
        flexDirection:'row',justifyContent:'space-between',
        shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.5,shadowRadius: 5,shadowColor: '#ddd',
    }
    

});