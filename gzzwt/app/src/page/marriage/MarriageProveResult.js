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
    List, Button, WhiteSpace
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

export default function MarriageResult(props) {
    const formData = props.navigation.getParam("form")
    const [infoData, setInfoData] = useState({});
    const [infoData1, setInfoData1] = useState({});
    const [applyForm, setApplyForm] = useState({})
    const showData = {
        name: '姓名',
        idCard: '证件号码',
        registArea: '户籍地',
        birthday: '出生日期',
        phone: '手机号'
    };

    const showData1 = {
        time: '预约时间',
        registryName: '办理网点',
    };
    
    useEffect(() => {
        setApplyForm({
            name: formData.name,
            personTypeId: formData.personTypeId.join(""),
            certType: formData.certType.join(""),
            soldierTypeId: formData.soldierTypeId.join(""),
            maritalStatusId: formData.maritalStatusId.join(""),
            gender: formData.gender.join(""),
            idCard: formData.idCard,
            phone: formData.phone,
            birthday: formData.birthday,
            registArea: formData.registArea[2],
            country: formData.country,
            reason: formData.reason,
            registryId: formData.registryId,
        })
        const time = formData.yymmdd + ' ' + (formData.week||'') + ' ' + formData.startTimes + '-' + formData.endTimes
        setInfoData({
            name: formData.name,
            idCard: formData.idCard,
            registArea: formData.registArea.join(","),
            birthday: formData.birthday,
            phone: formData.phone,
        })
        setInfoData1({
            registryName: formData.registryName,
            time: time
        })
    }, [formData])

    const onSubmitData = () =>{
        HttpUtil.post(API.PROVEAPPLY_ADDAPPLY, applyForm)
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
                navigator={props.navigation}
                popEnabled={true}
                title='预约信息确认' 
                statusBar={{backgroundColor: '#FFFFFF'}}
                hide={false} />
            <ScrollView >
                {infoData && <ListWrap data={infoData} showData={showData} />}
                <WhiteSpace />
                {infoData1 && <ListWrap data={infoData1} showData={showData1} />}
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