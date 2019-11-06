/**
 * @description 公积金活期(定期)余额查询
 * @author 择天团队 ct
*/
import React, { Component,useState,useEffect, useRef } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet, 
} from 'react-native';
import { 
    Button,
    InputItem,
    List,
    Picker,
 } from '@ant-design/react-native';

 import HttpUtil from 'src/util/HttpUtil' //接口请求
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import NavigationUtil from "src/util/NavigationUtil";//页面跳转
 import ToastUtil from 'src/util/ToastUtil'; // 轻提示
 import { API } from 'src/api/Api'; 
    
/*** 
 * 公积金业务-活期*定期余额查询
*/    
export default function CarSubscribe (props) {
    let type = props.navigation.getParam('type')||"1"
    const [typeId, setTypeId] = useState(type)
    const [title, setTitle] = useState('公积金活期余额查询')
    const [formData,setFormData] = useState({
        name:'', idCard:'',
    })

    function onButtonClick () {
        if (formData.name== "") {
            ToastUtil.toast('姓名不能为空')
            return
        }
        if (formData.idCard=="") {
            ToastUtil.toast('身份证号不能为空')
            return
        }
        let parms = {
            ...formData,
            type: type
        }
        HttpUtil.get('http://192.168.10.58:8830/fund/balancQuery/select', 
            {...parms}
        ).then(responseJson=>{   
            const { code, data, msg } = responseJson.data   
            if(code === 0){  
                NavigationUtil.navigate(props,'SumAccountFundQuery2',{info:{...formData, ...data}})
            }  
            }).catch(error=>{
            console.log(error,'error')
            });
    }
    console.log(formData,555555)

    useEffect (()=>{ 
        
            
        },[])
        useEffect(() => {
            const titles = type == 1 ? '公积金活期余额查询' : type == 2 ? '公积金定期余额查询' : ""
            setTypeId(type)
            setTitle(titles)
        }, [type])
        return (
            <View style={styles.container}>
                <NavigationBar title={title} hide={false} popEnabled = {true}  navigator ={props.navigation}/>
                <ScrollView>         
                <List style={{marginTop: 10}}>
                        <InputItem
                            type="text"
                            labelNumber="8"
                            textAlign='right'
                            value={formData.name}
                            onChange={(val)=>setFormData({...formData, name: val})}
                            placeholder='请输入'
                        >
                        姓名
                        </InputItem>
                        <InputItem
                            type="number"
                            labelNumber="8"
                            textAlign='right'
                            value={formData.idCard}
                            onChange={(val)=>setFormData({...formData, idCard: val})}
                            placeholder='请输入'
                        >
                        身份证号
                        </InputItem>
                    </List> 
                    <List style={styles.buttonStyles}>
                        <Button type="primary" onPress={()=>onButtonClick()}>查询</Button>
                    </List>                
            </ScrollView>
            </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    buttonStyles: {
        marginTop: 50,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15
    },

});

