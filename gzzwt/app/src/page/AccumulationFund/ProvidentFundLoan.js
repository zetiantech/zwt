/**
 * @description 公积金-可贷额度计算
 * @author 择天团队 Jonne 
*/

import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { 
    Button,
    InputItem,
    List,
    Picker,
    Provider,
    WhiteSpace,
    Modal
 } from '@ant-design/react-native';

import NavigationBar from 'src/common/NavigationBar'
import ToastUtil from 'src/util/ToastUtil'
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil'
import LogUtil from 'src/util/LogUtil'
import NavigationUtil from 'src/util/NavigationUtil';

const dataSource = require('@bang88/china-city-data');


const SocialBaseInfo = ({formData, setFormFata}) => {
    const businessType = [
        { label: '新建商品房住房公积金贷款', value: 1 }
    ]
    const loanMethod = [
        { label: '等贷本息', value: 1 },
        { label: '先息后本', value: 2 },
        { label: '先本后息', value: 3 }
    ]
    const roomNumber = [
        { label: '1套', value: 1 },
        { label: '2套', value: 2 },
        { label: '3套', value: 3 },
        { label: '4套', value: 4 },
    ]
    const repaymentSource = [
        {value: 1, label: '10年(120期)'},
        {value: 2, label: '20年(240期)'},
        {value: 3, label: '30年(360期)'}
    ]
    const interestRateSource = [
        {value: 1, label: '基准利率'}
    ]
    return (
        <List>
            <Picker
                cols={1}
                title="贷款业务类型"
                itemStyle={{padding: 10}}
                data={businessType}
                value={formData.businessType}
                onChange={(value) => setFormFata({...formData, businessType: value}) }
                onOk={(value) => setFormFata({...formData, businessType: value}) }
            >
                <List.Item arrow="horizontal">贷款业务类型</List.Item>
            </Picker>
            <Picker
                cols={1}
                itemStyle={{padding: 10}}
                data={loanMethod}
                value={formData.loanMethod}
                onChange={(value) => setFormFata({...formData, loanMethod: value}) }
                onOk={(value) => setFormFata({...formData, loanMethod: value}) }
            >
                <List.Item arrow="horizontal">贷款方式</List.Item>
            </Picker>
            <Picker
                cols={1}
                itemStyle={{padding: 10}}
                data={roomNumber}
                value={formData.roomNumber}
                onChange={(value) => setFormFata({...formData, roomNumber: value}) }
                onOk={(value) => setFormFata({...formData, roomNumber: value}) }
            >
                <List.Item arrow="horizontal">家庭房屋套数</List.Item>
            </Picker>
            <Picker
                cols={1}
                itemStyle={{padding: 10}}
                data={repaymentSource}
                value={formData.repayment}
                onChange={(value) => setFormFata({...formData, repayment: value}) }
                onOk={(value) => setFormFata({...formData, repayment: value}) }
            >
                <List.Item arrow="horizontal">预计还期数</List.Item>
            </Picker>
            <Picker
                cols={1}
                itemStyle={{padding: 10}}
                data={interestRateSource}
                value={formData.interestRate}
                onChange={(value) => setFormFata({...formData, interestRate: value}) }
                onOk={(value) => setFormFata({...formData, interestRate: value}) }
            >
                <List.Item arrow="horizontal">贷款利率</List.Item>
            </Picker>
            <InputItem
                type="number"
                labelNumber={8}
                textAlign='right'
                value={formData.totalAmount}
                onChange={(value) => setFormFata({...formData, totalAmount: value}) }
                placeholder="请输入"
            >
            购房总价
            </InputItem>
            <InputItem
                type="number"
                labelNumber={8}
                textAlign='right'
                value={formData.firstAmount}
                onChange={(value) => setFormFata({...formData, firstAmount: value}) }
                placeholder="请输入"
            >
            首付款
            </InputItem>
            
            <InputItem
                type="number"
                textAlign='right'
                labelNumber={8}
                value={formData.account}
                onChange={(value) => setFormFata({...formData, account: value}) }
                placeholder="请输入"
            >
            公积金账号
            </InputItem>
            <InputItem
                type="text"
                labelNumber={8}
                textAlign='right'
                value={formData.cardNumber}
                onChange={(value) => setFormFata({...formData, cardNumber: value}) }
                placeholder="请输入"
            >
             证件号码
            </InputItem>
        </List>
    )
}


const FooterInfo = () => {
    return (
        <View style={styles.footerBox}>
            <Text style={styles.footText}>重要提示：</Text>
            <Text style={styles.footText}>1.额度试算以职工录入信息为基础，且未考虑职工其他</Text>
            <Text style={styles.footText}>2.试算结果仅供参考，不作为贷款申请依据</Text>
            <Text style={styles.footText}>3.贷款额度计算对象为缴存职工及其配偶、父母、子女。</Text>
        </View>
    );
}

