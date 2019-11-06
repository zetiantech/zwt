/**
 * @description 婚姻登记证明
 * @author 择天团队 Jonne 
*/
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Provider,
    DatePicker,
    WhiteSpace
 } from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import { CurentTime } from 'src/util/DateUtil'

const dataSource = require('@bang88/china-city-data');


const ApplyBaseInfoComponent = ({maritalSource, genderType, soldierType, idCardSource, personalType, formData, setFormData, onSubmitData}) => {
    return (
        <ScrollView>
            <List>
                <InputItem
                    type="text"
                    textAlign='right'
                    value={formData.name}
                    onChange={(value) => setFormData({...formData, name: value}) }
                    placeholder="请输入"
                >
                姓名
                </InputItem>
                <Picker
                    cols={1}
                    title="人员类别"
                    itemStyle={{padding: 10}}
                    data={personalType}
                    value={formData.personTypeId}
                    onChange={(value) => setFormData({...formData, personTypeId: value}) }
                    onOk={(value) => setFormData({...formData, personTypeId: value}) }
                >
                    <List.Item arrow="horizontal">人员类别</List.Item>
                </Picker>
                <Picker
                    cols={1}
                    title="证件类型"
                    itemStyle={{padding: 10}}
                    data={idCardSource}
                    value={formData.certType}
                    onChange={(value) => setFormData({...formData, certType: value}) }
                    onOk={(value) => setFormData({...formData, certType: value}) }
                >
                    <List.Item arrow="horizontal">证件类型</List.Item>
                </Picker>
                <Picker
                    cols={1}
                    title="军人类别"
                    itemStyle={{padding: 10}}
                    data={soldierType}
                    value={formData.soldierTypeId}
                    onChange={(value) => setFormData({...formData, soldierTypeId: value}) }
                    onOk={(value) => setFormData({...formData, soldierTypeId: value}) }
                >
                    <List.Item arrow="horizontal">军人类别</List.Item>
                </Picker>
                <Picker
                    cols={1}
                    title="性别"
                    itemStyle={{padding: 10}}
                    data={genderType}
                    value={formData.gender}
                    onChange={(value) => setFormData({...formData, gender: value}) }
                    onOk={(value) => setFormData({...formData, gender: value}) }
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
                <InputItem
                    type="text"
                    textAlign='right'
                    value={formData.idCard}
                    onChange={(value) => setFormData({...formData, idCard: value}) }
                    placeholder="请填写"
                >
                证件号码
                </InputItem>
                <InputItem
                    type="number"
                    textAlign='right'
                    value={formData.phone}
                    onChange={(value) => setFormData({...formData, phone: value}) }
                    placeholder="请输入"
                >
                手机号码
                </InputItem>
                <DatePicker
                    value={formData.birthday}
                    mode="date"
                    title="请选择出生日期"
                    itemStyle={{padding: 10}}
                    defaultDate={new Date()}
                    minDate={new Date(1945, 10, 1)}
                    maxDate={new Date(2036, 10, 1)}
                    onChange={(value) => setFormData({...formData, birthday: value})}
                    format="YYYY-MM-DD"
                >
                    <List.Item arrow="horizontal">出生日期</List.Item>
                </DatePicker>
                <Picker
                    title="户籍地"
                    cols={3}
                    itemStyle={{padding: 10}}
                    data={dataSource}
                    value={formData.registArea}
                    onChange={(value) => setFormData({...formData, registArea: value}) }
                    onOk={(value) => setFormData({...formData, registArea: value}) }
                >
                    <List.Item arrow="horizontal">户籍地</List.Item>
                </Picker>
                <Picker
                    title="婚姻状况"
                    cols={1}
                    itemStyle={{padding: 10}}
                    data={maritalSource}
                    value={formData.maritalStatusId}
                    onChange={(value) => setFormData({...formData, maritalStatusId: value}) }
                    onOk={(value) => setFormData({...formData, maritalStatusId: value}) }
                >
                    <List.Item arrow="horizontal">婚姻状况</List.Item>
                </Picker>
                <InputItem
                    type="text"
                    textAlign='right'
                    labelNumber={8}
                    value={formData.country}
                    onChange={(value) => setFormData({...formData, country: value}) }
                    placeholder="请输入"
                >
                国家或地区
                </InputItem>
                <InputItem
                    type="text"
                    textAlign='right'
                    labelNumber={8}
                    value={formData.reason}
                    onChange={(value) => setFormData({...formData, reason: value}) }
                    placeholder="请输入"
                >
                出具使用理由
                </InputItem>
            </List>
            <Button style={styles.btnBox} type="primary" onPress={onSubmitData}>下一步</Button>
        </ScrollView>
    )
}

