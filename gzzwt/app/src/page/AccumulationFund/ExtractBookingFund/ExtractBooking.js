/**
 * @description 公积金前台提取预约
 * @author 择天团队 
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { 
    Button,
    List,
    Picker,
    Provider,
    WhiteSpace
 } from '@ant-design/react-native';

const dataSource = require('@bang88/china-city-data');

import NavigationBar from 'src/common/NavigationBar'
import NavigationUtil from  'src/util/NavigationUtil'

import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil';

import ToastUtil from 'src/util/ToastUtil'; // 轻提示

const Area = ({areaId, onChange, areaList}) => {
    return (
        <Picker
            cols={3}
            title="请选择网点区域"
            itemStyle={{padding: 10}}
            data={areaList}
            value={areaId}
            onChange={(value) => onChange(value, areaList) }
            onOk={(value) => onChange(value, areaList) }
        >
            <List.Item arrow="horizontal">网点区域</List.Item>
        </Picker>
    );
}

const Bank = ({bankId, onChange, bankList}) => {
    return (
        <Picker
            cols={1}
            title="请选择受理银行"
            itemStyle={{padding: 10}}
            data={bankList}
            value={bankId}
            onChange={(value) => onChange(value, bankList) }
            onOk={(value) => onChange(value, bankList) }
        >
            <List.Item arrow="horizontal">受理银行</List.Item>
        </Picker>
    );
}

const Account = ({accountId, onChange, accountList}) => {
    return (
        <Picker
            cols={1}
            title="请选择网点名称"
            itemStyle={{padding: 10}}
            data={accountList}
            value={accountId}
            onChange={(value) => onChange(value, accountList) }
            onOk={(value) => onChange(value, accountList)}
        >
            <List.Item arrow="horizontal">网点名称</List.Item>
        </Picker>
    );
}

export default function ExtractBooking(props) {
    const [areaId, setAreaId] = useState([])
    const [bankId, setBankId] = useState([])
    const [accountId, setAccountId] = useState([])

    const [areaList, setAreaList] = useState([])
    const [bankList, setBankList] = useState([])
    const [accountList, setAccountList] = useState([])

    const [next, setNext] = useState(true)

    const [form, setForm] = useState({
        accountId: '4545454',
        bankId: '',
        areaId: '',
        bankName: ''
    })

    useEffect(() => {
        setAreaList(dataSource)
        if(areaId.length){
            getBankTypeList(areaId[2])
        }
        if(areaId.length && bankId.length){
            getBankList(areaId[2], bankId.join(""))
        }
    }, [])
    
    const getLabelValue = (list) => {
        let arr = []
        list && list.map((item, index)=>{
            arr.push({...item, label: item.name, value: item.id})
        });
        return arr
    }

    const getLable = (val, list) => {
        let name = ''
        list.map((item, index)=>{
            if(item.id == val) {
                name = item.name
            }
        });
        return name
    }

    const onAreaChange =  (value) => {
        setAreaId(value)
        getBankTypeList(value[2])
        setForm({...form, areaId: value[2]})
    }

    const onBankChange = (value) => {
        setBankId(value)
        getBankList(areaId[2], bankId.join(""))
    }

    const onAccountChange = (value) => {
        const bankLabel = getLable(value.join(""), accountList)
        setAccountId(value)
        setNext(false)
        setForm({...form, bankId: value.join(""), bankName: bankLabel})
    }

    function getBankList(areaId, bankTypeId) {
        HttpUtil.get(API.BANK_SELECT_LIST, { 
            areaId: areaId, 
            bankTypeId: bankTypeId
        })
        .then(responseJson => {
            const { code, data, msg } = responseJson.data
            if (code == 0) {
                const account = getLabelValue(data)
                setAccountList(account);
            } 
        });
    }
    
    function getBankTypeList(areaId) {
        HttpUtil.get(API.BANK_TYPE_LIST, { 
            areaId: areaId 
        })
        .then(responseJson => {
            const { code, data, msg } = responseJson.data
            if (code == 0) {
                const bank = getLabelValue(data)
                setBankList(bank);
            } 
        });
    }

    const onNext = () => {
        if (form.areaId==""||form.areaId==undefined) {
            ToastUtil.error('请选择网点区域')
            return
        }
        if (form.bankId==""||form.bankId==undefined) {
            ToastUtil.error('请选择受理银行')
            return
        }
        if (form.bankName==""||form.bankName==undefined) {
            ToastUtil.error('请选择网点名称')
            return
        }
        // NavigationUtil.navigate(props, 'ExtractBooking2', { form: form})
    }   

    return (
        <View style={styles.container} >
            <Provider>
                <NavigationBar
                    navigator={props.navigation}
                    popEnabled={true}
                    title='前台提取预约'
                    hide={false}
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                />
                <WhiteSpace size="xl" />
                <View>
                    <List>
                        <Area areaId={areaId} onChange={onAreaChange} areaList={areaList} />
                        <Bank bankId={bankId} onChange={onBankChange} bankList={bankList} />
                        <Account accountId={accountId} onChange={onAccountChange} accountList={accountList} />
                    </List>
                    <Button type="primary" disabled={next} onPress={()=>onNext()} style={styles.btnBox} >下一步</Button>
                </View>
            </Provider>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    btnBox: {
        margin: 15,
        marginTop: 30
    },
    itemCont: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5
    },
    img: {
        width: 18,
        height: 18,
    },
    itemTitle: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 16,
        color: '#333'
    },
    itemText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#333'
    },
    phoneBox: {
        width: 80, 
        paddingLeft: 20, 
        alignItems: 'center', 
        borderLeftColor: '#e4e4e4', 
        borderLeftWidth: 1
    },
});