/**
 * @description 机动车转移登记预约
 * @author 择天团队 
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet 
} from 'react-native';
import { 
    Button,
    InputItem,
    List,
    Picker,
    Switch,
    Provider,Toast,Modal
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'

 /*** 
 * 机动车业务-转移登记预约
 * type-业务员类型 modelKindName-号牌种类  plateNumber-号牌编号 
 * engineNo-发动机号 vin-车架号 
*/
export default function TransferTheBooking  (props) {
    const [formData,setFormData] = useState({
        type: '',modelKindName:'',plateNumber:'',engineNo:'',vin:''
    })
    const [type,settype] = useState() //业务类型
    const [modelKindName,setmodelKindName] = useState() //号牌种类
    const [bustypes, setBusTypes] = useState({})//业务类型文本数据
    const [bustypess, setBusTypess] = useState({})//业务类型文本数据

    //传给下级页面文本数据-业务类型
    function onChanges (val) {
        const key = val[0]
        setBusTypess(bustypes[key],333333)
    }
    function onChangeModelName (val) {
        // const key = val[0]
        // console.log(bustypes, 1111111)
        // setBusTypess(bustypes[key],333333)
    }
    
    useEffect (()=>{
        //业务类型下拉
        HttpUtil.get(API.KeyValueList, {kindId:12})  
            .then(responseJson=>{   
                const { code, data, msg } = responseJson.data   
                // console.log(data,'业务类型')
                if(code === 0){
                    let arr = [];
                    let  bustype = {} //传入业务类型
                    for (const v of data) {
                        arr.push({ 
                            value: v.id,
                            label: v.name
                        })
                        bustype[v.id] = v.name
                    }
                    settype(arr) 
                    setBusTypes(bustype)
                }  
            }).catch(error=>{  
                console.log(error,'error')
        });
        //号牌种类
        HttpUtil.get(API.KeyValueList, {kindId:4})  
        .then(responseJson=>{   
            const { code, data, msg } = responseJson.data   
            if(code === 0){
                let arr = [];
                for (const v of data) {
                    arr.push({ 
                        value: v.id,
                        label: v.name
                    })  
                }
                setmodelKindName(arr) 
            }  
            }).catch(error=>{
            console.log(error,'error')
        });   
    },[])
    function onChange () {
    }
    //提交
    function onClickbtn () {
        if (formData.type==undefined&&formData.type=="") {
            ToastUtil.toast('业务类型不能为空','center')
            return
        }
        if (formData.modelKindName==undefined&&formData.modelKindName=="") {
            ToastUtil.toast('号牌种类不能为空','center')
            return
        }
        if (formData.plateNumber==undefined&&formData.plateNumber=="") {
            ToastUtil.toast('号牌编号不能为空','center')
            return
        }
        if (formData.engineNo==undefined&&formData.engineNo=="") {
            ToastUtil.toast('发动机号不能为空','center')
            return
        }
        if (formData.vin==undefined&&formData.vin=="") {
            ToastUtil.toast('车架号不能为空','center')
            return
        }
        HttpUtil.get(API.VehicleApplyGetOne,{
            id:1
        }).then(responseJson=>{     
            console.log(responseJson,'检查车辆')
            const { code, data, msg } = responseJson.data   
            if(code === 0){
                NavigationUtil.navigate(props,'CarInformation',{formData:formData,data:data,bustypess:bustypess})
            }if (code==-1&&!code) {
                Modal.alert('提示', '车辆信息不存在', [                
                    { text: '知道了'},
                    ]);
            } 
        }).catch(error=>{
            console.log(error,'error')
        });  
               
    }

        return (
            <View style={styles.container}>
                <NavigationBar 
                    title='机动车业务' 
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    hide={false} 
                    popEnabled={true}  
                    navigator ={props.navigation}/>
                <Provider>
                <ScrollView
                    style={{ flex: 1, marginTop: 20 }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <List>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={type}
                            value={formData.type}
                            onChange={(val)=>setFormData({...formData, type: val})}
                            onOk={onChanges}
                        >
                            <List.Item arrow="horizontal">业务类型</List.Item>
                        </Picker>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={modelKindName}
                            value={formData.modelKindName}
                            onChange={(val)=>setFormData({...formData, modelKindName: val})}
                            onOk={onChangeModelName}
                        >
                            <List.Item arrow="horizontal">号牌种类</List.Item>
                        </Picker>
                        <InputItem
                            clear
                            type="text"
                            value={formData.plateNumber}
                            onChange={(val)=>setFormData({...formData, plateNumber: val})}
                            labelNumber={8}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            号牌编号
                        </InputItem>
                        <InputItem
                            textAlign='right'
                            clear
                            type="text"
                            value={formData.engineNo}
                            onChange={(val)=>setFormData({...formData, engineNo: val})}
                            labelNumber={8}
                            placeholder="请输入发动机号后四位"
                        >
                        发动机号
                        </InputItem>
                        <InputItem  
                            textAlign='right'
                            clear
                            type="text"
                            value={formData.vin}
                            onChange={(val)=>setFormData({...formData, vin: val})}
                            placeholder="请输入后四位"
                            labelNumber={8}
                        >
                            车架号
                        </InputItem>
                    </List>

                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onClickbtn} >提交</Button>
                    </List>
                    {/* 下方提示 */}
                    <View style={styles.containertext}>
                        <Text style={styles.msgTip}>温馨提示</Text>
                        <View >
                            <Text style={styles.text1}>1:发动机后四位含非数字字符(例："公"、“N”、“*”、“￥”等) 的 请用半角？代替)</Text>
                        </View>
                        <View >
                            <Text style={styles.text2}>2:增城、番禺、花都车管所暂不办理中型客车，进口车机动车移动登记业务</Text>
                        </View>
                    </View>              
                </ScrollView>
            </Provider>
            </View>
        )
    
}

const styles = StyleSheet.create({
    input: {
        width:200,
        fontSize:16,
        marginRight: 100,
    },
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
        color: '#999'
    },
    text1:{
        color: '#999',
        lineHeight:25

    },
    text2:{
        color: '#999',
        lineHeight:25

    },
    containertext:{
        textAlign:'center',
        marginLeft:20,
        marginRight:10,
        

    }
});

