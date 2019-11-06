/**
 * @description 公积金业务-缴存账户启封*封存
 * @author ct
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
    Provider,Toast,Modal,DatePicker
 } from '@ant-design/react-native';

 import HttpUtil from 'src/util/HttpUtil' //接口请求
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'
 import { CurentTime, cureentTimeToDay, cureentTime } from 'src/util/DateUtil'

 /*** 
 * 公交金-缴存账户启封*封存
 * name-姓名, papersType-证件类型, papersNumber-证件号码,depositeState-缴存状态, 
 * changeType-变更类型, depositeType-自愿缴存类型, depositeCarnumber-缴存基数
 * perageRatio-个人缴存比例, depositeMoney-缴存金额 depositeDate-缴存起始年月
*/
export default function TransferTheBooking  (props) {
    const [formData,setFormData] = useState({
        name: '',papersType:'',papersNumber:'',depositeState:'',changeType:'',
        depositeType: '',depositeCarnumber:'',perageRatio:'',depositeMoney:'',depositeDate:'',

    })
    const [type,settype] = useState() //业务类型
    const [modelKindName,setmodelKindName] = useState() //号牌种类
    function onChanges () {

    }
    
    useEffect (()=>{
        //证件类型下拉
        // HttpUtil.get('http://192.168.10.58:8830/fund/accountStatus/echo',          
        //     {}
        // ).then(responseJson=>{   
        //     console.log(responseJson,555555)
        //         const { code, data, msg } = responseJson.data   
        //         if(code === 0){
        //         }  
        //     }).catch(error=>{  
        //         console.log(error,'error')
        // }); 
    },[])
    function onChange () {
    }
    //提交
    function onClickbtn () {

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
                    title='个人账户启封'
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
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
                        <InputItem
                            type="text"
                            value={formData.name}
                            onChange={(val)=>setFormData({...formData, name: val})}
                            labelNumber={8}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            姓名
                        </InputItem>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={type}
                            value={formData.papersType}
                            onChange={(val)=>setFormData({...formData, papersType: val})}
                            onOk={onChanges}
                        >
                            <List.Item arrow="horizontal">证件类型</List.Item>
                        </Picker>
                        <InputItem
                            type="text"
                            value={formData.papersNumber}
                            onChange={(val)=>setFormData({...formData, papersNumber: val})}
                            labelNumber={8}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            证件号码
                        </InputItem>
                        <InputItem
                            type="text"
                            value={formData.depositeState}
                            onChange={(val)=>setFormData({...formData, depositeState: val})}
                            textAlign='right'
                        >
                            缴存状态
                        </InputItem>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={type}
                            value={formData.changeType}
                            onChange={(val)=>setFormData({...formData, changeType: val})}
                            onOk={onChanges}
                        >
                            <List.Item arrow="horizontal">变更类型</List.Item>
                        </Picker>
                        <Picker
                            cols={1}
                            itemStyle={{padding: 10}}
                            data={type}
                            value={formData.depositeType}
                            onChange={(val)=>setFormData({...formData, depositeType: val})}
                            onOk={onChanges}
                        >
                            <List.Item arrow="horizontal">自愿缴存类型</List.Item>
                        </Picker>
                        <InputItem
                            type="text"
                            value={formData.depositeCarnumber}
                            onChange={(val)=>setFormData({...formData, depositeCarnumber: val})}
                            textAlign='right'
                        >
                            缴存基数
                        </InputItem>
                        <InputItem
                            type="text"
                            value={formData.perageRatio}
                            onChange={(val)=>setFormData({...formData, perageRatio: val})}
                            textAlign='right'
                            labelNumber={8}
                        >
                            个人缴存比例
                        </InputItem>
                        <InputItem
                            type="text"
                            value={formData.depositeMoney}
                            onChange={(val)=>setFormData({...formData, depositeMoney: val})}
                            textAlign='right'
                            labelNumber={8}
                        >
                            缴存金额
                        </InputItem>
                
                        <DatePicker
                            value={formData.depositeDate}
                            mode="date"
                            defaultDate={new Date()}
                            minDate={new Date(2000, 7, 6)}
                            maxDate={new Date}
                            onChange={(val)=>setFormData({...formData, depositeDate: val})}
                            format="YYYY-MM-DD"
                            >
                            <List.Item arrow="horizontal">汇缴起始年月</List.Item>
                        </DatePicker>                      
                    </List>
                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={()=> onClickbtn()} >提交</Button>
                    </List>              
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

