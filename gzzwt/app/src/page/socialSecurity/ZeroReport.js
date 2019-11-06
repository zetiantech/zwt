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
        zeroReportTypeId: '',
        name: '',
        idCard: '',
    });
    const [showData, setShowData] = useState({
        zeroReportTypeId: {
            label: '报销类型',
            type: 'Picker',
            height: 50,
            data: [],
            validator: [
                {
                    rule: 'require',
                    tip: '请选择报销类型',
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
            label: '身份证',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入身份证',
                },
                {
                    rule: 'idcard',
                    tip: '请输入正确的身份证',
                }
            ],
        }
    })
    useEffect(() => {
        HttpUtil.post(API.GETZEROREPORTTYPE, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [];
                for (const v of data.data) {
                    arr.push({
                        value: v.id,
                        label: v.typeName
                    })
                }
                let obj = {
                    ...showData
                }
                obj.zeroReportTypeId = {
                    label: '报销类型',
                    type: 'Picker',
                    height: 50,
                    data: arr,
                    validator: [
                        {
                            rule: 'require',
                            tip: '请选择报销类型',
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
                    ...data,
                    zeroReportTypeId: data.zeroReportTypeId.join(','),
                    pageIndex: 1,
                    pageSize: 10
                };
                HttpUtil.post(API.GETZEROREPORTLIST, params).then((data) => {
                    data = data.data;
                    if (data.code === 0 && data.data !== null) {
                        NavigationUtil.navigate(props, 'ZeroReportResults', {
                            info: params
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