export default function MarriageLogProve(props){

    const [idCardSource, setIdCardSource] = useState([])
    const [personalType, setPersonalType] = useState([])
    const [soldierType, setSoldierType] = useState([])
    const [genderType, setGenderType] = useState([
        { label: '男', value: '男' },
        { label: '女', value: '女' }
    ])
    const [maritalSource, setMaritalSource] = useState([])
    

    const [formData, setFormData] = useState({
        name: '',
        personTypeId: [],
        certType: [],
        soldierTypeId: [],
        maritalStatusId: [],
        gender: [],
        idCard: '',
        phone: '',
        birthday: '',
        registArea: [],
        country: '',
        reason: '',
        type: 1
    })

    useEffect(() => {
        getSelectList(1)
        getSelectList(2)
        getSelectList(3)
        getSelectList(4)
    }, [])

    function validForm(){
        if (validator.isEmpty(formData.name)) {
            ToastUtil.toast("姓名不能为空");
            return false;
		}else if (!formData.personTypeId.length){
            ToastUtil.toast("人员类别不能为空");
            return false;
        }else if (!formData.certType.length){
            ToastUtil.toast("证件类型不能为空");
            return false;
        }else if (!formData.soldierTypeId.length){
            ToastUtil.toast("军人类别不能为空");
            return false;
        }else if (!formData.maritalStatusId.length){
            ToastUtil.toast("婚姻状况不能为空");
            return false;
        }else if (!formData.gender.length){
            ToastUtil.toast("性别不能为空");
            return false;
        }else if (validator.isEmpty(formData.idCard)){
            ToastUtil.toast("证件号码不能为空");
            return false;
        }else if (!validator.isMobilePhone(formData.phone, 'zh-CN')){
            ToastUtil.toast("请输入正确格式的手机号码");
            return false;
        }else if (formData.birthday==''){
            ToastUtil.toast("出生日期不能为空");
            return false;
        }else if (!formData.registArea.length){
            ToastUtil.toast("户籍地不能为空");
            return false;
        }else if (validator.isEmpty(formData.country)){
            ToastUtil.toast("国家或地区不能为空");
            return false;
        }else if (validator.isEmpty(formData.reason)){
            ToastUtil.toast("出具使用理由不能为空");
            return false;
        }
        return true
    }

    function getSelectList(kindId){
        HttpUtil.get(API.SELECT_LIST, { kindId: kindId })
            .then(responseJson => {
                const { code, data, msg } = responseJson.data
                if(code == 0){
                    let list = []
                    data.map((item, i)=>{
                        list.push({label: item.name, value: item.id})
                    })
                    if(kindId==1){
                        setPersonalType(list)
                    }
                    if(kindId==2){
                        setIdCardSource(list);
                    }
                    if(kindId==3){
                        setSoldierType(list);
                    }
                    if(kindId==4){
                        setMaritalSource(list)
                    }
                    
                    
                }else{
                    ToastUtil.toast(msg)
                }
            }).catch(error => {
                LogUtil.debug("证件类型:" + error)
            })
    }

    function  onSubmitData() {
        if(!validForm()){
            return;
        }
        formData.birthday = CurentTime(new Date(formData.birthday))
        props.navigation.navigate("MarriageOutlets", { formData: formData })
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation} 
                    statusBar={{backgroundColor: '#FFFFFF'}} 
                    popEnabled={true} 
                    title="婚姻登记记录证明" 
                    hide={false}/>
                <WhiteSpace size="lg" />
                <ApplyBaseInfoComponent 
                    maritalSource={maritalSource}
                    genderType={genderType}
                    soldierType={soldierType}
                    personalType={personalType}
                    idCardSource={idCardSource} 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSubmitData={onSubmitData} 
                />
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
    btnBox: {
        marginHorizontal: 15,
        marginVertical: 30
    }
});

