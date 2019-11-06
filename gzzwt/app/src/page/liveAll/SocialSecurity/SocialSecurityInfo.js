/**
 * @description 社保查询
 * @author 择天团队 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import { 
    List,
    WhiteSpace,
    Provider,
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import GlobalStyles from 'src/res/styles/GlobalStyles'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';



function BaseInfo ({ data, showData, onClick }) {
    return (
        <View style={styles.ListWrap}>
            <List styles={{ borderTopWidth: 0 }}>
                <List.Item
                    styles={{ Line: { borderBottomWidth: 0 } }}
                    arrow="empty"
                    align='top'
                    multipleLine
                    extra={
                        <Text style={styles.listItemTitleLabel}  onPress={onClick} >修改</Text>
                    }>
                    <Text style={styles.listItemTitleText}>基本信息</Text>
                </List.Item>
                <ListWrapInfo data={data} showData={showData}/>
            </List>
        </View>
    )
}

function BaseInfo1 ({ data, showData }) {
    return (
        <View style={styles.ListWrap}>
            <List styles={{ borderTopWidth: 0 }}>
                <List.Item
                    styles={{ Line: { borderBottomWidth: 0 } }}
                    arrow="empty"
                    align='top'
                    multipleLine
                    extra={
                        <Text style={styles.listItemTitleLabel}>{data && (data.status == 1 ? '正常参保':'暂停参保')}</Text>
                    }>
                    <Text style={styles.listItemTitleText}>参保状态</Text>
                </List.Item>
                <ListWrapInfo data={data} showData={showData}/>
            </List>
        </View>
    )
}

const ListWrapInfo = ({ data, showData }) => {
    return (
        <View>
            
            {
                Object.keys(showData).map((item, index) => {
                    return (
                        <List.Item
                            styles={{ Line: { borderBottomWidth: 0 } }}
                            arrow="empty"
                            align='top'
                            multipleLine
                            extra={
                                <Text style={styles.listItemLabel}>{data && data[item] || '-'}</Text>
                            }>
                            <Text style={styles.listItemText}>{showData[item]}</Text>
                        </List.Item>
                    )
                })
            }
        </View>
    )
}

function ListWrap1 ({ data, showData }) {
    return (
        <View style={styles.ListWrap}>
            <List styles={{ borderTopWidth: 0 }}>
                {
                    Object.keys(showData).map((item, index) => {
                        return (
                            <List.Item
                                arrow="horizontal"
                                multipleLine
                                extra={
                                    <Text style={styles.listItemLabel}>{'￥' + (data && data[item] || '0.00')}</Text>
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


export default function SocialSecurityInfo(props) {

    const [idCard, setIdCard] = useState()

    const [infoData, setInfoData] = useState({
        name: '-',
        registration: '-',
        scoial: '-',
    });
    const [infoData1, setInfoData1] = useState({
        ewMonthCount: '0',
        medicalMonthCount: '0',
        upMonthCount: '0',
        injuryMonthCount: '0',
        fertilityMonthCount: '0',
    });
    const [infoData2, setInfoData2] = useState({
        companyAccount: '-',
        endowmentStatus: '-',
        medicalStatus: '-',
        unemploymentStatus: '-',
        injuryStatus: '-',
        fertilityStatus: '-',
    });

    DeviceEventEmitter.addListener('refresh', ()=>{
        getPersonal()
    });

    function onClick () { 
        NavigationUtil.navigate(props,'SocialSecurityBaseInfo', {idCard: idCard})
    }

    const getUserInfo = () => {
        HttpUtil.post(API.QUERY_USER_INFO, {})
            .then(responseJson=>{
                const { code, data, msg } = responseJson.data
                if(code === 0){
                    setIdCard(data.idCard)
                }
            }).catch(error=>{});
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        getPersonal()
    }, [idCard])
    

    function getPersonal(){
        HttpUtil.post(API.GET_PERSONAL, {
            idCard: idCard
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code == 0){
                if(data){
                    setInfoData(data)
                    setInfoData1(data) 
                    setInfoData2({
                        companyAccount: data.companyAccount || '-',
                        endowmentStatus: ['', '广州户籍养老'][data.endowmentStatus],
                        medicalStatus: ['','一档医疗在职','二档医疗在职', '三档医疗在职'][data.medicalStatus],
                        unemploymentStatus: ['','已参保','未参保'][data.unemploymentStatus],
                        injuryStatus: ['','已参保','未参保'][data.injuryStatus],
                        fertilityStatus: ['', '生育医疗一档', '生育医疗二档', '生育医疗三档'][data.fertilityStatus],
                    })
                }
                 
            }
        })
    }

    const showData = {
        name: '参保人',
        registration: '户口类型',
        scoial: '社会保障号',
    };
    const showData1 = {
        ewMonthCount: '养老保险',
        medicalMonthCount: '医疗保险',
        upMonthCount: '失业保险',
        injuryMonthCount: '工伤保险',
        fertilityMonthCount: '生育保险',
    };

    const showData2 = {
        companyAccount: '参保单位',
        endowmentStatus: '养老保险状态',
        medicalStatus: '医疗保险状态',
        injuryStatus: '工伤保险状态',
        unemploymentStatus: '失业保险状态',
        fertilityStatus: '生育保险状态',
    };

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation}
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                    popEnabled={true}
                    title='社保查询' 
                    hide={false} />
                <ScrollView >
                    <WhiteSpace size='lg' />
                    <BaseInfo data={infoData} showData={showData} onClick={onClick} />
                    <WhiteSpace size='lg' />
                    <ListWrap1 data={infoData1} showData={showData1} />
                    <WhiteSpace size='lg' />
                    <BaseInfo1 data={infoData2} showData={showData2} />
                    <WhiteSpace size='lg' />
                </ScrollView>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    ListWrap: {
        backgroundColor: '#fff'
    },
    listItemTitleText: {
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    listItemText: {
        color: '#999',
        fontSize: 16,
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
    },
    listItemLabel: {
        fontSize: 15,
        paddingTop: 5,
        color: '#333333',
        paddingBottom: 6,
    },
    listItemTitleLabel: {
        paddingVertical: 10,
        color: '#2F74ED'
    }
})