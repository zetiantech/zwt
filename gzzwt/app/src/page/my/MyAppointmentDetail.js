/**
 * @description 我的预约
 * @author Jonne
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'

import {
    List,
    Button,
    WhiteSpace,
    Modal,
    Popover,
} from '@ant-design/react-native'

import dayjs from 'dayjs'
import NavigationUtil from  'src/util/NavigationUtil'
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil';
import LogUtil from 'src/util/LogUtil';


const ListWrap = ({ data, showData }) => {
    return (
        <View style={styles.ListWrap}>
            <Text style={styles.listTitle}>{data.title||'登记预约'}</Text>
            <List styles={{ Body: {borderTopWidth: 0 }, BodyBottomLine: {borderBottomWidth:0} }}>
                {
                    Object.keys(showData).map((key) => {
                        return (
                            <List.Item
                                styles={{ Line: { borderBottomWidth: 0 } }}
                                arrow="empty"
                                align='top'
                                multipleLine
                                extra={
                                    <Text style={[styles.listItemLabel, {color: key=='statusText'&&data.statusStyle}]}>{data[key] || '-'}</Text>
                                }>
                                <Text style={styles.listItemText}>{showData[key]}</Text>
                            </List.Item>
                        )
                    })
                }
            </List>
            <WhiteSpace size="lg" />
        </View>
    )
}

export default function MyAppointmentDetail(props) {
    const id = props.navigation.getParam("id")

    const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    const [infoData, setInfoData] = useState({
        id: '-',
        createTime: '-',
        registryName: '-',
        dateTime: '-',
        name: '-',
        phone: '-',
        fee: '-',
        status: '-'
    })

    const showData = {
        id: '业务编号',
        createTime: '受理时间',
        registryName: '办理地点',
        dateTime: '预约时间',
        name: '预约人',
        phone: '手机号',
        fee: '费用',
        statusText: '状态'
    };

    function geDetail(){
        HttpUtil.get("http://192.168.1.192:7300/mock/5da40183d88e2b0020908ff8/gzzwt/user/myAppointment/getOne", {
            id: id
        }).then((responseJson)=>{
            const { code, data, msg} = responseJson.data
            if(code == 0){
                data.statusText = ['', '已预约', '已取消', '已过期'][data.status]
                data.statusStyle = ['#999', '#1CBA36', '#999', '#666'][data.status]
                data.dateTime = dayjs(data.startTime).format('YYYY-MM-DD') + ' ' + weeks[dayjs(data.startTime).format('d')] + ' ' + dayjs(data.startTime).format('hh:mm')+ '-' + dayjs(data.endTime).format('hh:mm')
                setInfoData(data)
            }else{
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        }).catch(error => {});
    }

    useEffect(() => {
        geDetail()
    }, [])



    const onSubmitData = () =>{
        Modal.alert("", "确认取消预约", [
            { text: '取消' },
            { text: '确认', onPress: ()=>{
                ToastUtil.toast("取消成功", 'center', 'short', ()=>{
                    NavigationUtil.navigate(props, 'MyAppointment')
                })
            }}
        ])
    }

    return (
        <View style={styles.container}>
            <NavigationBar 
                navigator={props.navigation}
                popEnabled={true}
                title='我的预约' 
                statusBar={{backgroundColor: '#FFFFFF'}}
                hide={false} />   
            <ScrollView>
                <ListWrap data={infoData} showData={showData} />
                {infoData && infoData.status==1 && <Button style={styles.btn} type='warning' onPress={()=>onSubmitData}>取消预约</Button>}
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
        margin: 15,
        backgroundColor: '#fff',
        borderRadius: 5
    },
    listItemText: {
        color: '#999',
        fontSize: 15,
        flex: 1,
        paddingVertical: 5,
    },
    listItemLabel: {
        flex: 2.5,
        fontSize: 15,
        paddingVertical: 5,
        color: '#333333',
    },
    btn:{
        marginHorizontal: 20,
        marginVertical: 20
    },
    listTitle: {
        marginHorizontal: 15,
        paddingVertical: 15,
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5E5',
    }
})