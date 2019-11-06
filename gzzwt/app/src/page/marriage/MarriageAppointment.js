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
 } from '@ant-design/react-native';

import validator from 'validator';
import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import Utils from 'src/util/Utils'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'

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

const ApplyBaseInfoComponent = ({idCardSource, formData, setFormData, onSubmitData}) => {
    return (
        <ScrollView>
            <List renderHeader={'男方信息'}>
                <InputItem
                    type="text"
                    textAlign='right'
                    value={formData.maleName}
                    onChange={(value) => setFormData({...formData, maleName: value}) }
                    placeholder="请输入"
                >
                姓名
                </InputItem>
                <Picker
                    cols={1}
                    title="证件类型"
                    itemStyle={{padding: 10}}
                    data={idCardSource}
                    value={formData.maleCertTypeId}
                    onChange={(value) => setFormData({...formData, maleCertTypeId: value}) }
                    onOk={(value) => setFormData({...formData, maleCertTypeId: value}) }
                >
                    <List.Item arrow="horizontal">证件类型</List.Item>
                </Picker>
                <InputItem
                    type="text"
                    textAlign='right'
                    value={formData.maleIdCard}
                    onChange={(value) => setFormData({...formData, maleIdCard: value}) }
                    placeholder="请填写"
                >
                证件号码
                </InputItem>
                <InputItem
                    type="number"
                    textAlign='right'
                    value={formData.malePhone}
                    onChange={(value) => setFormData({...formData, malePhone: value}) }
                    placeholder="请输入"
                >
                手机号码
                </InputItem>
                <Picker
                    title="户籍地"
                    cols={3}
                    itemStyle={{padding: 10}}
                    data={dataSource}
                    value={formData.maleRegistArea}
                    onChange={(value) => setFormData({...formData, maleRegistArea: value}) }
                    onOk={(value) => setFormData({...formData, maleRegistArea: value}) }
                >
                    <List.Item arrow="horizontal">户籍地</List.Item>
                </Picker>
            </List>

            <List renderHeader={'女方信息'}>
                <InputItem
                    type="text"
                    textAlign='right'
                    value={formData.femaleName}
                    onChange={(value) => setFormData({...formData, femaleName: value}) }
                    placeholder="请输入"
                >
                姓名
                </InputItem>
                <Picker
                    cols={1}
                    title="证件类型"
                    itemStyle={{padding: 10}}
                    data={idCardSource}
                    value={formData.femaleCertTypeId}
                    onChange={(value) => setFormData({...formData, femaleCertTypeId: value}) }
                    onOk={(value) => setFormData({...formData, femaleCertTypeId: value}) }
                >
                    <List.Item arrow="horizontal">证件类型</List.Item>
                </Picker>
                <InputItem
                    type="text"
                    textAlign='right'
                    value={formData.femaleIdCard}
                    onChange={(value) => setFormData({...formData, femaleIdCard: value}) }
                    placeholder="请填写"
                >
                证件号码
                </InputItem>
                <InputItem
                    type="number"
                    textAlign='right'
                    value={formData.femalePhone}
                    onChange={(value) => setFormData({...formData, femalePhone: value}) }
                    placeholder="请输入"
                >
                手机号码
                </InputItem>
                <Picker
                    title="户籍地"
                    cols={3}
                    itemStyle={{padding: 10}}
                    data={dataSource}
                    value={formData.femaleRegistArea}
                    onChange={(value) => setFormData({...formData, femaleRegistArea: value}) }
                    onOk={(value) => setFormData({...formData, femaleRegistArea: value}) }
                >
                    <List.Item arrow="horizontal">户籍地</List.Item>
                </Picker>
            </List>
            <Button style={styles.btnBox} type="primary" onPress={onSubmitData}>下一步</Button>
        </ScrollView>
    )
}

