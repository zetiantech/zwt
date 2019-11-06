/**
 * @description 车辆基本信息2
 * @author 择天团队 
*/
import React, { Component,useState,useEffect, useRef } from 'react'
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
    DatePicker,
    Checkbox
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "../../../util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'  
const dataSource = require('@bang88/china-city-data');

/*** 
 * 机动车业务-补领机动车号牌
 * busTypeId-业务类型  reasonAppy-申请原因 takeWayId-获取方式，needTmpPlate-是否临牌
 * sendName-寄送姓名  sendAddress-寄送地址
*/    
export default function RenewDrivingPermits2 (props) {
        // const busType = props.navigation.getParam('bustypetwo')//1级页面 车辆类型文本数据
        const carData = props.navigation.getParam('carData')
        const [formData,setFormData] = useState({
            busTypeId:'',reasonAppy:'',takeWayId:'',sendName:'李小四',sendAddress:'广州市荔湾区龙华大道C2栋1018号'
        })
        const [busTypeId,setbusTypeId] = useState()//业务类型  
        const [reasonAppy,setreasonAppy] = useState()//申请原因
        const [takeWayId,settakeWayId] = useState([
            { label: '委托邮政寄递', value: 1 },
            { label: '网点自取', value: 2 }
        ])//获取方式
        const [sendName,setsendName] = useState({
            id:1,name:'李小四'
        })
        const [sendAddress,setsendAddress] = useState({
            id:1,address:'广州市荔湾区龙华大道C2栋1018号'
        })
    const [bustypes, setBusTypes] = useState()//业务类型数组
    const [bustypetwo, setBusTypetwo] = useState()//业务类型文本数据
    const [rptReasonId, setrptReasonId] = useState()//申请原因数组
    const [rptReasonIdtwo, setrptReasonIdtwo] = useState()//申请原因文本数据
    const [getakeWay, setgetakeWay] = useState()//获取方式id
    const [getakeWayText, setgetakeWayText] = useState()//获取方式文本
        //选中时获取业务类型文本数据
        function onChangebus (val) {
            const key = val[0]
            setBusTypetwo(bustypes[key],333333)
        }
        //获取申请原因文本数据
        function onChangesetrp (val) {
            const key = val[0]
            setrptReasonIdtwo(rptReasonId[key],333333)
        }
        //获取方式(邮寄/自取)文本数据
        function onChangetakeWayId (val) {
            setgetakeWay(val)
            for (const  V of takeWayId ){
                if(V.value == val){
                    setgetakeWayText(V.label)
                }
            }
        }

        function onButtonClick () {
            if (formData.busTypeId==""||formData.busTypeId==undefined) {
                ToastUtil.toast('请选择业务类型','center')
                return
            }
            if (formData.reasonAppy==""||formData.reasonAppy==undefined) {
                ToastUtil.toast('请选择申请原因','center')
                return
            }
            if (formData.takeWayId==""||formData.takeWayId==undefined) {
                ToastUtil.toast('请选择获取方式','center')
                return
            }
            NavigationUtil.navigate(props,'RenewDrivingPermits3',
            {bustypetwo:bustypetwo,rptReasonIdtwo:rptReasonIdtwo,carData:carData,getakeWayText:getakeWayText,formData:formData}
            )
    
        }
        function onChangemodel () {

        }
        useEffect(() => {
            //车辆类型
            HttpUtil.get(API.KeyValueList, {kindId:14})  
            .then(responseJson=>{   
                const { code, data, msg } = responseJson.data   
                if(code === 0){  
                    let arr = [];
                    let  bustype = {} //传入车辆类型
                    for (const v of data) {
                        arr.push({ 
                            value: v.id,
                            label: v.name
                        })
                        bustype[v.id] = v.name    
                    }
                    setBusTypes(bustype)
                    setbusTypeId(arr)   
                }  
                }).catch(error=>{
                console.log(error,'error')
                });
                //申请原因
            HttpUtil.get(API.KeyValueList, {kindId:7})  
            .then(responseJson=>{   
                const { code, data, msg } = responseJson.data   
                if(code === 0){  
                    let arr = [];
                    let  bustype = {} 
                    for (const v of data) {
                        arr.push({ 
                            value: v.id,
                            label: v.name
                        })
                        bustype[v.id] = v.name    
                    }
                    setrptReasonId(bustype)
                    setreasonAppy(arr)   
                }  
                }).catch(error=>{
                console.log(error,'error')
                });        
        }, [])
        return (
            <View style={styles.container}>
            <NavigationBar title='业务类型' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <Provider>
                    <View style={{ flex: 1,}}>
                        <List style={{marginTop: 15}}>
                            <Picker
                                cols={1}
                                itemStyle={{padding: 10}}
                                data={busTypeId}
                                value={formData.busTypeId}
                                onChange={(val)=>setFormData({...formData, busTypeId: val})}
                                onOk={onChangebus}  
                            >
                                <List.Item arrow="horizontal">业务类型</List.Item>
                            </Picker>
                            <Picker
                                cols={1}
                                itemStyle={{padding: 10}}
                                data={reasonAppy}
                                value={formData.reasonAppy}
                                onChange={(val)=>setFormData({...formData, reasonAppy: val})}
                                onOk={onChangesetrp}  
                            >
                                <List.Item arrow="horizontal">申请原因</List.Item>
                            </Picker>
                            <Picker
                                cols={1}
                                itemStyle={{padding: 10}}
                                data={takeWayId}
                                value={formData.takeWayId}
                                onChange={(val)=>setFormData({...formData, takeWayId: val})}
                                onOk={onChangetakeWayId}  
                            >
                                <List.Item arrow="horizontal">获取方式</List.Item>
                            </Picker>
                        </List>
                                           
                        <View>
                        {      getakeWay &&  getakeWay==1 &&                       
                            <View style={{ marginTop: 20 }}>
                                <Card full>
                                    <Card.Header title="寄送地址" style={{paddingTop: 15, paddingBottom: 15}}/>
                                    <Card.Body>
                                        <List styles={{Body: {borderTopWidth: 0,borderBottomWidth:0}}}>
                                        <List.Item arrow="horizontal" >
                                            {sendName.name}
                                            <List.Item.Brief style={{marginTop: 8}}>{sendAddress.address}</List.Item.Brief>
                                        </List.Item>
                                        </List>
                                    </Card.Body>
                                </Card>
                            </View>  
                        }                     
                        </View>                                             
                        <List style={styles.buttonStyles}>
                            <Button type="primary" onPress={onButtonClick}>下一步</Button>
                        </List>      
                    </View>     
                </Provider>
            </View>
        );
    
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
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15
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
    }
});

