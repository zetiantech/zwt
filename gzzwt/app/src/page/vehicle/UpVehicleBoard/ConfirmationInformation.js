/**
 * @description 信息确认
 * @author 择天团队 ct
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
    Provider,Toast,WingBlank,Modal
 } from '@ant-design/react-native';
 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'

const  dataSource = [
    {
        value: '1',
        label: '小型机动车'
    },
    {
        value: '2',
        label: '中型机动车'
    },
    {
        value: '3',
        label: '大型机动车'
    },
]

/*** 
 * 机动车业务
 * brand-车辆品牌 modelCode-车辆型号   plateNumber-车牌号(车辆识别代码是个什么鬼???)
*/
export default function ConfirmationInformation (props) {  
        let data  = props.navigation.getParam('data')
        const [formData,setFormData] = useState({
            brand:'',modelCode:'',plateNumber:"",
        })
        function onChange () {

        }
        function onButtonClick (){
            if (formData.brand=='') {
            ToastUtil.toast('请输入车辆品牌','center')
                return
            }
            if (formData.modelCode=='') {
                ToastUtil.toast('请输入车辆型号','center')
                return
            }
            if (formData.plateNumber=='') {
                ToastUtil.toast('请填写车辆识别代码','center')
                return
            }
            HttpUtil.post(API.vehicleApplyAddNewPlateApply, {
                vehicleId:data.id
            })  
            .then(responseJson=>{   
                console.log(responseJson,'上牌预约')          
                const { code, data, msg } = responseJson.data  
                if(code === 0){     
                    // setuserData(data)                   
                    NavigationUtil.navigate(props,'ResultPage',{type:5})
                }if (code==-1&&!code) {
                    Modal.alert('提示', '车辆信息不存在', [              
                    { text: '知道了', onPress: () => 
                        console.log(11)
                    },
                    ]);
                } 
            }).catch(error=>{    
                console.log(error,'个人信息')
        });
        }
        return (
            <View style={styles.container}>
                <NavigationBar title='信息确认'  hide={false} popEnabled = {true} navigator ={props.navigation}/>
                <Provider>           
                    <List>
                        <InputItem
                            labelNumber={8}
                            type="text"
                            value={data.modelKindName}
                            //  onChange={(val)=>setFormData({...formData, idTypeId: val})}
                             onOk={onChange}
                             textAlign='right'
                             placeholder="请输入"
                        >
                            号牌种类
                        </InputItem>
                        <InputItem
                            labelNumber={8}
                            type="text"
                            value={'机动车合格证'}
                            //  onChange={(val)=>setFormData({...formData, idTypeId: val})}
                             onOk={onChange}
                             textAlign='right'
                             placeholder="请输入"
                        >
                            机动车凭证
                        </InputItem>
                        <InputItem
                            labelNumber={8}
                            type="text"
                            value={formData.brand}
                             onChange={(val)=>setFormData({...formData, brand: val})}
                             onOk={onChange}
                             textAlign='right'
                             placeholder="请输入"
                        >
                        车辆品牌
                        </InputItem>
                        <InputItem  
                            type="text"
                            value={formData.modelCode}
                             onChange={(val)=>setFormData({...formData, modelCode: val})}
                             onOk={onChange}
                             textAlign='right'
                             placeholder="请输入"
                        >
                            <Text style={styles.input}>车辆型号</Text>
                        </InputItem>
                        <InputItem 
                            labelNumber={8}
                            value={formData.plateNumber}
                             onChange={(val)=>setFormData({...formData, plateNumber: val})}
                             onOk={onChange}
                             textAlign='right'
                             placeholder="请输入"
                        >
                            <Text style={styles.input}>车辆识别代码</Text>
                        </InputItem>
                        <InputItem  
                            labelNumber={8}
                            value={data.belongName}
                            //  onChange={(val)=>setFormData({...formData, idTypeId: val})}
                             onOk={onChange}
                             textAlign='right'
                             placeholder="请输入"
                        >
                            <Text style={styles.input}>所有人</Text>
                        </InputItem>
                        <InputItem 
                            labelNumber={8}
                            value={data.plateHead}
                            // onChange={(val)=>setFormData({...formData, idTypeId: val})}
                            onOk={onChange}
                            textAlign='right'
                            placeholder="请输入"
                        >
                            可选号牌头
                        </InputItem>
                    </List>
                    <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onButtonClick}>提交</Button>
                </List>
                    
            </Provider>
            </View>
        );
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
        textAlign: 'center',
        color: '#999'
    }
});