export default function MarriageAppointment(props){

    const types = props.navigation.getParam("type") || 1

    const [typeId, setTypeId] = useState(types)
    const [title, setTitle] = useState('结婚登记预约')

    useEffect(() => {
        const titles = types == 1 ? '结婚登记预约' : types == 2 ? '离婚登记预约' : types == 3 ? '补领结婚证预约' : types == 4 ? '补领离婚证预约' : types == 5 ? '涉外、港澳台、华侨结婚登记预约' : types == 6 ? '涉外、港澳台、华侨离婚登记预约' : types == 7 ? '涉外、港澳台、华侨补领《结婚证》' : types == 8 ? '涉外、港澳台、华侨补领《离婚证》' : ''
        setTypeId(types)
        setTitle(titles)
    }, [types])

    const [idCardSource, setIdCardSource] = useState([])
    const [formData, setFormData] = useState({
        maleName: '',
        maleCertTypeId: [],
        maleIdCard: '',
        maleRegistArea: [],
        maleRegistAreaName: '',
        malePhone: '',
        femaleName: '',
        femaleCertTypeId: [],
        femaleIdCard: '',
        femaleRegistArea: [],
        femaleRegistAreaName: '',
        femalePhone: '',
        typeId: typeId,
        type: 0
    })

    useEffect(() => {
        getSelectList()
    }, [])

    function validForm(){
        if (validator.isEmpty(formData.maleName)) {
            ToastUtil.toast("男方姓名不能为空");
            return false;
		}else if (validator.isEmpty(formData.maleCertTypeId.join(""))){
            ToastUtil.toast("证件类型不能为空");
            return false;
        }else if (validator.isEmpty(formData.maleIdCard)){
            ToastUtil.toast("请输入证件号码")
            return false;
        }else if(formData.maleIdCard && !Utils.validIdCard(formData.maleIdCard, formData.maleCertTypeId.join(""))){
            ToastUtil.toast('请输入正确的证件号码')
            return false;
        }else if(validator.isEmpty(formData.maleRegistArea.join(""))){
            ToastUtil.toast("所在户籍不能为空");
            return false;
        }else if (!validator.isMobilePhone(formData.malePhone)){
            ToastUtil.toast("请输入正确的手机号");
            return false;
        }else if (validator.isEmpty(formData.femaleName)){
            ToastUtil.toast("女方姓名不能为空");
            return false;
        }else if (validator.isEmpty(formData.femaleCertTypeId.join(""))){
            ToastUtil.toast("证件类型不能为空");
            return false;
        }else if(formData.femaleIdCard && !Utils.validIdCard(formData.femaleIdCard, formData.femaleCertTypeId.join(""))){
            ToastUtil.toast('请输入正确的证件号码')
            return false;
        }else if (validator.isEmpty(formData.femaleRegistArea.join(""))){
            ToastUtil.toast("所在户籍不能为空");
            return false;
        }else if (!validator.isMobilePhone(formData.femalePhone)){
            ToastUtil.toast("请输入正确的手机号");
            return false;
        }
        return true
    }


    function getSelectList(){
        HttpUtil.get(API.SELECT_LIST, { kindId:2 })
            .then(responseJson => {
                const { code, data, msg } = responseJson.data
                if(code == 0){
                    let list = []
                    data.map((item, i)=>{
                        list.push({label: item.name, value: item.id})
                    })
                    setIdCardSource(list);
                }else{
                    ToastUtil.toast(msg)
                }
            }).catch(error => {
                LogUtil.debug("证件类型:" + error)
            })
    }

    function  onSubmitData() {
        if(!validForm()){
            return
        }
        let maleRegistAreaName = [citySource[formData.maleRegistArea[0]].label, citySource[formData.maleRegistArea[1]].label, citySource[formData.maleRegistArea[2]].label].join(" ")
        let femaleRegistAreaName = [citySource[formData.femaleRegistArea[0]].label, citySource[formData.femaleRegistArea[1]].label, citySource[formData.femaleRegistArea[2]].label].join(" ")
        let forms = {...formData, maleRegistAreaName: maleRegistAreaName, femaleRegistAreaName: femaleRegistAreaName}
        props.navigation.navigate("MarriageOutlets", { formData: forms })
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation} 
                    statusBar={{backgroundColor: '#FFFFFF'}} 
                    popEnabled={true}
                    title={title} 
                    hide={false}/>
                <ApplyBaseInfoComponent idCardSource={idCardSource} formData={formData} setFormData={setFormData} onSubmitData={onSubmitData} />
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

