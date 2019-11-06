/**
 * @description 申请结果
 * @author 择天团队 
*/
import React, { Component } from 'react';
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
 import GlobalStyles from '../../../res/styles/GlobalStyles'


export default function ExResult (props) {
    const busText = props.navigation.getParam('busText')||"" //业务类型文本
    const formDatas = props.navigation.getParam('formDatas')||""  //
    const data = props.navigation.getParam('data')||""

    function onButtonClick () {
        NavigationUtil.navigate(props,'ResultPage',{type:3});
    }
    // console.log(data,'data')
    // console.log(formDatas,'formDatas')
    // console.log(busText,'busText')
    let date1 = new Date(),
    time1 = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate() ;
        return (
            <View style={styles.container}>
                <NavigationBar title='信息确认' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                {busText&& formDatas  &&data&&         
                <View style={styles.infoBox}>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>申请人</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{formDatas.belongName}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>申请业务名称</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{busText}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>业务员流水号</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>65454{data.id}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>申请时间</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{time1}</Text>
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
                <View style={{marginTop: 30, marginBottom: 30, marginLeft: 15, marginRight: 15}}>
                    <Button type="primary" onPress={()=>onButtonClick()}>确认</Button>
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
        backgroundColor: '#ffffff',
        marginTop:20,
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