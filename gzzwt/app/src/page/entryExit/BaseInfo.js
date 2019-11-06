/**
 * @description 基本信息
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
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
    Switch,
    Provider,
    WhiteSpace,
    Modal
 } from '@ant-design/react-native';

 import dayjs from 'dayjs'
 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'//头部导航
 import Form from 'src/component/FormComponent'
 import ToastUtil from 'src/util/ToastUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import Utils from 'src/util/Utils'
 import NavigationUtil from 'src/util/NavigationUtil';

export default function BaseInfo(props){

    const [personType, setPersonType] = useState([])
    const [isChecked, setIsChecked] = useState(false)

    const [params, setParams] = useState({
        hallId: '1',
        personTypeId: [],
        personTypeName: '',
        idCard: '',
        xingName: '',
        mingName: '',
        isBusIness: false,
        companyCode: '',
        startTime: dayjs().format("YYYY-MM-DD hh:mm:ss"),
        endTime: dayjs().format("YYYY-MM-DD hh:mm:ss"),
    })

    useEffect(() => {
        getSelectValue(13)
    }, [])


    useEffect(() => {
        const val = Utils.getLabelValue(personType, params.personTypeId.join(""))
        setParams({...params, personTypeName: val})
    }, [params.personTypeId])


    function getSelectValue(kindId) {
        HttpUtil.get(API.KEYVALUE_LIST, {
            kindId: kindId
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                let list = Object.keys(data).map((item, i)=>({label: data[item], value: item}))
                if(kindId==13){
                    setPersonType(list)
                }
            }else{
                ToastUtil.toast(msg)
            }
        })
    }

    const labelData = {
        personTypeId: {
            label: '用户类型',
            type: 'Picker',
            data: personType
        },
        idCard: {
            label: '身份证号',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
            }
        },
        xingName: {
            label: '中文姓',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入'
            }
        },
        mingName: {
            label: '中文名',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                labelNumber:10,
                placeholder:'请输入'
            }
        }
    }

    useEffect(() => {
        setParams({...params, isBusIness: isChecked ? 1 : 0})
    }, [isChecked])

    function validForm(){
        if(!params.personTypeId.length){
            ToastUtil.toast("用户类型不能为空")
            return false;
        }else if(validator.isEmpty(params.idCard)){
            ToastUtil.toast("中文姓不能为空")
            return false;
        }else if(!Utils.validIdCard(params.idCard)){
            ToastUtil.toast("请输入正确的身份证号码")
            return false;
        }else if(validator.isEmpty(params.xingName)){
            ToastUtil.toast("中文姓不能为空")
            return false;
        }else if(validator.isEmpty(params.mingName)){
            ToastUtil.toast("中文名不能为空")
            return false;
        }else if(params.isBusIness == 1){
            if(validator.isEmpty(params.companyCode)){
                ToastUtil.toast("单位组织结构代码不能为空")
                return false;
            }
        }
        return true;
    }

    // 判断商务签组织机构代码是否正确
    function bsCheck(callback) {
        HttpUtil.get(API.BS_CHECK, {
            code: params.companyCode
        }).then(responseJson=>{
            const { code, data, msg } = responseJson.data
            if(code === 0){
                callback && callback(data)
            }else if(code == 6){
                Modal.alert("", msg, [
                    { text: '暂不预约', onPress: ()=>{
                        NavigationUtil.navigate(props, "EntryExitService")
                    }},
                    { text: '返回修改', onPress: ()=>{

                    }}
                ])
            }
        })
    }

    function onNextHandler() {
        if(!validForm()){
            return;
        }
        if(params.isBusIness == 1){ 
            bsCheck(()=>{
                NavigationUtil.navigate(props, 'PersonalBaseInfo', {form: params})
            })
        }else{
            delete params.companyCode;
            NavigationUtil.navigate(props, 'PersonalBaseInfo', {form: params})
        }
    }
    
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='基本信息' 
                    hide={false} 
                    popEnabled={true}
                    statusBar={{backgroundColor: '#FFFFFF', barStyle: 'dark-content'}}
                    navigator={props.navigation}/>
                
                <ScrollView>
                    <WhiteSpace size="lg" /> 
                    <Form data={params} showData={labelData} setData={setParams} popEnabled ={true}  navigator={props.navigation} />
                    <WhiteSpace size="lg" /> 
                    <List>
                        <List.Item extra={<Switch checked={isChecked} onChange={value=>setIsChecked(value)}  color={'#2F74ED'}/>}>申请商务</List.Item>
                        {
                            isChecked && <InputItem
                                clear
                                type="text"
                                textAlign='right'
                                labelNumber="8"
                                value={params.companyCode}
                                onChange={(value) => setParams({...params, companyCode: value})}
                                placeholder="请填写"
                            >单位组织结构代码</InputItem>
                        }
                    </List>
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
    msgTip: {
        textAlign: 'center',
        color: '#999'
    },
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30
    }
});

