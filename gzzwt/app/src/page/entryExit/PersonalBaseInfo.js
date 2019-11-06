/**
 * @description 出入境 - 填写个人信息
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
    Picker,
    Switch,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

 import validator from 'validator';
 import NavigationBar from 'src/common/NavigationBar'
 import Form from 'src/component/FormComponent'
 import ToastUtil from 'src/util/ToastUtil'
 import { API } from 'src/api/Api'
 import HttpUtil from 'src/util/HttpUtil'
 import LogUtil from 'src/util/LogUtil'
 import NavigationUtil from 'src/util/NavigationUtil'

const dataSource = require('@bang88/china-city-data');

const citySource = {}

function getCityLabel(list) {
    list.map((item, i)=>{
        citySource[item.value] = item
        if(item.children && item.children){
            getCityLabel(item.children)
        }
    })   
}
getCityLabel(dataSource)

export default function BaseInfo(props){
    const formData = props.navigation.getParam("form")
    const [sexType, setSexType] = useState([
        {label: '男', value: '男'},
        {label: '女', value: '女'}
    ])

    const [params, setParams] = useState({
        national: '',
        brithAreaName: '',
        registrationAddress: ''
    })

    const [params1, setParams1] = useState({
        xingPy: '',
        mingPy: '',
        gender: [],
        phone: ''
    })
    const [params2, setParams2] = useState({
        emergencyContactName: '',
        emergencyContactPhone: ''
    })

    const labelData = {
        national: {
            label: '民族',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
            }
        },
        brithAreaId: {
            label: '出生地',
            type: 'Picker',
            cols: 3,
            data: dataSource
        },
        registrationAddress: {
            label: '户籍地址',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入'
            }
        }
    }

    const labelData1 = {
        xingPy: {
            label: '姓(拼音)',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
            }
        },
        mingPy: {
            label: '名(拼音)',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
            }
        },
        gender: {
            label: '性别',
            type: 'Picker',
            data: sexType
        },
        phone: {
            label: '本人电话',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入'
            }
        }
    }

    const labelData2 = {
        emergencyContactName: {
            label: '姓名',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
            }
        },
        emergencyContactPhone: {
            label: '电话',
            type: 'InputItem',
            attr: {
                textAlign: "right",
                placeholder:'请输入',
            }
        }
    }

    function validForm(){
        if(validator.isEmpty(params.national)){
            ToastUtil.toast("民族不能为空")
            return false;
        }else if(!params.brithAreaId.length){
            ToastUtil.toast("出生地不能为空")
            return false;
        }else if(validator.isEmpty(params.registrationAddress)){
            ToastUtil.toast("户籍地址不能为空")
            return false;
        }else if(validator.isEmpty(params1.xingPy)){
            ToastUtil.toast("姓(拼音)不能为空")
            return false;
        }else if(validator.isEmpty(params1.mingPy)){
            ToastUtil.toast("名(拼音)不能为空")
            return false;
        }else if(!params1.gender.length){
            ToastUtil.toast("性别不能为空")
            return false;
        }else if(!validator.isMobilePhone(params1.phone)){
            ToastUtil.toast("输入正确格式的电话")
            return false;
        }else if(validator.isEmpty(params2.emergencyContactName)){
            ToastUtil.toast("姓名不能为空")
            return false;
        }else if(!validator.isMobilePhone(params2.emergencyContactPhone)){
            ToastUtil.toast("输入正确格式的电话")
            return false;
        }
        return true;
    }

    function onNextHandler() {
        if(!validForm()){
            return;
        }
        let brithAreaName = [citySource[params.brithAreaId[0]].label, citySource[params.brithAreaId[1]].label, citySource[params.brithAreaId[2]].label].join(" ")
        let forms = {...formData, ...params, ...params1, ...params2, brithAreaName: brithAreaName}
        NavigationUtil.navigate(props, 'BusinessInfo', {form: forms})
    }
    
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='填写个人信息' 
                    hide={false}
                    popEnabled={true} 
                    statusBar={{backgroundColor: '#FFFFFF'}}
                    navigator={props.navigation}/>
                    <ScrollView>
                    <Form header="户籍信息" data={params} showData={labelData} setData={setParams} popEnabled ={true}  navigator={props.navigation} />
                    <Form header="个人信息" data={params1} showData={labelData1} setData={setParams1} popEnabled ={true}  navigator={props.navigation} />
                    <Form header="紧急联系人" data={params2} showData={labelData2} setData={setParams2} popEnabled ={true}  navigator={props.navigation} />
                    <WhiteSpace size="lg" />
                    <Button style={styles.btnBox} type="primary" onPress={onNextHandler}>下一步</Button>
                    <Text style={styles.msgTip}>注：该业务预约后，须前往现场办理</Text>
                    <WhiteSpace size="lg" />
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
    btnBox: {
        marginHorizontal: 20,
        marginVertical: 30
    }
});

