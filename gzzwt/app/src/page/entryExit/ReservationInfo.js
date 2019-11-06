/**
 * @description 预约信息确认
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';

import { 
    Button,
    Modal,
    Flex,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

 import dayjs from 'dayjs'
 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'
 import Form from 'src/component/FormComponent'
 import ToastUtil from 'src/util/ToastUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import LogUtil from 'src/util/LogUtil'
 import NavigationUtil from 'src/util/NavigationUtil';


const Reservation = ({labelName, listData}) => {
    return (
        <View style={styles.infoBox}>
            {
                Object.keys(listData).map((key)=>(
                    <Flex style={styles.infoBoxItem}>
                        <Flex.Item style={{flex: 0.5}}>
                            <Text style={styles.infoLabel}>{labelName[key]}</Text>
                        </Flex.Item>
                        <Flex.Item>
                            <Text style={styles.infoContent}>{listData[key]||'-'}</Text>
                        </Flex.Item>
                    </Flex>
                ))
            }
        </View>
    )
}

export default function ReservationInfo(props){

    const formData = props.navigation.getParam("form")
    const [listData, setListData] = useState([])
    const [listData1, setListData1] = useState([])
    const [listData2, setListData2] = useState([])
    const [listData3, setListData3] = useState([])

    const labelName = {
        hallId: '办证大厅',
        time: '预约时间',
        name: '预约人',
        phone: '手机号',
        idCard: '证件号码'
    }

    const labelName1 = {
        national: '民族',
        brithAreaName: '出生地',
        registrationAddress: '户籍地址',
        phone: '姓名拼音',
        gender: '性别',
        emergencyContactName: '紧急联系人',
        emergencyContactPhone: '联系人电话'
    }

    const labelName2 = {
        personTypeName: '业务类型',
        applyTypeName: '办证类型',
        applyCatogryName: '办证类别',
        signTypeName: '签证类型',
        signCatogryName: '签证种类'
    }

    const labelName3 = {
        getTypeName: '取证方式'
    }

    const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    useEffect(() => {
        const date = dayjs(formData.startTime).format("YYYY-MM-DD")
        const week = weeks[dayjs(formData.startTime).format("d")]
        const times = dayjs(formData.startTime).format("hh:mm") + '-' + dayjs(formData.endTime).format("hh:mm")
        setListData({
            hallId: formData.hallId,
            time: date + ' ' + week + ' ' + times,
            name: formData.xingPy + formData.mingPy,
            phone: formData.phone,
            idCard: formData.idCard,
        })
        setListData1({
            national: formData.national,
            brithAreaName: formData.brithAreaName,
            registrationAddress: formData.registrationAddress,
            phone: formData.phone,
            gender: formData.gender.join(""),
            emergencyContactName: formData.emergencyContactName,
            emergencyContactPhone: formData.emergencyContactPhone
        })
        setListData2({
            personTypeName: formData.personTypeName,
            applyTypeName: formData.applyTypeName,
            applyCatogryName: formData.applyCatogryName,
            signTypeName: formData.signTypeName,
            signCatogryName: formData.signCatogryName,
        })
        setListData3({
            getTypeName: formData.getTypeName
        })
    }, [formData])


    function onSubmitData(){
        let appForm = {
            ...formData, 
            brithAreaId: formData.brithAreaId[2],
            personTypeId: formData.personTypeId.join(""),
            gender: formData.gender.join(""),
            applyTypeId: formData.applyTypeId.join(""),
            applyCatogryId: formData.applyCatogryId.join(""),
            signTypeId: formData.signTypeId.join(""),
            signCatogryId: formData.signCatogryId.join(""),
            getTypeId: formData.getTypeId.join("")
        }
        delete appForm.brithAreaName
        delete appForm.personTypeName
        delete appForm.applyTypeName
        delete appForm.applyCatogryName
        delete appForm.signTypeName
        delete appForm.signCatogryName
        delete appForm.getTypeName
        HttpUtil.post(API.CPAPPLY_ADDAPPLY, appForm)
            .then(responseJson=>{
                const { code, data, msg } = responseJson.data
                if(code === 0){
                    NavigationUtil.navigate(props, 'ResultPage', {type: 2})
                }else{
                    ToastUtil.toast(msg)
                }
            })
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    title='预约信息确认' 
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    hide={false}
                    popEnabled={true}
                    navigator={props.navigation}/>
                <ScrollView>
                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>广州户籍出入境业务预约</Text>
                    </View>
                    { listData && <Reservation labelName={labelName} listData={listData} /> }
                    <WhiteSpace size="lg"/>
                    { listData1 && <Reservation labelName={labelName1} listData={listData1} /> }
                    <WhiteSpace size="lg"/>
                    { listData2 && <Reservation labelName={labelName2} listData={listData2} /> }
                    <WhiteSpace size="lg"/>
                    { listData3 && <Reservation labelName={labelName3} listData={listData3} /> }
                    <Button type="primary" style={styles.btnBox} onPress={onSubmitData}>确认</Button>
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
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30
    }
});