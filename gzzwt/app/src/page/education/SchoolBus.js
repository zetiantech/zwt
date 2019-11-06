/**
 * @description 校车查询
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



export default function SchoolBus(props) {
    const [data, setData] = useState({
        plateNumber: '',
    });
    const [showData, setShowData] = useState({
        plateNumber: {
            label: '车辆号牌',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入车辆号牌',
                }
            ],
        }
    })
    useEffect(() => {
    }, [])
    // 触发操作
    function handleSubmit() {
        validate({ data, showData, setShowData })
            .then(() => {
                let params = {
                    plateNumber: data.plateNumber,
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
                    title='校车登记信息查询'
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