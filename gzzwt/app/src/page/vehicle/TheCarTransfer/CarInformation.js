/**
 * @description 车辆信息
 * @author 择天团队 ct 
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet 
} from 'react-native';
import { 
    Button,
    InputItem,
    List,
    Picker,
    Provider,Toast,WingBlank,Modal
 } from '@ant-design/react-native';

 import HttpUtil from '../../../util/HttpUtil' //接口请求
 import NavigationBar from '../../../common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'

const dataSource = require('@bang88/china-city-data');



/*** 
 * 机动车业务-转移登记预约
 * type-业务类型  plateNumber-号码号牌 modelKindName-车辆类型 belongName-拥有人 status=状态
 * targetAreaId-转入地(迁出)
*/ 
export default function CarInformation (props) {
    let data = props.navigation.getParam('data')//用户数据
    let supformData = props.navigation.getParam('formData')//上级页面数据
    let busType = props.navigation.getParam('bustypess')//业务类型名称
    const [formData,setFormData] = useState({
        types: '11',plateNumber:"",modelKindName:'',belongName:'',status:'1',
        checktime:'', targetAreaId:'',
    })
    
    const [staData, setstaData] = useState({})//业务类型文本数据
    const [cityval, setcityval] = useState({})//转入市名称-比如-东莞市

    //渲染表单值
    function filtrate () {
        setFormData({
            plateNumber:data.plateNumber,  
            modelKindName:data.modelKindName,
            belongName:data.belongName,
            status:data.status
        }) 
        //转换状态值渲染
        if (formData.status==1) {
            setstaData({
                stuname:'正常'
            })         
        }
    }
    function onChange () {
    }
    //市名称
    function onChangecity (val) {
        console.log(val,88)
        let arr = []
        let att = []
        for( const V of dataSource ){
            arr.push(V)
        }
        for (var i=0;i < arr.length;i++){
            if(val[0]=== arr[i].value){
                for(var j=0;j<arr[i].children.length;j++){
                    att.push(arr[i].children[j])
                }
            }
        } 
        for (const A of att){
            if(val[1]==A.value){
                setcityval(A.label)
            }
        }
    }
    useEffect(() => {
        filtrate()   
    }, [])
    //提交
    function onClickbtn () {
        if (formData.checktime==undefined||formData.checktime=="") {
            ToastUtil.toast('请输入检验有效期','center')
            return
        }
        if (formData.targetAreaId==undefined || formData.targetAreaId=="") {
            ToastUtil.toast('请选择转入地区','center')
            return
        }
        NavigationUtil.navigate(props,'CarCountersign',{formData:formData,data:data,supformData:supformData,cityval:cityval})
    }
        return ( 
            <View style={styles.container}>     
                        <NavigationBar title='车辆转入地' hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <Provider>
                        <List>                            
                        <InputItem
                                type="text"
                                value={busType}
                                onChange={onChange}
                                onOk={onChange}
                                labelNumber={8}
                                textAlign='right'
                            >
                                业务类型
                            </InputItem>
                            <InputItem
                                type="text"
                                value={formData.plateNumber}
                                onChange={onChange}
                                onOk={onChange}
                                labelNumber={8}
                                textAlign='right'
                                placeholder="请输入"
                            >
                                号牌号码
                            </InputItem>
                            <InputItem
                                textAlign='right'
                                clear
                                type="text"
                                value={formData.modelKindName}
                                onChange={onChange}
                                onOk={onChange}
                            >
                            车辆类型
                            </InputItem>
                            <InputItem
                                textAlign='right'
                                clear
                                type="text"
                                value={formData.belongName}
                                onChange={onChange}
                                onOk={onChange}
                            >
                            所有人
                            </InputItem>
                            <InputItem
                                textAlign='right'
                                clear
                                type="text"
                                value={staData.stuname}
                                onChange={onChange}
                                onOk={onChange}
                            >
                            状态
                            </InputItem>
                            <InputItem
                                textAlign='right'
                                type="text"
                                value={formData.checktime}
                                onChange={(val)=>setFormData({...formData, checktime: val})}
                                onOk={onChange}labelNumber={8}  
                                placeholder="请输入"  
                            >
                            检验有效期止
                            </InputItem>
                           
                            <Picker
                                cols={2}
                                data={dataSource}
                                value={formData.targetAreaId}
                                onChange={(val)=>setFormData({...formData, targetAreaId: val})}
                                onOk={onChangecity}
                            >
                                <List.Item arrow="horizontal">转入地</List.Item>
                            </Picker>
                            
                            
                        </List>
                        <List style={{margin: 20,}}>
                        <Button  type="primary" onPress={onClickbtn} >下一步</Button>
                        </List>                 
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
});

