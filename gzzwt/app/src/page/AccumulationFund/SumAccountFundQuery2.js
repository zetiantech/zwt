/**
 * @description 定期*活期查询结果
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

 import HttpUtil from 'src/util/HttpUtil' //接口请求
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'



export default function CarSubscribe4 (props) { 
        let forms = props.navigation.getParam('info')||{}//
        
        console.log(forms,7777777777)

        //提交
        function onButtonClick () {             
            NavigationUtil.dispatch(props,'Main')
        }
        useEffect(() => {
               
        }, [])
          return (
            <View style={styles.container}>
                <NavigationBar 
                    title='信息确认' 
                    hide={false} 
                    popEnabled={true}  
                    navigator={props.navigation}
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                />
            
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
                           <Text style={styles.infoLabel}>姓名</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.name}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>账号</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.account}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>账户余额</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.account}元</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>定期余额</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.regularBalance}元</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>活期余额</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.atPresentBalance}元</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>当前余额</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.currentBalance}元</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>本年度缴存额</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.thisYearDeposite}</Text>
                        </Flex.Item>
                    </Flex>
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                           <Text style={styles.infoLabel}>缴存状态</Text>
                        </Flex.Item>
                        <Flex.Item>
                           <Text style={styles.infoContent}>{forms.depositeType}</Text>
                        </Flex.Item>
                    </Flex>
                </View>
                <View style={{marginTop: 30, marginBottom: 30, marginLeft: 15, marginRight: 15}}>
                    <Button type="primary" onPress={()=> onButtonClick()}>点击返回首页</Button>
                </View>
            </ScrollView>
    
        </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
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