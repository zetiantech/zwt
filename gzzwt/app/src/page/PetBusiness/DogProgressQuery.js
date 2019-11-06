/**
 * @description 个人养犬申请进度查询
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



export default function DogProgressQuery(props) {
    const [data, setData] = useState({
        name: '',
        idCard: '',
        registerId: ''
    });
    const [showData, setShowData] = useState({
        name: {
            label: '养犬人姓名',
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
                    tip: '请输入养犬人姓名',
                }
            ],
        },
        idCard: {
            label: '养犬人身份证号',
            type: 'InputItem',
            height: 50,
            attr: {
                placeholder: '请输入',
                textAlign: "right",
                labelNumber: 7
            },
            validator: [
                {
                    rule: 'require',
                    tip: '请输入养犬人身份证号',
                }
            ],
        },
        registerId: {
            label: '养犬登记证号',
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
                    tip: '请输入养犬登记证号',
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
                    idCard: data.idCard
                };
                HttpUtil.get(API.GetExamineeInfo, params).then((data) => {
                    data = data.data;
                    if (data.code === 0 && data.data !== null) {
                        let infoData = data.data;
                        NavigationUtil.navigate(props, 'DogProgressQueryResult', {
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
                    title='申请进度查询'
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