function CountResult ({ data, showData }) {
    return (
        <View style={styles.ListWrap}>
            <Text style={styles.ListTitle}>计算结果</Text>
            <List styles={{Body: {borderTopWidth: 0}, BodyBottomLine: {borderBottomWidth: 0}}}>
                {
                    Object.keys(showData).map((item, index) => {
                        return (
                            <List.Item
                                styles={{ Line: { borderBottomWidth: 0 } }}
                                arrow="empty"
                                align='top'
                                multipleLine
                                extra={
                                    <Text style={styles.listItemLabel}>{data[item]+'元' || '0元'}</Text>
                                }>
                                <Text style={styles.listItemText}>{showData[item]}</Text>
                            </List.Item>
                        )
                    })
                }
            </List>
        </View>
    )
}


const AccountView = ({formData, setFormFata}) => {
    return (
        <View>
            <WhiteSpace size="lg" />
            <List>
                <InputItem
                    type="number"
                    labelNumber={8}
                    textAlign='right'
                    value={formData.amount1}
                    onChange={(value) => setFormFata({...formData, amount1: value}) }
                    placeholder="请输入"
                >
                公积金账号
                </InputItem>
                <InputItem
                    type="text"
                    labelNumber={8}
                    textAlign='right'
                    value={formData.name}
                    onChange={(value) => setFormFata({...formData, name: value}) }
                    placeholder="请输入"
                >
                姓名
                </InputItem>
                <InputItem
                    type="text"
                    labelNumber={8}
                    textAlign='right'
                    value={formData.cardNumber1}
                    onChange={(value) => setFormFata({...formData, cardNumber1: value}) }
                    placeholder="请输入"
                >
                证件号码
                </InputItem>
            </List>
        </View>
    )
}

const Btns = ({type, onClickHandler}) => {
    return (
        <View style={styles.deleteBox}>
            <TouchableOpacity 
                onPress={onClickHandler}
            >
                {
                    type == 1 ? <Text style={styles.applyText}>添加共同申请人</Text> : <Text style={styles.deleteBoxText}>删除</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default function SocialSecurityBaseInfo(props) {

    const [visible, setVisible] = useState(false)
    const [btnType, setBtnType] = useState(false)

    const [visible1, setVisible1] = useState(false)

    const [infoData, setInfoData] = useState({
        loanAmount: '30000.00',
        repaymentAmount: '1000'
    })

    useEffect(() => {
        setVisible(false)
    }, [])

    const showData = {
        loanAmount: '可贷金额',
        repaymentAmount: '每月还款'
    }

    const [formData, setFormFata] = useState({
        businessType: [1],
        loanMethod: [1],
        roomNumber: [1],
        repayment: [1],
        interestRate: [1],
        totalAmount: '',
        firstAmount: '',
        account: '',
        cardNumber: '',
        amount1: '',
        name: '',
        cardNumber1: ''
    })


    function onSubmitData() {
        setVisible(true)
        setBtnType(true)
    }

    function onApplyHandler() {
        setVisible1(true)
    }

    function onDeleteHandler() {
        setVisible1(false)
    }

    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar 
                    navigator={props.navigation} 
                    popEnabled={true} 
                    title='公积金贷款计算' 
                    hide={false}
                    statusBar={{backgroundColor: '#FFFFFF', translucent: false}}
                />
                <WhiteSpace size='lg'/>
                <ScrollView>
                    <SocialBaseInfo  formData={formData}  setFormFata={setFormFata}/>
                    { !visible1 && <Btns type={1} onClickHandler={onApplyHandler} /> }
                    { visible && <CountResult data={infoData} showData={showData}/> }
                    { visible1 && <AccountView formData={formData}  setFormFata={setFormFata} /> }
                    { visible1 && <Btns type={2} onClickHandler={onDeleteHandler} /> }
                    <Button type="primary" style={styles.btnBox} onPress={()=>onSubmitData()} >

                        {
                            btnType ? '重新计算':'开始计算'
                        }
                    </Button>
                    <FooterInfo />
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
    ListTitle: {
        fontSize: 18,
        marginHorizontal: 15,
        paddingVertical: 5,
    },
    ListWrap: {
        marginBottom: 0,
        paddingVertical: 20,
        marginVertical: 20,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    btnBox: {
        marginBottom: 15,
        marginVertical: 30,
        marginHorizontal: 20
    },
    rightBtnBox: {
        flexDirection: 'row'
    },
    rightBtn: {
        color: '#2F74ED'
    },
    footerBox: {
        marginHorizontal: 30,
    },
    footText: {
        paddingVertical: 3,
        fontSize: 14,
        color: '#999'
    },
    listItemText: {
        color: '#999',
        fontSize: 16,
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
    },
    listItemLabel: {
        flex: 2.5,
        fontSize: 15,
        paddingTop: 5,
        color: '#FF9B00',
        paddingBottom: 6,
    },
    deleteBox: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignItems: 'flex-end'
    },
    applyText: {
        color: '#2F74ED'
    },
    deleteBoxText: {
        color: '#F12F2F'
    }
});

