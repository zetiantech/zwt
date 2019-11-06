/**
 * @description 出入境-填写业务信息
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet 
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Switch,
    Provider,
    Modal,
    Card,
    WhiteSpace
 } from '@ant-design/react-native';

 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'
 import Form from 'src/component/FormComponent'
 import ToastUtil from 'src/util/ToastUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import Utils from 'src/util/Utils'
 import NavigationUtil from 'src/util/NavigationUtil';


export default function BusinessInfo(props){

    const fromData = props.navigation.getParam("form")

    const [applyType, setApplyType] = useState([])
    const [applyCatogry, setApplyCatogry] = useState([])
    const [signType, setSignType] = useState([])
    const [signCatogry, setSignCatogry] = useState([])
    const [getType, setGetType] = useState([])

    const [cardTypeId, setCardTypeId] = useState("1")

    const [params, setParams] = useState({
        cardType: false
    })
    const [params1, setParams1] = useState({
        cardType: false
    })
    const [params2, setParams2] = useState({
        cardType: false,
        applyTypeId: [],
        applyTypeName: '',
        applyCatogryId: [],
        applyCatogryName: '',
        signTypeId: [],
        signTypeName: '',
        signCatogryId: [],
        signCatogryName: ''
    })
    const [params3, setParams3] = useState({
        getTypeId: [],
        getTypeName: '',
        postAddress: ''
    })

    useEffect(() => {
        const val = Utils.getLabelValue(applyType, params2.applyTypeId.join(""))
        setParams2({...params2, applyTypeName: val})
    }, [params2.applyTypeId])

    useEffect(() => {
        const val = Utils.getLabelValue(applyCatogry, params2.applyCatogryId.join(""))
        setParams2({...params2, applyCatogryName: val})
    }, [params2.applyCatogryId])

    useEffect(() => {
        const val = Utils.getLabelValue(signType, params2.signTypeId.join(""))
        setParams2({...params2, signTypeName: val})
    }, [params2.signTypeId])

    useEffect(() => {
        const val = Utils.getLabelValue(signCatogry, params2.signCatogryId.join(""))
        setParams2({...params2, signCatogryName: val})
    }, [params2.signCatogryId])

    useEffect(() => {
        const val = Utils.getLabelValue(getType, params3.getTypeId.join(""))
        setParams3({...params3, getTypeName: val})
    }, [params3.getTypeId])

    useEffect(() => {
        if(params.cardType){
            setCardTypeId(1)
            setParams1({...params1, cardType: false})
            setParams2({...params2, cardType: false})
        }
    }, [params.cardType])

    useEffect(() => {
        if(params1.cardType){
            setCardTypeId(2)
            setParams({...params, cardType: false})
            setParams2({...params2, cardType: false})
        }
    }, [params1.cardType])

    useEffect(() => {
        if(params2.cardType){
            setCardTypeId(3)
            setParams({...params, cardType: false})
            setParams1({...params1, cardType: false})
        }
    }, [params2.cardType])

    const labelData = {
        cardType: {
            label: '首次办理普通护照',
            type: 'Switch',
            data: false
        },
    }

    const labelData1 = {
        cardType: {
            label: '首次办理往来港澳通行证',
            type: 'Switch',
            data: false
        },
    }

    const labelData2 = {
        cardType: {
            label: '首次办理往来台湾通行证',
            type: 'Switch',
            data: false
        },
        applyTypeId: {
            label: '办证类型',
            type: 'Picker',
            data: applyType
        },
        applyCatogryId: {
            label: '办证类别',
            type: 'Picker',
            data: applyCatogry
        },
        signTypeId: {
            label: '签证类型',
            type: 'Picker',
            data: signType
        },
        signCatogryId: {
            label: '签证种类',
            type: 'Picker',
            data: signCatogry
        }
    }

    const labelData3 = {
        getTypeId: {
            label: '取证方式',
            type: 'Picker',
            data: getType
        }
    }

    useEffect(() => {
        getSelectValue(1)
        getSelectValue(2)
        getSelectValue(3)
        getSelectValue(4)
        getSelectValue(5)
    }, [])


    function getSelectValue(kindId) {
        HttpUtil.get(API.KEYVALUE_LIST, {
            kindId: kindId
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                let list = Object.keys(data).map((item, i)=>({label: data[item], value: item}))
                switch(kindId) {
                    case 1:
                        setApplyType(list)
                    break;
                    case 2:
                        setApplyCatogry(list)
                    break;
                    case 3:
                        setSignType(list)
                    break;
                    case 4:
                        setSignCatogry(list)
                    break;
                    case 5:
                        setGetType(list)
                    break;
                }
            }else{
                ToastUtil.toast(msg)
            }
        })
    }

    function validForm(){
        if(!params2.applyTypeId.length){
            ToastUtil.toast("办证类型不能为空")
            return false;
        }else if(!params2.applyCatogryId.length){
            ToastUtil.toast("办证类别不能为空")
            return false;
        }else if(!params2.signTypeId.length){
            ToastUtil.toast("签证类型不能为空")
            return false;
        }else if(!params2.signCatogryId.length){
            ToastUtil.toast("签证种类不能为空")
            return false;
        }else if(!params3.getTypeId.length){
            ToastUtil.toast("取证方式不能为空")
            return false;
        }else if(params3.getTypeId.length && params3.getTypeId[0] == 10) {
            if(params3.postAddress==""){
                ToastUtil.toast("邮递地址不能为空")
                return false;
            }
        }
        return true;
    }


    function onNextHandler() {
        if(!validForm()){
            return;
        }
        let forms = {...fromData, cardTypeId: cardTypeId, ...params2, ...params3}
        NavigationUtil.navigate(props, 'ReservationInfo', {form: forms})
    }


    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    title='填写业务信息'
                    statusBar={{backgroundColor: '#FFFFFF'}} 
                    hide={false} 
                    popEnabled={true}
                    navigator={props.navigation} />
                <ScrollView>
                    <Form header="普通护照" data={params} showData={labelData} setData={setParams} popEnabled ={true}  navigator={props.navigation} />
                    <Form header="港澳通行证" data={params1} showData={labelData1} setData={setParams1} popEnabled ={true}  navigator={props.navigation} />
                    <Form header="台湾通行证" data={params2} showData={labelData2} setData={setParams2} popEnabled ={true}  navigator={props.navigation} />
                    <Form header="取证方式" data={params3} showData={labelData3} setData={setParams3} popEnabled ={true}  navigator={props.navigation} />
                    {
                      params3.getTypeId[0] == 10 && <View>
                            <View style={{ marginTop: 20 }}>
                                <Card full>
                                    <Card.Header title="寄送地址" style={{paddingTop: 15, paddingBottom: 15}}/>
                                    <Card.Body>
                                        <List>
                                          <List.Item arrow="horizontal" >
                                            李筱思
                                            <List.Item.Brief style={{marginTop: 8}}>广州市荔湾区龙华大道C栋1010号</List.Item.Brief>
                                          </List.Item>
                                        </List>
                                    </Card.Body>
                                </Card>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Card full>
                                    <Card.Header title="办理费用" style={{paddingTop: 15, paddingBottom: 15}}/>
                                    <Card.Body>
                                        <View style={styles.courierContent}>
                                            <Text style={styles.courierText}>工本费</Text>
                                            <Text style={styles.courierText}>10元</Text>
                                        </View>
                                        <View style={styles.courierContent}>
                                            <Text style={styles.courierText}>工本费</Text>
                                            <Text style={styles.courierText}>20元</Text>
                                        </View>
                                        <View style={styles.courierContent}>
                                            <Text style={styles.courierText1}>合计</Text>
                                            <Text style={styles.courierText1}>30元</Text>
                                        </View>
                                    </Card.Body>
                                </Card>
                            </View>
                        </View>
                    }
                    
                    <Button style={styles.btnBox} type="primary" onPress={onNextHandler}>下一步</Button>
                    <Text style={styles.msgTip}>注：该业务预约后，须前往现场办理</Text>
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
    buttonBox: {
        height: 48,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30
    },
    buttonStyles: {
        color: '#ffffff',
        backgroundColor: '#2F74ED'
    },
    msgTip: {
        textAlign: 'center',
        color: '#999'
    },
    courierContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,  
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    courierText: {
        color: '#999',
        fontSize: 14
    },
    courierText1: {
        color: '#333',
        fontSize: 16
    },
    btnBox: {
        marginVertical: 30,
        marginHorizontal: 20,
    }
});

