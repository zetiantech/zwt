/**
 * @description 零报处理信息查询
 * @author cy
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import {
    Button,
    Provider,
    WhiteSpace
} from '@ant-design/react-native';
import NavigationBar from '../../common/NavigationBar'
import Form, { validate } from 'src/component/FormComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'

import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转



export default function QueryFinance(props) {
    const [data, setData] = useState({
        bankCard: '',
        bankType: '',
        name: '',
        idCard: ''
    });
    const [showData, setShowData] = useState({
        bankCard: {
            label: '银行卡号',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入银行卡号',
                }
            ],
        },
        bankType: {
            label: '开户银行',
            type: 'Picker',
            height: 50,
            data: [],
            validator: [
                {
                    rule: 'require',
                    tip: '请选择开户银行',
                }
            ],
        },
        name: {
            label: '姓名',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入姓名',
                }
            ],
        },
        idCard: {
            label: '身份证号',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入身份证号',
                }
            ],
        }
    })
    useEffect(() => {
        HttpUtil.get(API.BankTypeList, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [];
                for (const v of data.data) {
                    arr.push({
                        value: v.id,
                        label: v.name
                    })
                }
                let obj = {
                    ...showData
                }
                obj.bankType = {
                    label: '开户银行',
                    type: 'Picker',
                    height: 50,
                    data: arr,
                    validator: [
                        {
                            rule: 'require',
                            tip: '请选择开户银行',
                        }
                    ],
                }
                setShowData(obj)
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        })
    }, [])
    // 触发操作
    function handleSubmit() {
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    bankCard: data.bankCard,
                    bankType: data.bankType,
                    name: data.name,
                    idCard: data.idCard
                };
                HttpUtil.get(API.GetExamineeInfo, params).then((data) => {
                    data = data.data;
                    if (data.code === 0 && data.data !== null) {
                        let infoData = data.data;
                        NavigationUtil.navigate(props, 'SchoolBusResult', {
                            info: infoData
                        })

                    } else {
                        ToastUtil.toast(data.msg || '获取数据失败', 'center');
                    }
                });
            })
            .catch(error => {
                ToastUtil.error(error);
            });

    }
    return (
        <Provider>
            <View style={styles.container}>
                <NavigationBar
                    popEnabled={true}
                    title='零报处理信息查询'
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                <Form
                    data={data}
                    setData={setData}
                    showData={showData}
                    setShowData={setShowData} />
                <WhiteSpace size="xl" />
                <Button
                    style={styles.submitBtn}
                    type="primary"
                    onPress={handleSubmit}
                >
                    查询
                </Button>
            </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    submitBtn: {
        width: GlobalStyles.window_width - 30,
        alignSelf: 'center',
    },
}); 