/**
 * @description 献血信息查询
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

 import HttpUtil from 'src/util/HttpUtil' //接口请求
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'

 /*** 
 * 医院业务-献血信息查询
 * papersType-证件类型  papersPhone-证件号码  donateNumber-献血流水号
 * donateName-姓名
*/
export default function TransferTheBooking  (props) {
    const [formData,setFormData] = useState({
        papersType: '',papersPhone:'',donateNumber:"",donateName:"",
    })
    function onChanges (val) {
      
    }
    function onChangeModelName (val) {
        
    }
    
    useEffect (()=>{
        //业务类型下拉
        // HttpUtil.get(API.KeyValueList, {kindId:12})  
        //     .then(responseJson=>{   
        //         const { code, data, msg } = responseJson.data   
        //         // console.log(data,'业务类型')
        //         if(code === 0){
        //             let arr = [];
        //             let  bustype = {} //传入业务类型
        //             for (const v of data) {
        //                 arr.push({ 
        //                     value: v.id,
        //                     label: v.name
        //                 })
        //                 bustype[v.id] = v.name
        //             }
        //             settype(arr) 
        //             setBusTypes(bustype)
        //         }  
        //     }).catch(error=>{  
        //         console.log(error,'error')
        // }); 
    },[])
    function onChange () {
    }
    //查询
    function onClickbtn () {
        // if (formData.type==undefined&&formData.type=="") {
        //     ToastUtil.toast('业务类型不能为空','center')
        //     return
        // }
        // HttpUtil.get(API.VehicleApplyGetOne,{
        //     id:1
        // }).then(responseJson=>{     
        //     console.log(responseJson,'检查车辆')
        //     const { code, data, msg } = responseJson.data   
        //     if(code === 0){
        //         NavigationUtil.navigate(props,'CarInformation',{formData:formData,data:data,bustypess:bustypess})
        //     }if (code==-1&&!code) {
        //         Modal.alert('提示', '车辆信息不存在', [                
        //             { text: '知道了'},
        //             ]);
        //     } 
        // }).catch(error=>{
        //     console.log(error,'error')
        // });  
               
    }

        return (
            <View style={styles.container}>
                <NavigationBar 
                    title='献血信息查询' 
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
                            // data={type}
                            value={formData.papersType}
                            onChange={(val)=>setFormData({...formData, papersType: val})}
                            onOk={onChanges}
                        >
                            <List.Item arrow="horizontal">证件类型</List.Item>
                        </Picker>
                        <InputItem
                            type="text"
                            value={formData.papersPhone}
                            onChange={(val)=>setFormData({...formData, papersPhone: val})}
                            labelNumber={8}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            证件号码
                        </InputItem>
                        <InputItem
                            textAlign='right'       
                            type="text"
                            value={formData.donateNumber}
                            onChange={(val)=>setFormData({...formData, donateNumber: val})}
                            labelNumber={8}
                            placeholder="请输入"
                        >
                        献血流水号
                        </InputItem>
                        <InputItem  
                            textAlign='right'
                            type="text"
                            value={formData.donateName}
                            onChange={(val)=>setFormData({...formData, donateName: val})}
                            placeholder="请输入"
                            labelNumber={8}
                        >
                            姓名
                        </InputItem>
                    </List>

                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onClickbtn} >提交</Button>
                    </List>
                    {/* 下方提示 */}
                    <View style={styles.containertext}>
                        <Text style={styles.msgTip}>温馨提示</Text>
                        <View >
                            <Text style={styles.text1}>注：1.献血流水号为档次献血的条形码</Text>
                        </View>
                        <View >
                        <Text style={styles.text2}>2.若为新条形码，请直接输入条形码上的数字</Text>
                        <Text style={styles.text2}>3.若为旧条形码，请在数字前加"44011",如1234567即输入"440111234567"</Text>
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
        lineHeight:25,
        marginLeft:28

    },
    containertext:{
        textAlign:'center',
        marginLeft:20,
        marginRight:10,
        

    }
});

