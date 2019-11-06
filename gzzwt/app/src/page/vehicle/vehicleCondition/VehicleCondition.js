/**
 * @description 机动车状态查询
 * @author cy
*/
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Provider,
    Button,
    WhiteSpace
} from '@ant-design/react-native';
import NavigationBar from 'src/common/NavigationBar'//头部导航
import Form, { validate } from 'src/component/FormComponent'
import NavigationUtil from "src/util/NavigationUtil";//页面跳转
import { API } from 'src/api/Api'
import HttpUtil from 'src/util/HttpUtil' //接口请求
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
export default function VehicleCondition(props) {
    const [toastFlag, setToastFlag] = useState(false);
    const [data, setData] = useState({
        engineSix: '',//130011
        plateNumber: '',//粤SDE888
        vinFour: ''//1402
    })
    const [showData, setShowData] = useState({
        plateNumber: {
            label: '号牌号码',
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "right",
                placeholder: '请输入',
                labelNumber: 4
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入号牌号码',
                }
            ],
        },
        engineSix: {
            label: '发动机',
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "right",
                placeholder: '请输入发动机后六位',
                labelNumber: 4,
                maxLength: 6,
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入发动机后六位',
                }
            ],
        },
        vinFour: {
            label: '车架号',
            type: 'InputItem',
            height: 50,
            attr: {
                textAlign: "right",
                placeholder: '请输入车架号后四位',
                labelNumber: 4,
                maxLength: 4,
                last: true
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入车架号后四位',
                }
            ],
        },
    })
    /**
     * 查询
     * @param {*} params 
     */
    function onSubmitLogin() {
        validate({ data, showData, setShowData })
            .then(() => {
                HttpUtil.post(API.VehicleStatusQuery, {
                    ...data,
                }).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        setToastFlag(false);
                        NavigationUtil.navigate(props, 'VehicleResult', { info: data.data || null });
                    } else {
                        setToastFlag(true);
                        ToastUtil.toast(data.msg || '获取数据失败', 'center');
                    }
                })
            })
            .catch(error => {
                ToastUtil.error(error);
            });
    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar title='机动车状态查询' hide={false} navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                <View style={styles.inputWrap}>
                    <Form data={data} showData={showData} setData={setData} setShowData={setShowData} />
                </View>
                <WhiteSpace size="xl" />
                <View style={styles.btnWrap}>
                    <Button style={styles.btnBox} type="primary" onPress={onSubmitLogin}>查询</Button>
                </View>
                {toastFlag && <Text style={styles.toastText}>未查询到相关信息</Text>}
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    listDateText: {
        paddingTop: 5,
        paddingBottom: 5
    },
    listItemText: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    },
    inputBox: {
        height: 50
    },
    btnWrap: {
        paddingRight: 15,
        paddingLeft: 15
    },
    btnBox: {
        height: 48,
        backgroundColor: '#2F74ED'
    },
    toastText: {
        fontSize: 14,
        color: '#999999',
        marginTop: 30,
        flex: 1,
        textAlign: 'center'
    }
})