/**
 * @description 设置
 * @author 择天团队 Jonne 
*/
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet 
} from 'react-native';

import { 
    Button,
    List,
    WhiteSpace,
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from 'src/util/NavigationUtil';


const  AccountList = ({navList}) => {
    return (
        <List>
            {
                navList && navList.map((item, index) => (
                    <List.Item 
                        key={index}
                        arrow={item.arrow ? item.arrow : 'horizontal'}
                        extra={
                            <Text style={styles.extraStyle}>{item.text}</Text>
                        }
                        onPress={item.onPress}
                    >
                        <Text style={styles.listItemText}>{item.name}</Text>
                    </List.Item>
                ))
            }
        </List>
    )
}

export default function AccountSecurity(props) {
    const phone = props.navigation.getParam("phone")
    const navList = [
        {
            name: '密码登录',
            text: '未设置',
            onPress: () => {
                NavigationUtil.navigate(props, "Phone", {phone: phone, type: 1})
            }
        },
        {
            name: '扫码登录',
            text: '未设置',
            onPress: () => {
                
            }
        } 
    ]
    const navList1 = [
        {
            name: '解锁设置',
            text: '未设置',
            onPress: () => {
                
            }
        }
    ]
    return (
        <View style={styles.container}>
            <NavigationBar
                navigator={props.navigation}
                popEnabled={true}
                title='账号安全'
                statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                hide={false}/>
            <WhiteSpace size="xl" />
            <AccountList navList={navList} />
            <WhiteSpace size="xl" />
            <AccountList navList={navList1} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    extraStyle: {
       fontSize: 14,
       color: '#ccc'
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    },
});