/**
 * @description 换领机动车行驶证信息确认
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



export default function RenewDrivingPermits3 (props) { 
        const busType = props.navigation.getParam('busType')//1级页面 车辆类型文本数据
        const bustypetwo = props.navigation.getParam('bustypetwo')//业务类型文本数据
        const rptReasonIdtwo = props.navigation.getParam('rptReasonIdtwo')//申请原因文本数据
        const carData = props.navigation.getParam('carData')//车辆信息
        const getakeWayText = props.navigation.getParam('getakeWayText')//获取方式文本数据
        const formData = props.navigation.getParam('formData')//获取2级页面数据
        let time = new Date()
      

        function onButtonClick () {  
            //车辆类型
            HttpUtil.post(API.VehicleApplyAddRptPlateApply, {
                takeWayId:formData.takeWayId.join(''), 
                postAddress:formData.sendAddress,
                rptReasonId:formData.reasonAppy.join(''),
                // needTmpPlateNo:formData.needTmpPlate.join(''), 是否临牌字段
                rptTypeId:formData.busTypeId.join(''),
                vehicleId:carData.id,      
                // id:1      
            })  
            .then(responseJson=>{   
            console.log(responseJson)
            const { code, data, msg } = responseJson.data   
                if(code === 0){  
                    console.log(data,33)
                    NavigationUtil.navigate(props,'RenewDrivingPermitsEND',{carData:carData,bustypetwo:bustypetwo,textData:data,time:time})
                }   
                }).catch(error=>{
            console.log(error,'error')
            }); 
        }
  

        useEffect(() => {
               
        }, [])

          return (
            <View style={styles.container}>
                <NavigationBar title='信息确认' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
        {  carData  && bustypetwo && rptReasonIdtwo && getakeWayText&&
            <ScrollView
                style={{ flex: 1,}}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
            >
                <View style={styles.titleBox}>
                    <Text style={styles.titleText}>车辆信息</Text>
                </View>
                <View style={styles.infoBox}>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>办证大厅</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{carData.belongName}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>号牌号码</Text>
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
                           <Text style={styles.infoContent}>{carData.modelKindName}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>业务类型</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{bustypetwo}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>机动车登记证书编号</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{carData.registCertNum}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>补领原因</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{rptReasonIdtwo}</Text>
                        </Flex.Item>
                    </Flex>
                </View>
                <View style={styles.titleBox}>
                    <Text style={styles.titleText}>行驶证取件信息</Text>
                </View>
                <View style={styles.infoBox}>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>收件人姓名</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>李小四</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>手机号码</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>13088870731</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>收货人地址</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>广州市荔湾区龙华大道C2栋1018号</Text>
                        </Flex.Item>
                    </Flex>
                </View>
                <View style={styles.titleBox}>
                        <Text style={styles.titleText}>缴纳费用</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.titleBox1}>
                        <Text style={styles.titleText1}>工本费</Text>
                    </View>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={{color:'#999'}}>号牌</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={{color:'#999',textAlign:'right'}}>35元</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text  style={{color:'#999'}}>临时</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={{color:'#999',textAlign:'right'}}>30元</Text>
                        </Flex.Item>
                    </Flex>
                    
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text>合计</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={{textAlign:'right'}}>65元</Text>
                        </Flex.Item>
                    </Flex>
                </View>
               {/*  */}
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