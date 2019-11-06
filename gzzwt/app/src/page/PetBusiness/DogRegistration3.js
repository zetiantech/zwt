/**
 * @description 预约信息确认
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

const DogImage = ({})=>{
    return(
        <View >                                  
            <View style={styles.upImg} >
                <Image style={{width:35,height:35}} source={require('src/res/images/btn_picload.png')}></Image>
                <Text>犬只照片(犬侧面全身照片)</Text>    
            </View>               
        </View>
    )
}


export default function ReservationInfo(props){

    const formData = props.navigation.getParam("form")

    const [listData, setListData] = useState([])
    const [listData1, setListData1] = useState([])


    const labelName = {
        name: '姓名',
        gender: '性别',
        phone: '联系电话',
        idCard: '身份证号',
        detAddress: '居住地'
    }

    const labelName1 = {
        dogName: '犬名',
        weight: '体重',
        dogHeight: '肩高',
        dogcolor: '毛色',
        dogSex: '性别',
        dogKind: '犬种',
        dogBirthDate: '出生日期',
        purpose: '饲养用途',
        subordinatePolice: '所属派出所',
        immuneCard: '免疫证号',
        immuneTime: '免疫有效期',  
        immuneOrg: '免疫机构',  
    }


    useEffect(() => {
        setListData({
            name: '',
            gender: '',
            phone: '',
            idCard: '',
            detAddress: '',
        })
        setListData1({
            dogName: '',
            weight: '',
            dogHeight: '',
            dogcolor: '',
            dogSex: '',
            dogKind: '',
            dogBirthDate: '',
            purpose: '',
            subordinatePolice: '',
            immuneCard: '',
            immuneTime: '',  
            immuneOrg: '',  
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
                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>养犬人信息</Text>
                    </View>
                    { listData && <Reservation labelName={labelName} listData={listData} /> }
                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>犬只信息</Text>
                    </View>
                    { listData1 && <Reservation labelName={labelName1} listData={listData1} /> }
                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>犬只照片</Text>
                    </View>
                    
                    <DogImage/>
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