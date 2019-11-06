/**
 * @description 申请结果
 * @author 择天团队 
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
    Flex,
 } from '@ant-design/react-native';


 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'


export default function Result (props) {
        let time = props.navigation.getParam('time')//提交时间
        let carData = props.navigation.getParam('carData')//车辆信息
        let bustypetwo = props.navigation.getParam('bustypetwo')//业务名称
        let textData = props.navigation.getParam('textData')//流水时间数据
        let d = time;  
        let  myDate = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate()
        function onButtonClick () {
            NavigationUtil.navigate(props,'Main')

        }       
        return (
            <View style={styles.container}>
                <NavigationBar title='申请结果' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
            <View>
                <View style={styles.titleBox}>
                    <Text style={styles.titleText}>车辆信息</Text>
                </View>
                {carData&&bustypetwo&&textData&&
                <View style={styles.infoBox}>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>申请人</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{carData.belongName}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>申请业务名称</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{bustypetwo}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>业务员流水号</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>45121512312{textData.id}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>申请时间</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{myDate}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>工本费</Text>
                        </Flex.Item>
                        <Flex.Item style={{flexDirection: 'row',}}>
                           <Text style={styles.infoContent}>110元</Text>
                           <Text style={{marginLeft:20,color:'#999'}}>(费用邮寄到付)</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>邮寄费</Text>
                        </Flex.Item>
                        <Flex.Item style={{flexDirection: 'row',}}>
                           <Text style={styles.infoContent}>65元</Text>
                           <Text style={{marginLeft:20,color:'#999'}}>(费用邮寄到付)</Text>
                        </Flex.Item>
                    </Flex>
                </View>
             }   
 
               {/*  */}
    
                <View style={{marginTop: 30, marginBottom: 30, marginLeft: 15, marginRight: 15}}>
                    <Button type="primary" onPress={onButtonClick}>确认</Button>
                </View>
            </View>
        
            </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    titleBox: {
        paddingTop: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
       
    },
    titleText: {
        fontSize: 14,
        color: '#999999'
    },
    //
    infoBox: {
        padding: 15,
        backgroundColor: '#ffffff'
    },
    infoBoxItem: {
        paddingTop: 10,
        paddingBottom: 10
    },
    infoLabel: {
       color: '#999999'
    },
    infoContent: {
        color: '#333333'
    }
});