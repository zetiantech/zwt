/**
 * @description 个人指标申请-预约信息确认
 * @author ct
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { 
    Button,
    Modal,
    Flex,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

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
                        <Flex.Item style={{flex: 1}}>
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


    const labelName = {
        applyName: '申请人姓名',
        sex:"性别",
        birthTime:'出生日期',
        applyType: '申请类型',  
        cardType:'证件类型',
        cardNumber:'证件号码',
        applyDrivingType:'申请驾照时使用的证件类型',
        drivingNumber:'机动车驾驶证号',
        drivingFileNumber:'机动车驾驶档案编号',
        allowVehicleModel:'准驾车型',
        thisCard:'是否本地驾照',
        myWhetherReg:'本人名下是否存在登记中中小汽车',
        phone:'手机号码',
        detailAddress:'联系地址',
        email:'电子邮箱',
        postcode:'邮编'
    }
    useEffect(() => {
        setListData({
            applyName: '',
            sex:"",
            birthTime:'',
            applyType: '',      
            cardType:'',
            cardNumber:'',
            applyDrivingType:'',
            drivingNumber:'',
            drivingFileNumber:'',
            allowVehicleModel:'',
            thisCard:'',
            myWhetherReg:'',
            phone:'',
            detailAddress:'',
            email:'',
            postcode:''
        })

    }, [])


    function onSubmitData(){
        // let appForm = {
        //     ...formData, 
        //     gender: formData.gender.join(""),
        //     applyTypeId: formData.applyTypeId.join(""),
        //     applyCatogryId: formData.applyCatogryId.join(""),
        //     signTypeId: formData.signTypeId.join(""),
        //     signCatogryId: formData.signCatogryId.join(""),
        //     getTypeId: formData.getTypeId.join("")
        // }
        // Modal.alert('', '确认要提交吗？', [
        //     {
        //         text: '取消'
        //     },
        //     { text: '确认', onPress: () => {
        //         HttpUtil.post(API.CPAPPLY_ADDAPPLY, appForm)
        //             .then(responseJson=>{
        //                 const { code, data, msg } = responseJson.data
        //                 if(code === 0){
        //                     NavigationUtil.navigate(props, 'ResultPage', {type: 2})
        //                 }else{
        //                     ToastUtil.toast(msg)
        //                 }
        //             })
        //     }},
        // ]);
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='预约信息确认' hide={false} popEnabled={true}  navigator={props.navigation}/>
                <ScrollView>
                   
                    { listData && <Reservation labelName={labelName} listData={listData} /> }   
                   
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
        paddingTop: 10,
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
    },
    upImg:{
        backgroundColor: '#fff',
        marginHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        borderRadius: 10,
        marginTop: 20,
    },
});