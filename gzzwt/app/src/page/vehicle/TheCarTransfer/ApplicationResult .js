/**
 * @description 申请结果
 * @author 择天团队 ct
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet 
} from 'react-native';
import { 
    Button,
    List,
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'



export default function ApplicationResult  (props) { 
        let data = props.navigation.getParam('data')
        let time = props.navigation.getParam('time')//提交时间
        let formData = props.navigation.getParam('formData')
        let cityval = props.navigation.getParam('cityval')
        let d = time;
        let  myDate = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate()

        function onClick () {
            NavigationUtil.navigate(props,'Main')
        }
        return (
            <View style={styles.container}>
                <NavigationBar title='申请结果' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                {formData && data && time && cityval &&
                <View style={styles.container}>
                <View style={styles.warp}> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>所有人</Text>
                            <Text style={styles.name}>{formData.belongName}</Text>
                        </View>                   
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>号牌种类</Text>
                            <Text style={styles.name1}>{formData.modelKindName}</Text>
                        </View>                  
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>号牌号码</Text>
                            <Text style={styles.name1}>{formData.plateNumber}</Text>
                        </View>
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>转入地</Text>
                            <Text style={styles.name}>{cityval}</Text>
                        </View>
                    </View> 
                    <View style={styles.list}>     
                        <View style={styles.conname}>
                            <Text style={styles.title}>业务流水号</Text>
                            <Text style={styles.name2}>321354{data.id}</Text>
                        </View>
                    </View> 
                    <View style={styles.list}>
                        <View style={styles.conname}>
                            <Text style={styles.title}>申请时间</Text>
                            <Text style={styles.name1}>{myDate}</Text>
                        </View>
                    </View>                  
                </View> 
                <View>
                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onClick} >确认</Button>
                    </List>
                </View>
           </View>
        }   
            </View>
        );
 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    warp:{
        height:330,
        backgroundColor: '#f9f9f9',
        marginTop: 20,      
    },
    conname:{
        marginLeft:30,
        flexDirection:'row', 

    },
    list:{
        // flex:0,
        flexDirection:'row', 
    },
    title:{
        color:'#999',
        marginTop: 30,
    },
    name:{
        marginTop: 30,
        paddingLeft:100
    },
    name1:{
        marginTop: 30,
        paddingLeft:85
    },
    name2:{
        marginTop: 30,
        paddingLeft:71
    }
});

