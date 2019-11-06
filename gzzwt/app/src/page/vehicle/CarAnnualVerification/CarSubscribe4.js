/**
 * @description 预约信息确认
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



export default function CarSubscribe4 (props) { 
            let forms = props.navigation.getParam('forms')//预约信息
            let bustypetwo = props.navigation.getParam('bustypetwo')//车类型文本
            let carData = props.navigation.getParam('carData')//车辆详情
            let dataList= props.navigation.getParam('dataList') //地址列表
            console.log(forms,11)
            console.log(bustypetwo,22)
            console.log(dataList,33)   
        function onButtonClick () {  
            //车辆类型
            HttpUtil.post(API.VechicleApplyAddYearAuditApply, {
                vehicleId:carData.id,
                startTime:forms.startTime,
                endTime:forms.endTime,
                // detectionBrabchId:1,            
            })  
            .then(responseJson=>{   
            console.log(responseJson,'年审')
            const { code, data, msg } = responseJson.data   
                if(code === 0){  
                    console.log(data,33)

                }   
                }).catch(error=>{
            console.log(error,'error')
            }); 
            NavigationUtil.navigate(props,'AppointmentResult',{forms:forms,dataList:dataList,carData:carData })

        }

        useEffect(() => {
               
        }, [])

          return (
            <View style={styles.container}>
                <NavigationBar title='信息确认' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
            {  forms && bustypetwo && carData &&  
            <ScrollView
                style={{ flex: 1,}}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
            >
                <View style={styles.infoBox}>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>所有人</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{carData.belongName}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>机动车登记证书编号</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{carData.idCode}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>号码号牌</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{carData.plateNumber}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>车辆类型</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{bustypetwo}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>预约时间</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.yymmdd}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>检测站名称</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{dataList.name}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>检测时段</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.startTimes}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>检测地址</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{dataList.address}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>检测站联系人</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.belongName}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>联系电话</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{dataList.phone}</Text>
                        </Flex.Item>
                    </Flex>
                </View>
                <View style={{marginTop: 30, marginBottom: 30, marginLeft: 15, marginRight: 15}}>
                    <Button type="primary" onPress={onButtonClick}>提交</Button>
                </View>
            </ScrollView>
        }
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
    titleBox1: {
        paddingBottom: 10,
        paddingRight: 15,
  
    },
    titleText1: {
        fontSize: 14,
    },
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