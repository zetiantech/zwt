/**
 * @description 预约结果
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
    Flex
 } from '@ant-design/react-native';
 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示

export default function AppointmentResult (props) {
        let forms = props.navigation.getParam('forms')//预约信息
        let carData = props.navigation.getParam('carData')//车辆详情
        let dataList= props.navigation.getParam('dataList') //地址列表


        function onClickMain () {
            NavigationUtil.navigate(props,'ResultPage',{type:5})
        }
        return (
            <View style={styles.container}>
                <NavigationBar title='信息确认' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                {forms&&carData&&dataList&&

                
                <View style={styles.infoBox}>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
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
                           <Text style={styles.infoContent}>机动车检测预约</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>检测时间</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.yymmdd}    {forms.startTimes}-{forms.endTimes}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>检测地点</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{dataList.address}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.4}}>
                           <Text style={styles.infoLabel}>预约时间</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.yymmdd}</Text>
                        </Flex.Item>
                    </Flex>        
                </View>
                }
                <View style={{margin: 20,}}>
                    <Button  type="primary" onPress={onClickMain} >确认</Button>
                </View>
                
            </View>
        )
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
    infoBox: {
        padding: 15,
        backgroundColor: '#ffffff',
        marginTop:15
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