/**
 * @description 违法预约信息确认
 * @author ct
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    Button,Flex
} from '@ant-design/react-native';
import HttpUtil from '../../../util/HttpUtil' //接口请求
import NavigationBar from '../../../common/NavigationBar'//头部导航
import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import { API } from 'src/api/Api'


export default function informationOwn(props) {
    const params = props.navigation.getParam('params')

    const [bustype,setbustype] = useState() //业务类型文本
    const [PlateKindText,setPlateKindText] = useState() //号牌种类文本

    console.log(params,555555555)

    useEffect(() => {
        //业务类型
        HttpUtil.get(API.KeyValueList,{kindId:10})  
        .then(responseJson=>{   
            const { code, data, msg } = responseJson.data    
            if(code === 0){        
                let buy = {}
                let key = params.busTypeId.join('')
                for (const v of data) {
                    buy[v.id] = v.name  
                    setbustype(buy[key]) 
                    }
                }        
            }).catch(error=>{
            console.log(error,'error')
            });
        //号牌种类
        HttpUtil.get(API.KeyValueList,{kindId:4})  
            .then(responseJson=>{   
            const { code, data, msg } = responseJson.data    
            if(code === 0){    
                console.log(data,88888)  
                let Kind = {};
                let key = params.PlateKindId.join('')
                for (const v of data) {
                    Kind[v.id] = v.name  
                    setPlateKindText(Kind[key])
                }
            }   
            }).catch(error=>{
            console.log(error,'error')
        });    
    }, [])

    //业务类型
   
    console.log(params,2222222)

    function onButtonClick () {
        HttpUtil.post(API.DrivingLicenseAddApply,{
            busTypeId:params.busTypeId.join(''),
            PlateKindId:params.PlateKindId.join(''),
            plateNo:params.plateNo,
            vin:params.vin,
            engineNo:params.engineNo,
            idCard:params.idCard,
            phone:params.phone,
            applyDate:params.applyDate,
        })  
            .then(responseJson=>{   
            const { code, data, msg } = responseJson.data    
            if(code === 0){    
                NavigationUtil.navigate(props,'ResultPage',{type:5})
                }   
            }).catch(error=>{
            console.log(error,'error')
        });
    }       
    console.log(params,11)
    console.log(bustype,22)
    console.log(PlateKindText,33)
    
    return (
        <View style={styles.container}>
            <NavigationBar title='申请结果' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
        <View>
            {params&& bustype&&PlateKindText&&        
            <View style={styles.infoBox}>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>业务类型</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>{bustype}</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>发动机号</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>{params.engineNo}</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>车架号</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>{params.vin}</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>号牌种类</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>{PlateKindText}</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>号牌号码</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>{params.plateNo}</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>手机号码</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>{params.phone}</Text>
                    </Flex.Item>
                </Flex>
                <Flex style={styles.infoBoxItem}>
                    <Flex.Item style={{flex: 0.5}}>
                       <Text style={styles.infoLabel}>预约时间</Text>
                    </Flex.Item>
                    <Flex.Item>
                       <Text style={styles.infoContent}>{params.applyDate}</Text>
                    </Flex.Item>
                </Flex>                   
            </View>
            }
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
        marginTop:10,
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