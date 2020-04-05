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
    StyleSheet,TouchableOpacity,DeviceEventEmitter
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
export default function CarInformationTwo (props) {
        const busType = props.navigation.getParam('bustypetwo')//上级页面 车辆类型文本数据
        const carData = props.navigation.getParam('carData')
        const [formData,setFormData] = useState({
            busTypeId:'',reasonAppy:'',takeWayId:'',needTmpPlate:'',sendName:'地址未添加',sendAddress:'点击添加地址',phone:""
        })
        const [busTypeId,setbusTypeId] = useState()//业务类型  
        const [reasonAppy,setreasonAppy] = useState()//申请原因
        const [takeWayId,settakeWayId] = useState([
            { label: '委托邮政寄递', value: 1 },
            { label: '网点自取', value: 2 }
        ])//获取方式
        const [needTmpPlate,setneedTmpPlate] = useState([
            { label: '不需要', value: 0 },
            { label: '需要', value: 1 }
        ]) //是否需要临牌

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
        function onChangesetrp (val) {
            const key = val[0]
            setrptReasonIdtwo(rptReasonId[key],333333)
        }
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
            if (formData.needTmpPlate==""||formData.needTmpPlate==undefined) { 
                ToastUtil.toast('请选择是否需要临牌','center')
                return
            }
            if (formData.phone==""||formData.phone==undefined) { 
                ToastUtil.toast('请选择地址','center')
                return
            }
            NavigationUtil.navigate(props,'ReplacementCarConfirmation',
            {busType:busType,bustypetwo:bustypetwo,rptReasonIdtwo:rptReasonIdtwo,carData:carData,getakeWayText:getakeWayText,formData:formData}
            )
    
        }
       DeviceEventEmitter.addListener('info',(item)=>{        
        console.log(item.item,4444444444);
            setFormData({
                
                sendName:item.item.name,
                sendAddress:item.item.address
            })
            }
        );   
        function getUserAddress () {
            //获取用户地址   
            HttpUtil.get(API.AddressList,{          
            }).then(responseJson => { 
                const { code, data, msg } = responseJson.data 
                    if(code == 0) {
                        console.log(data,555555555)
                        setFormData({
                            sendName:data[0].name,
                            sendAddress:data[0].address,
                            phone:data[0].phone,
                        })
                    }else{
                        ToastUtil.toast(msg)
                    }                                                                               
                }).catch(error => console.log('获取地址列表--', error)); 
        }
        function onChangemodel () {

        }
        useEffect(() => {
            getUserAddress()
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
                    let  bustype = {} //传入车辆类型
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
                            <Picker
                                cols={1}
                                itemStyle={{padding: 10}}
                                data={needTmpPlate}
                                value={formData.needTmpPlate}
                                onChange={(val)=>setFormData({...formData, needTmpPlate: val})}
                                onOk={onChangemodel}  
                            >
                                <List.Item arrow="horizontal">是否需要临牌</List.Item>
                            </Picker>
                        </List>
                                           
                        <View>
                        {  getakeWay &&  getakeWay==1 &&                       
                            <TouchableOpacity style={{ marginTop: 20 }}>
                                <Card full>
                                    <Card.Header title="寄送地址" style={{paddingTop: 15, paddingBottom: 15}}/>
                                    <Card.Body>
                                        <List styles={{Body: {borderTopWidth: 0,borderBottomWidth:0}}}> 
                                        <TouchableOpacity 
                                        style={{marginLeft:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}
                                        onPress={()=> NavigationUtil.navigate(props,'UserAddRess',{type:2})}
                                        >                              
                                            <View>
                                                <Text style={{fontSize:18}}>{formData.sendName}</Text>
                                                <List.Item.Brief style={{marginTop: 8}}>{formData.sendAddress}</List.Item.Brief>
                                            </View>
                                            <Image style={{marginRight:20,tintColor:'#ccc'}} source={require('../../../res/images/ic_tiaozhuan.png')}/>
                                        </TouchableOpacity>
                                        
                                        </List>
                                    </Card.Body>
                                </Card>
                            </TouchableOpacity>  
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
