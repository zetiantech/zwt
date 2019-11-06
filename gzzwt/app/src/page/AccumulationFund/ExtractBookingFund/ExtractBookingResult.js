/**
 * @description 预约信息确认
 * @author Jonne
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    List, Button
} from '@ant-design/react-native';

import NavigationUtil from  'src/util/NavigationUtil'
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil';
import LogUtil from 'src/util/LogUtil';


function ListWrap ({ data, showData }) {
    return (
        <View style={styles.ListWrap}>
            <List styles={{ borderTopWidth: 0 }}>
                {
                    Object.keys(showData).map((item, index) => {
                        return (
                            <List.Item
                                styles={{ Line: { borderBottomWidth: 0 } }}
                                arrow="empty"
                                align='top'
                                multipleLine
                                extra={
                                    <Text style={styles.listItemLabel}>{data[item] || '-'}</Text>
                                }>
                                <Text style={styles.listItemText}>{showData[item]}</Text>
                            </List.Item>
                        )
                    })
                }
            </List>
        </View>
    )
}

export default function ExtractBookingResult(props) {
    const formData = props.navigation.getParam("form")
    const [infoData, setInfoData] = useState();
    const [applyForm, setApplyForm] = useState({
        accountId: formData.accountId,
        name: '',
        phone: '',
        bankId: formData.bankId,
        areaId: formData.areaId,
        startTime: formData.startTime,
        endTime: formData.endTime
    })
    const showData = {
        bank: '办理网点',
        time: '办理时间',
        name: '办理人',
        phone: '手机号',
        accountId: '公积金账号'
    };

    useEffect(() => {
        setInfoData({
            bank: formData.bankName,
            time: formData.yymmdd + ' ' + formData.week + ' ' + formData.startTimes + '-' + formData.endTimes,
            name: '周先生',
            phone: '18818542124',
            accountId: '45455454545'
        })
        // setApplyForm({...applyForm, name: '周先生', phone: '18818565421'})
        getAccountInfo(); 
    }, [])


    const getAccountInfo = () => {
        HttpUtil.get(API.ACCOUNT_GET_ONE, {})
            .then(responseJson =>{
                const { code, data, msg } = responseJson.data
                if(code === 0) {
                    setApplyForm({...applyForm, accountId: data})
                }else{
                    ToastUtil.toast(msg)
                }
            })
    }

    const onSubmitData = () =>{
        HttpUtil.post(API.OFFLINEDRAW_ADD_APPLY, applyForm)
            .then(responseJson => {
                const { code, data, msg } = responseJson.data
                if(code == 0){
                    NavigationUtil.navigate(props, "ResultPage", {type: 5})
                }else{
                    ToastUtil.toast(msg)
                }
            })
    }

    return (
        <View style={styles.container}>
            <NavigationBar 
                statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                navigator={props.navigation}
                popEnabled={true}
                title='预约信息确认' 
                hide={false}
            />
            <ScrollView >
                {infoData && <ListWrap data={infoData} showData={showData} />}
                <Button style={styles.btn} type='primary' onPress={()=>onSubmitData()}>确定</Button>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    ListWrap: {
        marginTop: 15,
        backgroundColor: '#fff'
    },
    listItemText: {
        color: '#999',
        fontSize: 16,
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
    },
    listItemLabel: {
        flex: 2.5,
        fontSize: 16,
        paddingTop: 5,
        color: '#333333',
        paddingBottom: 6,
    },
    btn:{
        marginHorizontal: 20,
        marginVertical: 30
    }
})