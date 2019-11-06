/**
 * @description 长者者饭堂
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



export default function CafeteriaElderly(props) {
    const [data, setData] = useState({
        areaId: '',
        name: ''
    });
    const [showData, setShowData] = useState({
        areaId: {
            label: '行政区域',
            type: 'Picker',
            height: 50,
            data: [],
            validator: [
                {
                    rule: 'require',
                    tip: '请选择行政区域',
                }
            ],
        },
        elderName: {
            label: '长者饭堂名称',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 6
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入长者饭堂名称',
                }
            ],
        }
    })
    useEffect(() => {
        HttpUtil.get(API.QueryProvince, {
        }).then((data) => {
            data = data.data;
            if (data.code === 0) {
                let arr = [];
                for (const v of data.data) {
                    arr.push({
                        value: v.id,
                        label: v.cityName
                    })
                }
                let obj = {
                    ...showData
                }
                obj.areaId = {
                    label: '行政区域',
                    type: 'Picker',
                    height: 50,
                    data: arr,
                    validator: [
                        {
                            rule: 'require',
                            tip: '请选择行政区域',
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
                    areaId: data.areaId.join(',')
                };
                HttpUtil.post(API.GETELDERCANTEEN, params).then((data) => {
                    data = data.data;
                    if (data.code === 0 && data.data !== null) {
                        let infoData = data.data;
                        NavigationUtil.navigate(props, 'CafeteriaElderlyResult', {
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
                    title='长者饭堂查询'
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