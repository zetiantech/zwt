/**
 * @description 
 * @author 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,Image,TouchableOpacity,ScrollView
} from 'react-native';
import {
    Provider,
    List,
    InputItem,
    Button,
    Toast,Radio,Picker,
} from '@ant-design/react-native';
import Form from 'src/component/FormComponent'
import HttpUtil from '../../../util/HttpUtil' //接口请求
import NavigationBar from '../../../common/NavigationBar'//头部导航
import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import { API } from 'src/api/Api'
import GlobalStyles from '../../../res/styles/GlobalStyles'//头部导航

import RadioView from '../../../component/RadioViewImage'
import AMAPComponent from '../../../component/AMAPComponent'


 
/*** 
 * 机动车业务-补领机动车号牌
 * busTypeId-业务类型  reasonAppy-申请原因 takeWayId-获取方式，
*/  
export default function CarSubscribe2(props) {
    const formData = props.navigation.getParam('formData')//列表详情bustypetwo
    const bustypetwo = props.navigation.getParam('bustypetwo')//车辆类型文本
    const carData = props.navigation.getParam('carData')//车辆详细信息
    console.log(bustypetwo,'bustypetwo')
    

 
    const [BranchList,setBranchList]=useState()//车辆检查站

    useEffect(() => {
        // 车辆检察站
        HttpUtil.get(API.DetectionBranchList,{
            areaId:44,
            page:1,
            size:10
        })    
        .then(responseJson=>{  
            // console.log(responseJson,'车辆检察站')
            const { code, data, msg } = responseJson.data   
            console.log(data,'车辆检察站')
            if(code === 0){   
                setBranchList(data.list)                
            }  
            }).catch(error=>{
            console.log(error,'error')
            });
    }, [])
  
  
    function onClickMap (item) {
        console.log(111)
        NavigationUtil.navigate(props, 'CarSubscribe3', {data:item,formData:formData,bustypetwo:bustypetwo,carData:carData},)
    }
    //下一步
    function onBtnClick () {
        
    }   
    let BranchLists = BranchList || []
    return (  
        <Provider>
            <ScrollView>
            <NavigationBar title='选择办证大厅' hide={false}  popEnabled = {true}  navigator ={props.navigation}/> 
            {
            BranchLists&& BranchLists.map((item,i)=> (
                <TouchableOpacity style={styles.resswarp} onPress={()=>onClickMap(item)}  >
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.title}>{item.name || ""}</Text>
                    </View>          
                    <View style={styles.iphonwarp}>
                        <Image style={styles.iphonimg} source={require('../../../res/images/common/icon_phone.png')}></Image>
                        <Text>办理日期：{item.createTime}</Text>
                        <Image style={styles.tiaozhuan} source={require('../../../res/images/ic_tiaozhuan.png')}></Image>
                    </View>
                    <View style={styles.iphonwarp}>
                        <Image  style={styles.iphonimg} source={require('../../../res/images/common/icon_address.png')}></Image>
                        <Text >{item.address}</Text>
                    </View>               
                </TouchableOpacity>  
            ))         
            }
           
            </ScrollView>           
        </Provider>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
 
    btnWrap: {
        marginTop: 30,
        paddingRight: 15,
        paddingLeft: 15
    },
    btnBox: {
        height: 48,
        backgroundColor: '#2F74ED'
    },

    iphonwarp:{
        flexDirection:'row',
        // marginLeft:15,
        paddingTop:5,

    },
    iphonimg:{
        width:14,
        height:14,
        paddingVertical:10,
        marginRight:10,
        marginBottom:5,
    },
    resswarp:{
        backgroundColor:'#fff',
        // paddingBottom:10,
        borderBottomWidth:0.4,
        borderColor:'#E5E5E5',
        marginHorizontal:15,
        marginTop:10,
    },
    title:{
        // marginLeft:15,
        marginTop:10,
        // marginBottom:10,
        color:'#333',
        fontWeight:'bold'
    },
    tiaozhuan:{
        tintColor:'#E5E5E5',
        width:20,
        height:20,
        marginLeft:(GlobalStyles.window_width)/6
    }
    

})