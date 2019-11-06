/**
 * @description 不动产预售楼盘项目查询
 * @author caroline
*/
import React, { useState, useEffect, } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import {
    Button,
    WhiteSpace,
    Provider
} from '@ant-design/react-native';

import Form, { validate } from 'src/component/FormComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'

import NavigationBar from '../../common/NavigationBar'
import HttpUtil from 'src/util/HttpUtil'; // 数据请求库
import { API } from 'src/api/Api'; // 接口文件
import ToastUtil from 'src/util/ToastUtil'; // 轻提示
import NavigationUtil from "src/util/NavigationUtil";//页面跳转

export default function EstateBuilding (props) {
    const [data, setData] = useState({
        preSaleNumber: '',
        preSaleId: []
    });
    const [showData, setShowData] = useState({
        // preSaleNumber: {
        //     label: '预售证',
        //     type: 'InputItem',
        //     attr: {
        //         placeholder: '请输入',
        //         textAlign: "right",
        //     }
        // },
    })
    useEffect(() => {
        HttpUtil.post(API.ImmovableGetPreSaleBox, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                const selectData = data.data.map((item) => ({
                    value: item.id,
                    label: item.name
                }))
                let obj = {
                    preSaleId: {
                        label: '预售类型',
                        type: 'Picker',
                        data: selectData,
                        attr: {
                            title: '请选择'
                        }, validator: [
                            {
                                rule: 'require',
                                tip: '请选择预售类型',
                            }
                        ],
                    },
                    preSaleNumber: {
                        label: '预售证',
                        type: 'InputItem',
                        last: true,
                        attr: {
                            placeholder: '请输入',
                            textAlign: "right",
                        },
                        validator: [
                            {
                                rule: 'require',
                                tip: '请输入预售证',
                            }
                        ],
                    },
                };
                setShowData({ ...obj })
            } else {
                ToastUtil.toast(data.msg || '获取数据失败', 'center');
            }
        });

    }, [])
    // 触发操作
    function handleSubmit () {
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    preSaleId: data.preSaleId[0],
                    preSaleNumber: data.preSaleNumber,
                };
                HttpUtil.post(API.ImmovablePreSaleQuery, params).then((data) => {
                    data = data.data;
                    if (data.code === 0) {
                        NavigationUtil.navigate(props, 'EstateBuildingResults', {
                            info: data.data
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
                    title='预售楼盘项目查询'
                    hide={false}
                    navigator={props.navigation}
                    popEnabled={true} />
                <WhiteSpace size="lg" />
                <Form
                    data={data}
                    setData={setData}
                    showData={showData}
                    setShowData={setShowData}
                />
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