/**
 * @description 赛事详情
 * @author 择天团队
 * 
 * **/

import React, { Component,useState,useEffect, useRef } from 'react'
import  {
    StyleSheet,
    View,
    Text,
    ScrollView,Image,
 } from 'react-native'
 import {
    Button,


 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'
 import  GlobalStyles from '../../../res/styles/GlobalStyles'

//场地信息
const  VenueDetalls =({data}) => { 
         const imgArr = data && data.thumbnail && data.thumbnail.split(",")
         console.log(imgArr, 4444)
         return (
            <View >         
                <ScrollView showsHorizontalScrollIndicator={true} horizontal={true} >
                    {
                        imgArr && imgArr.map((item, i)=>(
                            <Image  resizeMode='stretch' style={{height:(GlobalStyles.window_height)/4, width:GlobalStyles.window_width}}  source={{uri: item}}></Image>
                        ))
                    }                                    
                </ScrollView>                
                <View>
                    { data &&
                <View style={{backgroundColor:'#fff'}} >
                    <View style={{marginHorizontal: 15,paddingVertical:20}}>           
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text>{data.name}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#FFC263',borderColor:'#FFC263', borderWidth:0.5,padding:2.5, width:35,height:25,marginTop:6,marginRight:5}}>{data.matchCategoryName}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',marginTop:15}}>
                                        <Image style={{height:16,width:16}} source={require('../../../res/images/livepay/icon_record.png')}></Image>
                                        <Text style={{color:'#999',marginLeft:10}}>{data.startTime} 至 {data.endTime}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> 
                 }                
                <View style={{height:15}}></View>
                </View>
                
            </View>
    )

}

const ActivityIntroduction = ({data}) => {
    // let stTime = data.startTime.split(' ')[0] || '';    
    return(
        <View>
        { data &&
            <View>             
                <View style={{borderBottomWidth:0.5,borderBottomColor:'#E5E5E5',backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',margin: 15,alignItems:'center'}}>
                        <View style={{borderLeftWidth:5,height:13,borderColor:'#2F74ED',marginTop:3}}></View>
                        <Text style={{marginLeft:10}}>活动介绍</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15,marginVertical:10}}>
                        <Text style={{color:'#999999'}}>报名开始</Text>
                        <Text>{data.endTime}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15,marginVertical:10}}>
                        <Text style={{color:'#999999'}}>报名截止</Text>
                        <Text>{data.endTime}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15,marginVertical:10}}>
                        <Text style={{color:'#999999'}}>报名费用</Text>
                        <Text>{data.price}元</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15,marginVertical:10}}>
                        <Text style={{color:'#999999'}}>活动人数</Text>
                        <Text>{data.personNum}人</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15,marginVertical:10}}>
                        <Text style={{color:'#999999'}}>赛事地点</Text>
                        <Text>{data.address}</Text>
                    </View>
                </View> 
            </View>
        }
        </View>
            
    )
}


const ActivitRules = ({data}) => {
    return(
        <View style={{backgroundColor:'#fff',marginTop:15,marginBottom:15,flex:1}}>
        <View style={{borderBottomWidth:0.5,borderBottomColor:'#E5E5E5',backgroundColor:'#fff',marginTop:15}}>
            <View style={{flexDirection:'row',margin: 15,alignItems:'center'}}>
                <View style={{borderLeftWidth:5,height:13,borderColor:'#2F74ED',marginTop:3}}></View>
                <Text style={{marginLeft:10}}>活动规则</Text>
            </View>
        </View>
        {data&&
        <View style={{margin: 15,flex:1}}>
            <Text style={{lineHeight:20,color:'#333'}}>{data.ruleDesc}</Text>
        </View>
        }
        </View>
    )
}

export default function CarRest (props) {
    console.log(props.navigation.getParam('id'),222222222)
    const [data, setdata] = useState();
    const [starttime, setstarttime] = useState();
    const [endTime, setendTime] = useState();

    function onBtnNative () {
        NavigationUtil.navigate(props,'Confirmation',{data:data})
    }

    useEffect(() => {
        HttpUtil.get(API.MatchGetOne, {
            id:props.navigation.getParam('id')
        }).then((data) => { 
            data = data.data;
            if (data.code === 0) {
                setdata(data.data) 
                console.log(data,444444444)                                                                                           
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch((err) => {
            console.log(err)
        }) 
    }, [])
       return (
           <View style={styles.container} >
               <NavigationBar title='赛事详情'  hide={false} popEnabled = {true} navigator ={props.navigation}statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}/>
               <ScrollView showsVerticalScrollIndicator={false}>       
                    <VenueDetalls data={data}/> 
                    <ActivityIntroduction data={data} starttime={starttime}endTime={endTime}/> 
                    <ActivitRules data={data}/>  
                </ScrollView>
                <Button   onPress={onBtnNative} type="primary" style={{backgroundColor:'#2F74ED',color:'#fff'}}>我要报名</Button>     
           </View>
       )
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
    }

});