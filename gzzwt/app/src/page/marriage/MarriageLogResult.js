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
    List,
    Button,
    Modal,
    Provider,
} from '@ant-design/react-native';

import NavigationUtil from  'src/util/NavigationUtil'
import GlobalStyles from 'src/res/styles/GlobalStyles'
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

export default function MarriageLogResult(props) {
    const data = props.navigation.getParam("data")
    const [infoData, setInfoData] = useState();
    const showData = {
        time: '预约时间',
        registryName: '办理网点'
    };

    useEffect(() => {
        if(data){
            const start = data.startTime.split(" ")
            const end = data.endTime.split(" ")
            const currentDate = start[0]
            const startTime = start[1].split(":").splice(0, 2).join(":")
            const endTime = end[1].split(":").splice(0, 2).join(":")
            const time = currentDate+' '+(startTime)+'-'+endTime
            setInfoData({...infoData, time: time})
            getRegistryList(time, data.registryId)
        } 
    }, [])

    const getRegistryList = (id) => {
        HttpUtil.get(API.REGISTRY_LIST, {
            id: id || 1
        })
        .then(responseJson => {
            const { code, data, msg } = responseJson.data
            if(code == 0){
                setInfoData({registryName: data[0].name})
            }else {
                ToastUtil.toast(msg)
            }
        }).catch(error => {
            LogUtil.debug(error)
        })
    }


    const cancelProveApply = () => {
        HttpUtil.get(API.CANCEL_MARRIEDAPPLY, {
            id: data && data.id
        })
        .then(responseJson => {
            const { code, data, msg } = responseJson.data
            if(code == 0){
                ToastUtil.toast(msg)
            }else {
                ToastUtil.toast(msg)
            }
        }).catch(error => {
            LogUtil.debug(error)
        })
    }

    const onCancelProveApply = () => {
        Modal.alert('', '确认要取消吗？', [
            {
                text: '取消'
            },
            { text: '确认', onPress: () => {
                cancelProveApply()
            }},
        ]);
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation}
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    popEnabled={true}
                    title='查询结果' 
                    hide={false} />
                <ScrollView >
                    {infoData ? <ListWrap data={infoData} showData={showData} /> : 
                        <View style={styles.noData}><Text style={styles.noDataText}>暂无数据</Text></View>
                    }
                    {
                        infoData && infoData.status == 1 && <Button style={styles.btnBox} onPress={onCancelProveApply}>
                            <Text style={styles.btnText}>取消预约</Text>
                        </Button>
                    }
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
        fontSize: 15,
        paddingTop: 5,
        color: '#333333',
        paddingBottom: 6,
    },
    btn:{
        marginHorizontal: 20,
        marginVertical: 30
    },
    btnBox: {
        marginHorizontal: 15,
        marginVertical: 30,
        backgroundColor: '#F12F2F'
    },
    btnText: {
        color: '#FFFFFF',
        borderWidth: 0
    },
    noData: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center'
    },
    noDataText: {
        color: '#999'
    }
})