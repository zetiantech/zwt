/**
 * @description 挂号信息确认
 * @author
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

export default function SubscribeRegist4(props) {
    const formData = props.navigation.getParam("form")
    console.log(formData,555555)
    const [infoData, setInfoData] = useState({});
    const [infoData1, setInfoData1] = useState({});
    const [applyForm, setApplyForm] = useState({})
    const showData = {
        name: '预约医生',
        idCard: '就诊医院',
        registArea: '就诊科室',
        birthday: '就诊时间',
        phone: '挂号费'
    };
    const showData1 = {
        time: '就诊人',
        registryName: '手机号',
    };
    
    let time = formData.yymmdd + formData.week
    useEffect(() => {
        setApplyForm({
            // name: formData.name,
            // personTypeId: formData.personTypeId.join(""),
            // certType: formData.certType.join(""),
            // soldierTypeId: formData.soldierTypeId.join(""),
            // maritalStatusId: formData.maritalStatusId.join(""),
            // gender: formData.gender.join(""),
            // idCard: formData.idCard,
            // phone: formData.phone,
            // birthday: formData.birthday,
            // registArea: formData.registArea[2],
            // country: formData.country,
            // reason: formData.reason,
            // registryId: formData.registryId,
        })
        const time = formData.yymmdd + ' ' + (formData.week||'') + ' ' + formData.startTimes + '-' + formData.endTimes
        setInfoData({
            name: formData.name,
            idCard: '广州人民医院',
            registArea: '五官科',
            birthday: time,
            phone: formData.applyAmount||30,
        })
        setInfoData1({
            registryName: '张三三',
            time: 13088870731
        })
    }, [formData])

    const onSubmitData = () =>{
        // HttpUtil.post(API.PROVEAPPLY_ADDAPPLY, applyForm)
        //     .then(responseJson => {
        //         const { code, data, msg } = responseJson.data
        //         if(code == 0){
        //             NavigationUtil.navigate(props, "ResultPage", {type: 5})
        //         }else{
        //             ToastUtil.toast(msg)
        //         }
        //     })
        NavigationUtil.navigate(props, "ResultPage", {type: 5})
    }

    return (
        <View style={styles.container}>
            <NavigationBar 
                navigator={props.navigation}
                popEnabled={true}
                title='挂号信息确认' 
                hide={false} />
            <ScrollView >
                {formData && <ListWrap data={infoData} showData={showData} />}
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